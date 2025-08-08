// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Helper function to make API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  let url = `${API_BASE_URL}${endpoint}`;
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  if (data) {
    if (method === 'GET') {
      // For GET requests, append data as query parameters
      const params = new URLSearchParams(data).toString();
      url = `${url}?${params}`;
    } else {
      // For other methods, include data in the request body
      config.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Something went wrong');
    }

    return responseData;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API
export const authApi = {
  login: (email, password) => 
    apiRequest('/api/auth/login', 'POST', { email, password }),
  
  register: (userData) => 
    apiRequest('/api/auth/register', 'POST', userData),
    
  verifyOtp: (email, otp) =>
    apiRequest('/api/auth/verify-otp', 'POST', { email, otp }),
    
  forgotPassword: (email) =>
    apiRequest('/api/auth/forgot-password', 'POST', { email }),
    
  resetPassword: (token, newPassword) =>
    apiRequest('/api/auth/reset-password', 'POST', { token, newPassword })
};

// Events API
export const eventsApi = {
  getAll: () => 
    apiRequest('/api/events'),
    
  getById: (id) => 
    apiRequest(`/api/events/${id}`),
    
  create: (eventData) => 
    apiRequest('/api/events', 'POST', eventData),
    
  update: (id, eventData) => 
    apiRequest(`/api/events/${id}`, 'PUT', eventData),
    
  delete: (id) => 
    apiRequest(`/api/events/${id}`, 'DELETE')
};

export const auth = authApi;
export const events = eventsApi;

export default {
  auth,
  events
};
