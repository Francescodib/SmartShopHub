import express from 'express';
import {
  getProducts,
  getProduct,
  getCategories,
  getBrands,
  getFeaturedProducts
} from '../controllers/productController.js';
import {
  productIdValidation,
  paginationValidation,
  productFilterValidation
} from '../utils/validators.js';

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
router.get(
  '/',
  [...paginationValidation, ...productFilterValidation],
  getProducts
);

/**
 * @swagger
 * /api/products/categories/list:
 *   get:
 *     summary: Get all product categories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Categories retrieved
 */
router.get('/categories/list', getCategories);

/**
 * @swagger
 * /api/products/brands/list:
 *   get:
 *     summary: Get all product brands
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Brands retrieved
 */
router.get('/brands/list', getBrands);

/**
 * @swagger
 * /api/products/featured/list:
 *   get:
 *     summary: Get featured products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Featured products retrieved
 */
router.get('/featured/list', getFeaturedProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved
 *       404:
 *         description: Product not found
 */
router.get('/:id', productIdValidation, getProduct);

export default router;
