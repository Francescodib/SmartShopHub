import express from 'express';
import {
  getRecommendations,
  getSimilarProducts,
  trackUserInteraction,
  getInteractionHistory,
  getPopularProducts
} from '../controllers/recommendationController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     summary: Get personalized recommendations for user
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recommendations retrieved
 */
router.get('/', protect, getRecommendations);

/**
 * @swagger
 * /api/recommendations/popular:
 *   get:
 *     summary: Get popular products
 *     tags: [Recommendations]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Popular products retrieved
 */
router.get('/popular', getPopularProducts);

/**
 * @swagger
 * /api/recommendations/similar/{productId}:
 *   get:
 *     summary: Get similar products based on collaborative filtering
 *     tags: [Recommendations]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Similar products retrieved
 */
router.get('/similar/:productId', getSimilarProducts);

/**
 * @swagger
 * /api/recommendations/track:
 *   post:
 *     summary: Track user interaction with product
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - type
 *             properties:
 *               productId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [view, click, add_to_cart, purchase]
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Interaction tracked
 */
router.post('/track', protect, trackUserInteraction);

/**
 * @swagger
 * /api/recommendations/history:
 *   get:
 *     summary: Get user's interaction history
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Interaction history retrieved
 */
router.get('/history', protect, getInteractionHistory);

export default router;
