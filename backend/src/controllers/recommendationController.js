import recommendationEngine from '../ai/recommendation-engine.js';
import { trackInteraction, getUserInteractions } from '../ai/data-tracking.js';

/**
 * @desc    Get personalized recommendations for user
 * @route   GET /api/recommendations
 * @access  Private
 */
export const getRecommendations = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Check if user has consented to tracking
    if (!req.user.consentToTracking) {
      return res.status(403).json({
        success: false,
        message: 'User has not consented to personalized recommendations. Please enable tracking in preferences.'
      });
    }

    const recommendations = await recommendationEngine.getRecommendations(
      req.user.id,
      limit
    );

    res.json({
      success: true,
      data: recommendations,
      message: recommendations.length > 0
        ? 'Personalized recommendations generated'
        : 'Not enough data for personalized recommendations. Showing popular products.'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get similar products based on a product
 * @route   GET /api/recommendations/similar/:productId
 * @access  Public
 */
export const getSimilarProducts = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const limit = parseInt(req.query.limit) || 6;

    const similarProducts = await recommendationEngine.getSimilarProducts(
      productId,
      limit
    );

    res.json({
      success: true,
      data: similarProducts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Track user interaction with product
 * @route   POST /api/recommendations/track
 * @access  Private
 */
export const trackUserInteraction = async (req, res, next) => {
  try {
    const { productId, type, metadata } = req.body;

    // Check if user has consented to tracking
    if (!req.user.consentToTracking) {
      return res.status(403).json({
        success: false,
        message: 'User has not consented to tracking'
      });
    }

    // Validate interaction type
    const validTypes = ['view', 'click', 'add_to_cart', 'purchase'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid interaction type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    const interaction = await trackInteraction({
      userId: req.user.id,
      productId,
      type,
      metadata
    });

    res.status(201).json({
      success: true,
      data: interaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's interaction history
 * @route   GET /api/recommendations/history
 * @access  Private
 */
export const getInteractionHistory = async (req, res, next) => {
  try {
    const { type, limit, skip } = req.query;

    const interactions = await getUserInteractions(req.user.id, {
      type,
      limit: parseInt(limit) || 50,
      skip: parseInt(skip) || 0
    });

    res.json({
      success: true,
      data: interactions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get popular products (fallback for non-personalized)
 * @route   GET /api/recommendations/popular
 * @access  Public
 */
export const getPopularProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const popularProducts = await recommendationEngine.getPopularProducts(limit);

    res.json({
      success: true,
      data: popularProducts
    });
  } catch (error) {
    next(error);
  }
};
