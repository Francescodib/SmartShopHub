import mongoose from 'mongoose';
import Interaction from '../models/Interaction.js';
import Product from '../models/Product.js';

/**
 * AI Recommendation Engine using Collaborative Filtering
 *
 * This engine uses user-based collaborative filtering to generate personalized recommendations.
 * It calculates similarity between users based on their interaction patterns and recommends
 * products that similar users have interacted with.
 *
 * Algorithm Overview:
 * 1. Build user-item interaction matrix
 * 2. Calculate user similarity using cosine similarity
 * 3. Find k-nearest neighbors (similar users)
 * 4. Recommend items that neighbors liked but current user hasn't interacted with
 * 5. Score items based on weighted similarity and interaction strength
 */

class RecommendationEngine {
  constructor() {
    this.cache = new Map();
    this.cacheTTL = parseInt(process.env.RECOMMENDATION_CACHE_TTL) || 3600; // 1 hour default
    this.minInteractions = parseInt(process.env.MIN_INTERACTIONS_FOR_RECOMMENDATIONS) || 3;
  }

  /**
   * Build user-item interaction matrix
   * @returns {Object} Matrix with user interactions and product sets
   */
  async buildInteractionMatrix() {
    const interactions = await Interaction.find()
      .populate('user')
      .populate('product')
      .lean();

    const matrix = {};
    const allProducts = new Set();

    // Build matrix: user -> { productId: weight }
    for (const interaction of interactions) {
      if (!interaction.user || !interaction.product) continue;

      const userId = interaction.user._id.toString();
      const productId = interaction.product._id.toString();

      if (!matrix[userId]) {
        matrix[userId] = {};
      }

      // Accumulate weights (view=1, click=2, add_to_cart=3, purchase=5)
      matrix[userId][productId] = (matrix[userId][productId] || 0) + interaction.weight;
      allProducts.add(productId);
    }

    return { matrix, allProducts };
  }

  /**
   * Calculate cosine similarity between two users
   * @param {Object} userA - First user's interaction vector
   * @param {Object} userB - Second user's interaction vector
   * @returns {number} Similarity score between 0 and 1
   */
  calculateCosineSimilarity(userA, userB) {
    const productsA = Object.keys(userA);
    const productsB = Object.keys(userB);

    // Find common products
    const commonProducts = productsA.filter(p => productsB.includes(p));

    if (commonProducts.length === 0) return 0;

    // Calculate dot product and magnitudes
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (const product of commonProducts) {
      dotProduct += userA[product] * userB[product];
    }

    for (const product of productsA) {
      magnitudeA += userA[product] ** 2;
    }

    for (const product of productsB) {
      magnitudeB += userB[product] ** 2;
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) return 0;

    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Find k most similar users to target user
   * @param {string} userId - Target user ID
   * @param {Object} matrix - User-item interaction matrix
   * @param {number} k - Number of similar users to find
   * @returns {Array} Array of {userId, similarity} objects
   */
  findSimilarUsers(userId, matrix, k = 10) {
    const targetUser = matrix[userId];
    if (!targetUser) return [];

    const similarities = [];

    for (const [otherUserId, otherUser] of Object.entries(matrix)) {
      if (otherUserId === userId) continue;

      const similarity = this.calculateCosineSimilarity(targetUser, otherUser);
      if (similarity > 0) {
        similarities.push({ userId: otherUserId, similarity });
      }
    }

    // Sort by similarity and return top k
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, k);
  }

