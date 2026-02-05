import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../config/api';

/**
 * Login user
 */
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}${API_ENDPOINTS.LOGIN}`, {
    email,
    password
  });

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Login failed');
};

/**
 * Register new user
 */
export const register = async (name, email, password, consentToTracking = false) => {
  const response = await axios.post(`${API_URL}${API_ENDPOINTS.REGISTER}`, {
    name,
    email,
    password,
    consentToTracking
  });

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Registration failed');
};

/**
 * Get current user profile
 */
export const getMe = async (token) => {
  const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_ME}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to fetch user data');
};

/**
 * Update user preferences
 */
export const updatePreferences = async (token, preferences) => {
  const response = await axios.put(
    `${API_URL}${API_ENDPOINTS.UPDATE_PREFERENCES}`,
    preferences,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || 'Failed to update preferences');
};
