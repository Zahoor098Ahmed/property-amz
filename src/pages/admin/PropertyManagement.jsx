import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import PropertyForm from '../../components/admin/PropertyForm';
import PropertyList from '../../components/admin/PropertyList';
import apiService from '../../services/api';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    search: ''
  });

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      console.log('Fetching properties from API service');
      const response = await apiService.getProperties();
      console.log('Properties data received:', response);
      if (response.success && response.data) {
        setProperties(Array.isArray(response.data) ? response.data : []);
      } else {
        throw new Error('Failed to fetch properties');
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('PropertyManagement component mounted');
    fetchProperties();
  }, []);

  useEffect(() => {
    console.log('Properties state updated:', properties);
  }, [properties]);

  // Handle adding new property
  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  // Handle editing property
  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  // Handle deleting property
  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProperties(properties.filter(p => p._id !== propertyId));
        toast.success('Property deleted successfully');
      } else {
        throw new Error('Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
      // Fallback: remove from local state anyway
      setProperties(properties.filter(p => p._id !== propertyId));
    }
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      const url = editingProperty 
        ? `/api/properties/${editingProperty._id}`
        : '/api/properties';
      
      const method = editingProperty ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData // FormData for file upload
      });

      if (response.ok) {
        const savedProperty = await response.json();
        
        if (editingProperty) {
          setProperties(properties.map(p => 
            p._id === editingProperty._id ? savedProperty : p
          ));
          toast.success('Property updated successfully');
        } else {
          setProperties([...properties, savedProperty]);
          toast.success('Property added successfully');
        }
        
        setShowForm(false);
        setEditingProperty(null);
      } else {
        throw new Error('Failed to save property');
      }
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Failed to save property');
    }
  };

  // Filter properties based on current filters
  const filteredProperties = properties.filter(property => {
    const matchesType = !filters.type || property.type === filters.type;
    const matchesStatus = !filters.status || property.status === filters.status;
    const matchesSearch = !filters.search || 
      property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      property.location.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const filterOptions = [
    { value: '', label: 'All Properties' },
    { value: 'exclusive', label: 'Exclusive Properties' },
    { value: 'off-plan', label: 'Off-Plan Properties' }
  ];

  console.log('Render - loading:', loading, 'properties:', properties.length);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        <p className="ml-4 text-white">Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Property Management</h1>
          <p className="text-gray-400">Manage exclusive and off-plan properties</p>
        </div>
        <button
          onClick={handleAddProperty}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Property
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 p-4 rounded-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Property Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by title or location..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>
      </div>

      {/* Property Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        <button
          onClick={() => setFilters({...filters, type: ''})}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            filters.type === '' 
              ? 'bg-yellow-500 text-black' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          All Properties ({properties.length})
        </button>
        <button
          onClick={() => setFilters({...filters, type: 'exclusive'})}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            filters.type === 'exclusive' 
              ? 'bg-yellow-500 text-black' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Exclusive Properties ({properties.filter(p => p.type === 'exclusive').length})
        </button>
        <button
          onClick={() => setFilters({...filters, type: 'off-plan'})}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            filters.type === 'off-plan' 
              ? 'bg-yellow-500 text-black' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Off-Plan Properties ({properties.filter(p => p.type === 'off-plan').length})
        </button>
      </div>

      {/* Property List */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
          <p className="text-gray-400 mb-4">Get started by adding your first property.</p>
          <button
            onClick={handleAddProperty}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add Property
          </button>
        </div>
      ) : (
        <PropertyList
          properties={filteredProperties}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />
      )}

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProperty(null);
          }}
        />
      )}
    </div>
  );
};

export default PropertyManagement;