  /**
   * Generate personalized recommendations for a user
   * @param {string} userId - User ID to generate recommendations for
   * @param {number} limit - Number of recommendations to return
   * @returns {Array} Array of recommended products with scores
   */
  async getRecommendations(userId, limit = 10) {
    // Check cache first
    const cacheKey = `recommendations:${userId}:${limit}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL * 1000) {
      return cached.data;
    }

    // Build interaction matrix
    const { matrix } = await this.buildInteractionMatrix();

    // Check if user has enough interactions
    const userInteractions = matrix[userId] || {};
    if (Object.keys(userInteractions).length < this.minInteractions) {
      // Return popular products for cold start
      return await this.getPopularProducts(limit);
    }

    // Find similar users
    const similarUsers = this.findSimilarUsers(userId, matrix, 10);

    if (similarUsers.length === 0) {
      return await this.getPopularProducts(limit);
    }

    // Calculate recommendation scores
    const scores = {};

    for (const { userId: similarUserId, similarity } of similarUsers) {
      const similarUserInteractions = matrix[similarUserId];

      for (const [productId, weight] of Object.entries(similarUserInteractions)) {
        // Skip products user already interacted with
        if (userInteractions[productId]) continue;

        // Calculate weighted score
        scores[productId] = (scores[productId] || 0) + (similarity * weight);
      }
    }

    // Sort by score and get top products
    const recommendedProductIds = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([productId]) => productId);

    // Fetch product details
    const products = await Product.find({ _id: { $in: recommendedProductIds } }).lean();

    // Sort products by recommendation score
    const sortedProducts = recommendedProductIds
      .map(id => products.find(p => p._id.toString() === id))
      .filter(p => p !== undefined);

    // Cache results
    this.cache.set(cacheKey, {
      data: sortedProducts,
      timestamp: Date.now()
    });

    return sortedProducts;
  }

  /**
   * Get popular products as fallback (for cold start problem)
   * @param {number} limit - Number of products to return
   * @returns {Array} Array of popular products
   */
  async getPopularProducts(limit = 10) {
    // Aggregate interactions to find most popular products
    const popularProducts = await Interaction.aggregate([
      {
        $group: {
          _id: '$product',
          totalInteractions: { $sum: '$weight' },
          purchaseCount: {
            $sum: { $cond: [{ $eq: ['$type', 'purchase'] }, 1, 0] }
          }
        }
      },
      {
        $sort: { purchaseCount: -1, totalInteractions: -1 }
      },
      {
        $limit: limit
      }
    ]);

    const productIds = popularProducts.map(p => p._id);
    const products = await Product.find({ _id: { $in: productIds } }).lean();

    // Sort to match aggregation order
    return productIds
      .map(id => products.find(p => p._id.toString() === id.toString()))
      .filter(p => p !== undefined);
  }

  /**
   * Get similar products based on collaborative filtering
   * @param {string} productId - Product ID to find similar items for
   * @param {number} limit - Number of similar products to return
   * @returns {Array} Array of similar products
   */
  async getSimilarProducts(productId, limit = 6) {
    // Find users who interacted with this product
    const interactions = await Interaction.find({ product: productId })
      .select('user')
      .lean();

    const userIds = interactions.map(i => i.user.toString());

    if (userIds.length === 0) {
      // Fallback: return products from same category
      const product = await Product.findById(productId);
      if (!product) return [];

      return await Product.find({
        _id: { $ne: productId },
        category: product.category
      })
        .limit(limit)
        .lean();
    }

    // Find other products these users interacted with
    const relatedInteractions = await Interaction.aggregate([
      {
        $match: {
          user: { $in: userIds.map(id => new mongoose.Types.ObjectId(id)) },
          product: { $ne: new mongoose.Types.ObjectId(productId) }
        }
      },
      {
        $group: {
          _id: '$product',
          score: { $sum: '$weight' }
        }
      },
      {
        $sort: { score: -1 }
      },
      {
        $limit: limit
      }
    ]);

    const relatedProductIds = relatedInteractions.map(r => r._id);
    return await Product.find({ _id: { $in: relatedProductIds } }).lean();
  }

  /**
   * Clear recommendation cache for a specific user
   * @param {string} userId - User ID to clear cache for
   */
  clearUserCache(userId) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(`recommendations:${userId}:`)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear entire recommendation cache
   */
  clearAllCache() {
    this.cache.clear();
  }
}

// Export singleton instance
const recommendationEngine = new RecommendationEngine();
export default recommendationEngine;
