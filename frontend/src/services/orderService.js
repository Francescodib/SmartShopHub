import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../config/api';

/**
 * Create new order
 */
export const createOrder = async (token, orderData) => {
  const response = await axios.post(
    `${API_URL}${API_ENDPOINTS.CREATE_ORDER}`,
    orderData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to create order');
};

/**
 * Get user's orders
 */
export const getOrders = async (token, page = 1, limit = 10) => {
  const response = await axios.get(
    `${API_URL}${API_ENDPOINTS.GET_ORDERS}?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || 'Failed to fetch orders');
};

/**
 * Get single order by ID
 */
export const getOrder = async (token, orderId) => {
  const response = await axios.get(
    `${API_URL}${API_ENDPOINTS.GET_ORDER(orderId)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch order');
};
