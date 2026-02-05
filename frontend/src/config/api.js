/**
 * API configuration
 */
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GET_ME: '/auth/me',
  UPDATE_PREFERENCES: '/auth/preferences',

  // Products
  GET_PRODUCTS: '/products',
  GET_PRODUCT: (id) => `/products/${id}`,
  GET_CATEGORIES: '/products/categories/list',
  GET_BRANDS: '/products/brands/list',
  GET_FEATURED: '/products/featured/list',

  // Orders
  CREATE_ORDER: '/orders',
  GET_ORDERS: '/orders',
  GET_ORDER: (id) => `/orders/${id}`,

  // Recommendations
  GET_RECOMMENDATIONS: '/recommendations',
  GET_SIMILAR: (id) => `/recommendations/similar/${id}`,
  TRACK_INTERACTION: '/recommendations/track',
  GET_POPULAR: '/recommendations/popular',
  GET_HISTORY: '/recommendations/history'
};
