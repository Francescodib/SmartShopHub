import { body, param, query } from 'express-validator';

/**
 * Validation rules for user registration
 */
export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('consentToTracking').optional().isBoolean()
];

/**
 * Validation rules for user login
 */
export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

/**
 * Validation rules for product ID parameter
 */
export const productIdValidation = [
  param('id').isMongoId().withMessage('Invalid product ID')
];

/**
 * Validation rules for pagination
 */
export const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

/**
 * Validation rules for product filters
 */
export const productFilterValidation = [
  query('category').optional().isString(),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  query('search').optional().isString()
];
