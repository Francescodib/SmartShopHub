import mongoose from 'mongoose';
import Interaction from '../models/Interaction.js';
import recommendationEngine from './recommendation-engine.js';

/**
 * Track user interactions with products
 * This module handles GDPR-compliant user behavior tracking
 */

/**
 * Track a user interaction with a product
 * @param {Object} data - Interaction data
 * @param {string} data.userId - User ID
 * @param {string} data.productId - Product ID
 * @param {string} data.type - Interaction type (view, click, add_to_cart, purchase)
 * @param {Object} data.metadata - Additional metadata
 * @returns {Object} Created interaction
 */
export const trackInteraction = async (data) => {
  const { userId, productId, type, metadata = {} } = data;

  // Create interaction record
  const interaction = await Interaction.create({
    user: userId,
    product: productId,
    type,
    metadata
  });

  // Clear user's recommendation cache since new data is available
  recommendationEngine.clearUserCache(userId);

  return interaction;
};

/**
 * Get user interaction history
 * @param {string} userId - User ID
 * @param {Object} options - Query options
 * @returns {Array} User interactions
 */
export const getUserInteractions = async (userId, options = {}) => {
  const { type, limit = 50, skip = 0 } = options;

  const query = { user: userId };
  if (type) {
    query.type = type;
  }

  return await Interaction.find(query)
    .populate('product')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();
};

/**
 * Get product interaction statistics
 * @param {string} productId - Product ID
 * @returns {Object} Interaction statistics
 */
export const getProductStats = async (productId) => {
  const stats = await Interaction.aggregate([
    {
      $match: { product: new mongoose.Types.ObjectId(productId) }
    },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 }
      }
    }
  ]);

  // Format results
  const result = {
    views: 0,
    clicks: 0,
    addToCarts: 0,
    purchases: 0,
    total: 0
  };

  for (const stat of stats) {
    switch (stat._id) {
      case 'view':
        result.views = stat.count;
        break;
      case 'click':
        result.clicks = stat.count;
        break;
      case 'add_to_cart':
        result.addToCarts = stat.count;
        break;
      case 'purchase':
        result.purchases = stat.count;
        break;
    }
    result.total += stat.count;
  }

  return result;
};

/**
 * Delete all interactions for a user (GDPR right to be forgotten)
 * @param {string} userId - User ID
 * @returns {Object} Deletion result
 */
export const deleteUserInteractions = async (userId) => {
  const result = await Interaction.deleteMany({ user: userId });
  recommendationEngine.clearUserCache(userId);
  return result;
};

/**
 * Batch track interactions (useful for seeding or bulk operations)
 * @param {Array} interactions - Array of interaction data objects
 * @returns {Array} Created interactions
 */
export const batchTrackInteractions = async (interactions) => {
  const created = await Interaction.insertMany(interactions);

  // Clear cache for affected users
  const affectedUsers = [...new Set(interactions.map(i => i.user.toString()))];
  for (const userId of affectedUsers) {
    recommendationEngine.clearUserCache(userId);
  }

  return created;
};
