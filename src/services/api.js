const API_BASE_URL = 'http://localhost:5000/api';

// API service for making HTTP requests
class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Properties API methods
  async getProperties(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'all') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async getPropertyById(id) {
    return this.request(`/properties/${id}`);
  }

  async searchProperties(query) {
    return this.request(`/properties/search?q=${encodeURIComponent(query)}`);
  }

  // Contact API methods
  async submitContactForm(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async getContactSubmissions() {
    return this.request('/contact');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
export { apiService };

// Export individual methods for convenience
export const {
  getProperties,
  getPropertyById,
  searchProperties,
  submitContactForm,
  getContactSubmissions,
  healthCheck
} = apiService;