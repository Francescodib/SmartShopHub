import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../config/api';

/**
 * Get personalized recommendations for user
 */
export const getRecommendations = async (token, limit = 10) => {
  const response = await axios.get(
    `${API_URL}${API_ENDPOINTS.GET_RECOMMENDATIONS}?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch recommendations');
};

/**
 * Get similar products
 */
export const getSimilarProducts = async (productId, limit = 6) => {
  const response = await axios.get(
    `${API_URL}${API_ENDPOINTS.GET_SIMILAR(productId)}?limit=${limit}`
  );

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch similar products');
};

/**
 * Track user interaction
 */
export const trackInteraction = async (token, productId, type, metadata = {}) => {
  try {
    const response = await axios.post(
      `${API_URL}${API_ENDPOINTS.TRACK_INTERACTION}`,
      {
        productId,
        type,
        metadata
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    // Silently fail tracking - don't disrupt user experience
    console.warn('Failed to track interaction:', error.message);
    return null;
  }
};

/**
 * Get popular products
 */
export const getPopularProducts = async (limit = 10) => {
  const response = await axios.get(
    `${API_URL}${API_ENDPOINTS.GET_POPULAR}?limit=${limit}`
  );

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch popular products');
};
