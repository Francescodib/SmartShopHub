import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../config/api';

/**
 * Get products with filters and pagination
 */
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);
  if (filters.category) params.append('category', filters.category);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.search) params.append('search', filters.search);
  if (filters.brand) params.append('brand', filters.brand);
  if (filters.sort) params.append('sort', filters.sort);

  const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_PRODUCTS}?${params}`);

  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || 'Failed to fetch products');
};

/**
 * Get single product by ID
 */
export const getProduct = async (id) => {
  const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_PRODUCT(id)}`);

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch product');
};

/**
 * Get all categories
 */
export const getCategories = async () => {
  const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_CATEGORIES}`);

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch categories');
};

/**
 * Get all brands
 */
export const getBrands = async () => {
  const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_BRANDS}`);

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch brands');
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (limit = 8) => {
  const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_FEATURED}?limit=${limit}`);

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch featured products');
};
