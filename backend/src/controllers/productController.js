import Product from '../models/Product.js';
import { validationResult } from 'express-validator';

/**
 * @desc    Get all products with filtering, search, and pagination
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};

    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Brand filter
    if (req.query.brand) {
      query.brand = req.query.brand;
    }

    // Search query
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Stock filter (only in-stock products)
    if (req.query.inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    // Execute query
    const products = await Product.find(query)
      .sort(req.query.sort || '-createdAt')
      .limit(limit)
      .skip(skip)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get product categories
 * @route   GET /api/products/categories/list
 * @access  Public
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get product brands
 * @route   GET /api/products/brands/list
 * @access  Public
 */
export const getBrands = async (req, res, next) => {
  try {
    const brands = await Product.distinct('brand');

    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured/trending products
 * @route   GET /api/products/featured/list
 * @access  Public
 */
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    // Get products with highest ratings or most recent
    const products = await Product.find({ stock: { $gt: 0 } })
      .sort({ 'rating.average': -1, 'rating.count': -1 })
      .limit(limit)
      .lean();

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};
