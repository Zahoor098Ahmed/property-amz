const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// API service for making HTTP requests
class ApiService {
  async request(endpoint, options = {}) {
    if (!endpoint) {
      console.error('Endpoint is undefined or null');
      throw new Error('Invalid endpoint provided to API request');
    }
    
    // Add cache-busting parameter to prevent browser caching
    const cacheBuster = `_=${new Date().getTime()}`;
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${API_BASE_URL}${endpoint}${separator}${cacheBuster}`;
    
    const headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      ...(options.headers || {}),
    };
    
    // Add Content-Type if not FormData
    if (!options.isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    // Add authentication token if required
    if (options.requiresAuth) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers['Authorization'] = `Bearer ${adminToken}`;
      }
    }
    
    const config = {
      headers,
      ...options,
    };
    
    // Remove custom options from config
    delete config.requiresAuth;
    delete config.isFormData;

    try {
      console.log(`API Request to: ${url}`, config);
      
      // Check if server is available first
      try {
        const response = await fetch(url, config);
        console.log(`API Response status: ${response.status}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP error! status: ${response.status}, response:`, errorText);
          let errorMessage = `HTTP error! status: ${response.status}`;
          
          // Try to parse error message from response if possible
          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson && errorJson.message) {
              errorMessage = errorJson.message;
            }
          } catch (e) {
            // If can't parse JSON, use the error text if it exists
            if (errorText) {
              errorMessage += ` - ${errorText}`;
            }
          }
          
          throw new Error(errorMessage);
        }
        
        // Safely parse JSON response
        const responseText = await response.text();
        if (!responseText) {
          console.warn('Empty response received');
          return {};
        }
        
        try {
          return JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON parse error:', parseError, 'Response text:', responseText);
          throw new Error('Invalid JSON response from server');
        }
      } catch (fetchError) {
        if (fetchError.name === 'TypeError' && fetchError.message.includes('Failed to fetch')) {
          console.error('Server connection error - backend may not be running');
          throw new Error('Cannot connect to server. Please check if the backend is running.');
        }
        throw fetchError;
      }
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
  
  async createProperty(propertyData, isFormData = false) {
    try {
      console.log('Creating property with data:', isFormData ? 'FormData object' : propertyData);
      
      const headers = {};
      
      // Don't set Content-Type for FormData (browser will set it with boundary)
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }
      
      // Remove Content-Type from request options for FormData
      const requestOptions = {
        method: 'POST',
        headers,
        body: isFormData ? propertyData : JSON.stringify(propertyData),
      };
      
      if (isFormData) {
        delete requestOptions.headers['Content-Type'];
      }
      
      const response = await this.request('/properties', requestOptions);
      console.log('Create property response:', response);
      return response;
    } catch (error) {
      console.error('Error in createProperty:', error);
      return { success: false, message: error.message || 'Failed to create property' };
    }
  }
  
  async updateProperty(id, propertyData, isFormData = false) {
    if (!id) {
      console.error('No property ID provided for update');
      return { success: false, message: 'No property ID provided' };
    }
    
    try {
      console.log('Updating property with ID:', id);
      console.log('Property data:', isFormData ? 'FormData object' : propertyData);
      
      const headers = {};
      
      // Don't set Content-Type for FormData (browser will set it with boundary)
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }
      
      // Remove Content-Type from request options for FormData
      const requestOptions = {
        method: 'PUT',
        headers,
        body: isFormData ? propertyData : JSON.stringify(propertyData),
      };
      
      if (isFormData) {
        delete requestOptions.headers['Content-Type'];
      }
      
      const response = await this.request(`/properties/${id}`, requestOptions);
      console.log('Update property response:', response);
      return response;
    } catch (error) {
      console.error('Error in updateProperty:', error);
      return { success: false, message: error.message || 'Failed to update property' };
    }
  }
  
  async deleteProperty(id) {
    if (!id) {
      console.error('No property ID provided for deletion');
      return { success: false, message: 'No property ID provided' };
    }
    
    try {
      console.log('Deleting property with ID:', id);
      const response = await this.request(`/properties/${id}`, {
        method: 'DELETE'
      });
      console.log('Delete property response:', response);
      return response;
    } catch (error) {
      console.error('Error in deleteProperty:', error);
      return { success: false, message: error.message || 'Failed to delete property' };
    }
  }

  // Contact API methods
  async submitContactForm(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async getContactSubmissions() {
    return this.request('/contact', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
  }
  
  async updateContact(id, contactData) {
    if (!id) {
      console.error('No contact ID provided for update');
      return { success: false, message: 'No contact ID provided' };
    }
    
    try {
      console.log('Updating contact with ID:', id);
      return this.request(`/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(contactData),
      });
    } catch (error) {
      console.error('Error in updateContact:', error);
      throw error;
    }
  }
  
  async updateContactStatus(id, status, isEdited = false) {
    if (!id) {
      console.error('No contact ID provided for status update');
      return { success: false, message: 'No contact ID provided' };
    }
    
    try {
      console.log('Updating contact status with ID:', id);
      return this.request(`/contact/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status, isEdited }),
      });
    } catch (error) {
      console.error('Error in updateContactStatus:', error);
      throw error;
    }
  }
  
  async deleteContact(id) {
    if (!id) {
      console.error('No contact ID provided for deletion');
      return { success: false, message: 'No contact ID provided' };
    }
    
    try {
      console.log('Deleting contact with ID:', id);
      return this.request(`/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
    } catch (error) {
      console.error('Error in deleteContact:', error);
      throw error;
    }
  }

  // Posts API methods
  async getPosts(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'all') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/posts${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async getPostBySlug(slug) {
    return this.request(`/posts/${slug}`);
  }

  async getAdminPosts(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== 'all') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    // Make sure we're using the correct endpoint path
    const endpoint = `/posts/admin/all${queryString ? `?${queryString}` : ''}`;
    
    console.log('Fetching admin posts with endpoint:', endpoint);
    const adminToken = localStorage.getItem('adminToken');
    console.log('Admin token available:', !!adminToken);
    
    try {
      const result = await this.request(endpoint, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      console.log('Admin posts API response:', result);
      return result;
    } catch (error) {
      console.error('Error fetching admin posts:', error);
      throw error;
    }
  }

  async createPost(postData) {
    console.log('API Service: Creating post with data:', postData);
    return this.request('/posts/admin', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
  }

  async updatePost(id, postData) {
    console.log('API Service: Updating post with ID:', id, 'Data:', postData);
    return this.request(`/posts/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
  }

  async deletePost(id) {
    return this.request(`/posts/admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
  }

  async getPostForEdit(id) {
    return this.request(`/posts/admin/edit/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
  }

  // Blog API methods
  async getBlogs(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'all') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/blogs${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async getBlogById(id) {
    if (!id) {
      throw new Error('Blog ID is required');
    }
    return this.request(`/blogs/${id}`);
  }

  async createBlog(blogData) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    };
    
    const requestOptions = {
      method: 'POST',
      headers
    };
    
    if (blogData instanceof FormData) {
      requestOptions.body = blogData;
    } else {
      headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(blogData);
    }
    
    return this.request('/blogs', requestOptions);
  }

  async updateBlog(id, blogData) {
    if (!id) {
      throw new Error('Blog ID is required');
    }
    
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    };
    
    const requestOptions = {
      method: 'PUT',
      headers
    };
    
    if (blogData instanceof FormData) {
      requestOptions.body = blogData;
    } else {
      headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(blogData);
    }
    
    return this.request(`/blogs/${id}`, requestOptions);
  }

  async deleteBlog(id) {
    if (!id) {
      throw new Error('Blog ID is required');
    }
    
    return this.request(`/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
  }

  // Partner API methods
  async getPartners(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'all') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/partners${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async getPartnerById(id) {
    if (!id) {
      throw new Error('Partner ID is required');
    }
    return this.request(`/partners/${id}`);
  }

  async createPartner(partnerData) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    };
    
    const requestOptions = {
      method: 'POST',
      headers
    };
    
    if (partnerData instanceof FormData) {
      requestOptions.body = partnerData;
    } else {
      headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(partnerData);
    }
    
    return this.request('/partners', requestOptions);
  }

  async updatePartner(id, partnerData) {
    if (!id) {
      throw new Error('Partner ID is required for update');
    }
    
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    };
    
    const requestOptions = {
      method: 'PUT',
      headers
    };
    
    if (partnerData instanceof FormData) {
      requestOptions.body = partnerData;
    } else {
      headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(partnerData);
    }
    
    return this.request(`/partners/${id}`, requestOptions);
  }

  async deletePartner(id) {
    if (!id) {
      throw new Error('Partner ID is required for deletion');
    }
    
    return this.request(`/partners/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
  }

  // Projects API methods
  async getProjects(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'all') {
        queryParams.append(key, filters[key]);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/projects${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async getProjectById(id) {
    if (!id) {
      throw new Error('Project ID is required');
    }
    return this.request(`/projects/${id}`);
  }

  async createProject(projectData) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    };
    
    const requestOptions = {
      method: 'POST',
      headers
    };
    
    if (projectData instanceof FormData) {
      requestOptions.body = projectData;
    } else {
      headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(projectData);
    }
    
    return this.request('/projects', requestOptions);
  }

  async updateProject(id, projectData) {
    if (!id) {
      throw new Error('Project ID is required for update');
    }
    
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    };
    
    const requestOptions = {
      method: 'PUT',
      headers
    };
    
    if (projectData instanceof FormData) {
      requestOptions.body = projectData;
    } else {
      headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(projectData);
    }
    
    return this.request(`/projects/${id}`, requestOptions);
  }

  async deleteProject(id) {
    if (!id) {
      throw new Error('Project ID is required for deletion');
    }
    
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
  }

  // Testimonials API methods
  async getTestimonials(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/testimonials${queryString ? `?${queryString}` : ''}`);
  }

  async getTestimonialById(id) {
    return this.request(`/testimonials/${id}`);
  }

  async createTestimonial(testimonialData, isFormData = false) {
    const options = {
      method: 'POST',
      requiresAuth: true
    };

    if (isFormData) {
      options.body = testimonialData;
    } else {
      options.body = JSON.stringify(testimonialData);
    }

    return this.request('/testimonials', options);
  }

  async updateTestimonial(id, testimonialData, isFormData = false) {
    const options = {
      method: 'PUT',
      requiresAuth: true
    };

    if (isFormData) {
      options.body = testimonialData;
    } else {
      options.body = JSON.stringify(testimonialData);
    }

    return this.request(`/testimonials/${id}`, options);
  }

  async deleteTestimonial(id) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
      requiresAuth: true
    });
  }

  async toggleTestimonialStatus(id) {
    return this.request(`/testimonials/${id}/toggle-status`, {
      method: 'PATCH',
      requiresAuth: true
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Admin API methods
  async adminLogin(credentials) {
    if (!credentials || typeof credentials !== 'object') {
      console.error('Invalid credentials provided:', credentials);
      throw new Error('Invalid credentials format');
    }
    
    console.log('Attempting login with credentials:', credentials);
    try {
      const response = await this.request('/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      console.log('Login response:', response);
      return response;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  }

  // Admin Partners Management
  async getAdminPartners(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/partners${queryString ? `?${queryString}` : ''}`, {
      requiresAuth: true
    });
  }

  async createAdminPartner(partnerData) {
    return this.request('/admin/partners', {
      method: 'POST',
      body: JSON.stringify(partnerData),
      requiresAuth: true
    });
  }

  async updateAdminPartner(id, partnerData) {
    return this.request(`/admin/partners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(partnerData),
      requiresAuth: true
    });
  }

  async deleteAdminPartner(id) {
    return this.request(`/admin/partners/${id}`, {
      method: 'DELETE',
      requiresAuth: true
    });
  }

  // Admin Testimonials Management
  async getAdminTestimonials(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/testimonials${queryString ? `?${queryString}` : ''}`, {
      requiresAuth: true
    });
  }

  async createAdminTestimonial(testimonialData) {
    return this.request('/admin/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData),
      requiresAuth: true
    });
  }

  async updateAdminTestimonial(id, testimonialData) {
    return this.request(`/admin/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonialData),
      requiresAuth: true
    });
  }

  async deleteAdminTestimonial(id) {
    return this.request(`/admin/testimonials/${id}`, {
      method: 'DELETE',
      requiresAuth: true
    });
  }

  // Admin Blogs Management
  async getAdminBlogs(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/blogs${queryString ? `?${queryString}` : ''}`, {
      requiresAuth: true
    });
  }

  async createAdminBlog(blogData) {
    return this.request('/admin/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
      requiresAuth: true
    });
  }

  async updateAdminBlog(id, blogData) {
    return this.request(`/admin/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
      requiresAuth: true
    });
  }

  async deleteAdminBlog(id) {
    return this.request(`/admin/blogs/${id}`, {
      method: 'DELETE',
      requiresAuth: true
    });
  }

  // Admin Properties Management
  async getAdminProperties(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/admin/properties${queryString ? `?${queryString}` : ''}`, {
      requiresAuth: true
    });
  }

  async createAdminProperty(propertyData, isFormData = false) {
    const options = {
      method: 'POST',
      requiresAuth: true
    };
    
    if (isFormData) {
      options.body = propertyData;
      options.isFormData = true;
    } else {
      options.body = JSON.stringify(propertyData);
    }
    
    return this.request('/admin/properties', options);
  }

  async updateAdminProperty(id, propertyData, isFormData = false) {
    const options = {
      method: 'PUT',
      requiresAuth: true
    };
    
    if (isFormData) {
      options.body = propertyData;
      options.isFormData = true;
    } else {
      options.body = JSON.stringify(propertyData);
    }
    
    return this.request(`/admin/properties/${id}`, options);
  }

  async deleteAdminProperty(id) {
    return this.request(`/admin/properties/${id}`, {
      method: 'DELETE',
      requiresAuth: true
    });
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
  createProperty,
  updateProperty,
  deleteProperty,
  submitContactForm,
  getContactSubmissions,
  getPosts,
  getPostBySlug,
  getAdminPosts,
  createPost,
  updatePost,
  deletePost,
  getPostForEdit,
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
  healthCheck,
  adminLogin,
  getAdminPartners,
  createAdminPartner,
  updateAdminPartner,
  deleteAdminPartner,
  getAdminTestimonials,
  createAdminTestimonial,
  updateAdminTestimonial,
  deleteAdminTestimonial,
  getAdminBlogs,
  createAdminBlog,
  updateAdminBlog,
  deleteAdminBlog,
  getAdminProperties,
  createAdminProperty,
  updateAdminProperty,
  deleteAdminProperty
} = apiService;