import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiService from '../services/api'

const Properties = () => {
  const [filter, setFilter] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [likedProperties, setLikedProperties] = useState(new Set())

  const openPropertyDetail = (property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  const closePropertyDetail = () => {
    setSelectedProperty(null)
    setIsModalOpen(false)
  }

  const handleLike = (e, propertyId) => {
    e.stopPropagation()
    setLikedProperties(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(propertyId)) {
        newLiked.delete(propertyId)
      } else {
        newLiked.add(propertyId)
      }
      return newLiked
    })
  }

  const handleShare = (e, property) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this amazing property: ${property.title}`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `Check out this amazing property: ${property.title} - ${window.location.href}`
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Property link copied to clipboard!')
      })
    }
  }

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiService.getProperties()
        if (response.success && response.data) {
          setProperties(response.data)
        } else {
          setError('Failed to fetch properties')
        }
      } catch (err) {
        console.error('Error fetching properties:', err)
        setError('Failed to connect to server')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Properties data will be fetched from API

  const filteredProperties = properties.filter(property => {
    const typeMatch = filter === 'all' || property.type === filter
    const locationMatch = locationFilter === 'all' || property.location === locationFilter
    const projectMatch = projectFilter === 'all' || (property.projectName && property.projectName === projectFilter)
    
    const searchMatch = searchQuery === '' || 
      (property.projectName && property.projectName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    let priceMatch = true
    
    if (priceRange === 'under-2m') {
      priceMatch = property.price < 2000000
    } else if (priceRange === '2m-5m') {
      priceMatch = property.price >= 2000000 && property.price <= 5000000
    } else if (priceRange === '5m-10m') {
      priceMatch = property.price >= 5000000 && property.price <= 10000000
    } else if (priceRange === 'over-10m') {
      priceMatch = property.price > 10000000
    }
    
    return typeMatch && locationMatch && projectMatch && searchMatch && priceMatch
  })

  const uniqueLocations = [...new Set(properties.map(property => property.location))]
  const uniqueProjects = [...new Set(properties.map(property => property.projectName))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <section className="relative py-32 bg-gradient-to-r from-dark-900 via-luxury-900 to-dark-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-600/20 to-gold-600/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 animate-fade-in">
            Exclusive Collection
          </span>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 font-serif animate-slide-up">
            <span className="bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
              Luxury Properties
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Discover Dubai's most prestigious properties in the world's most exclusive locations
          </p>
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="w-full">
              <label className="block text-sm font-medium text-dark-700 mb-2">Search by Project Name or Location</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter project name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-600 focus:border-transparent text-lg"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Filter Row */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative">
                  <label className="block text-sm font-medium text-dark-700 mb-2">Property Type</label>
                  <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="luxury-select"
                  >
                    <option key="all-types" value="all">All Types</option>
                    <option key="apartment" value="apartment">Apartments</option>
                    <option key="villa" value="villa">Villas</option>
                    <option key="penthouse" value="penthouse">Penthouses</option>
                    <option key="townhouse" value="townhouse">Townhouses</option>
                    <option key="studio" value="studio">Studios</option>
                  </select>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-dark-700 mb-2">Location</label>
                  <select 
                    value={locationFilter} 
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="luxury-select"
                  >
                    <option key="all-locations" value="all">All Locations</option>
                    {uniqueLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-dark-700 mb-2">Project</label>
                  <select 
                    value={projectFilter} 
                    onChange={(e) => setProjectFilter(e.target.value)}
                    className="luxury-select"
                  >
                    <option key="all-projects" value="all">All Projects</option>
                    {uniqueProjects.map(project => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-dark-700 mb-2">Price Range</label>
                  <select 
                    value={priceRange} 
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="luxury-select"
                  >
                    <option key="all-prices" value="all">All Prices</option>
                    <option key="under-2m" value="under-2m">Under AED 2M</option>
                    <option key="2m-5m" value="2m-5m">AED 2M - 5M</option>
                    <option key="5m-10m" value="5m-10m">AED 5M - 10M</option>
                    <option key="over-10m" value="over-10m">Over AED 10M</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button 
                    onClick={() => { setFilter('all'); setPriceRange('all'); setLocationFilter('all'); setProjectFilter('all'); setSearchQuery(''); }}
                    className="btn-primary text-sm mt-6"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            
              <div className="flex items-center gap-4">
              <div className="text-dark-600 font-medium">
                {filteredProperties.length} of {properties.length} properties
              </div>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-luxury-600' : 'text-gray-600 hover:text-luxury-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-luxury-600' : 'text-gray-600 hover:text-luxury-600'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid/List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-luxury-200 border-t-luxury-600 rounded-full animate-spin mx-auto mb-8"></div>
              <h3 className="text-2xl font-bold text-dark-800 mb-4 font-serif">Loading Properties...</h3>
              <p className="text-dark-600">Please wait while we fetch the latest luxury properties for you.</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-dark-800 mb-4 font-serif">Error Loading Properties</h3>
              <p className="text-xl text-dark-600 mb-8 max-w-md mx-auto">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary btn-lg"
              >
                Retry
              </button>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-luxury-100 to-gold-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-luxury-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-dark-800 mb-4 font-serif">No Properties Found</h3>
              <p className="text-xl text-dark-600 mb-8 max-w-md mx-auto">Adjust your search criteria to discover more luxury properties.</p>
              <button 
                onClick={() => { setFilter('all'); setPriceRange('all'); }}
                className="btn-primary btn-lg"
              >
                View All Properties
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}>
              {filteredProperties.map((property, index) => (
                <div 
                  key={property.id} 
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-gold transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-pointer ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                  onClick={() => openPropertyDetail(property)}
                >
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'md:w-1/2' : ''
                  }`}>
                    <img 
                      src={property.images && property.images[0] ? property.images[0] : property.image} 
                      alt={property.title}
                      className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                        viewMode === 'list' ? 'w-full h-64 md:h-full' : 'w-full h-80'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {property.badge && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-gradient-to-r from-luxury-600 to-gold-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                          {property.badge}
                        </span>
                      </div>
                    )}
                    
                    <div className="absolute top-6 right-6 flex gap-2">
                      <button 
                        onClick={(e) => handleLike(e, property.id)}
                        className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                          likedProperties.has(property.id) 
                            ? 'bg-red-500/80 text-white scale-110' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => handleShare(e, property)}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="absolute bottom-6 left-6">
                      <span className="bg-dark-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {property.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`p-8 ${
                    viewMode === 'list' ? 'md:w-1/2 flex flex-col justify-between' : ''
                  }`}>
                    <div>
                      <div className="mb-4">
                        <span className="text-luxury-600 text-sm font-medium tracking-wider uppercase">
                          {property.location}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-dark-800 mb-3 font-serif group-hover:text-luxury-600 transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-dark-600 mb-6 leading-relaxed">
                        {property.description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                          <div className="text-lg font-bold text-dark-800">{property.bedrooms}</div>
                          <div className="text-sm text-dark-600">Bedrooms</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                          <div className="text-lg font-bold text-dark-800">{property.bathrooms}</div>
                          <div className="text-sm text-dark-600">Bathrooms</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                          <div className="text-lg font-bold text-dark-800">{property.areaFormatted || property.area}</div>
                          <div className="text-sm text-dark-600">Area</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-3xl font-bold text-luxury-600 font-serif">{property.priceFormatted || `AED ${property.price?.toLocaleString()}`}</div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openPropertyDetail(property);
                          }}
                          className="btn-primary group-hover:shadow-gold transition-all duration-300"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark-900 via-luxury-900 to-dark-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-600/20 to-gold-600/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold mb-6 font-serif bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
            Discover Your Dream Property
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Our luxury real estate experts are ready to help you find the perfect property that exceeds your expectations
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="btn-primary btn-lg">
              Schedule Consultation
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
            <a href="tel:+971-4-123-4567" className="btn-ghost btn-lg">
              Call Now: +971 4 123 4567
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Property Detail Modal */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closePropertyDetail}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <img
                src={selectedProperty.images && selectedProperty.images[0] ? selectedProperty.images[0] : selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-80 object-cover"
              />
              
              <div className="absolute bottom-6 left-6">
                <span className="bg-dark-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium capitalize">
                  {selectedProperty.type}
                </span>
              </div>
              
              {selectedProperty.badge && (
                <div className="absolute top-6 left-6">
                  <span className="bg-gradient-to-r from-luxury-600 to-gold-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {selectedProperty.badge}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <span className="text-luxury-600 text-sm font-medium tracking-wider uppercase">
                  {selectedProperty.location}
                </span>
                <h2 className="text-4xl font-bold text-dark-800 mb-4 font-serif">
                  {selectedProperty.title}
                </h2>
                <div className="text-4xl font-bold text-luxury-600 font-serif mb-6">
                  {selectedProperty.priceFormatted || `AED ${selectedProperty.price?.toLocaleString()}`}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <div className="text-2xl font-bold text-dark-800">{selectedProperty.bedrooms}</div>
                  <div className="text-sm text-dark-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <div className="text-2xl font-bold text-dark-800">{selectedProperty.bathrooms}</div>
                  <div className="text-sm text-dark-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <div className="text-2xl font-bold text-dark-800">{selectedProperty.areaFormatted || selectedProperty.area}</div>
                  <div className="text-sm text-dark-600">Area</div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-dark-800 mb-4 font-serif">Property Description</h3>
                <p className="text-dark-600 leading-relaxed mb-4">{selectedProperty.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-dark-800 mb-4">Property Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-dark-600">Year Built:</span>
                      <span className="font-medium">{selectedProperty.yearBuilt || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-600">Property Type:</span>
                      <span className="font-medium">{selectedProperty.type || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-600">Furnishing:</span>
                      <span className="font-medium">{selectedProperty.furnished ? 'Furnished' : 'Unfurnished'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-600">Status:</span>
                      <span className="font-medium">{selectedProperty.status || 'Available'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-dark-800 mb-4">Contact Agent</h4>
                  <div className="bg-gradient-to-br from-luxury-50 to-gold-50 p-6 rounded-xl">
                    <div className="text-lg font-bold text-dark-800 mb-2">AMZ Properties Agent</div>
                    <div className="space-y-2">
                      <a href="tel:+971-4-123-4567" className="flex items-center text-luxury-600 hover:text-luxury-700">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        +971 4 123 4567
                      </a>
                      <a href="mailto:info@amzproperties.com" className="flex items-center text-luxury-600 hover:text-luxury-700">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        info@amzproperties.com
                      </a>
                    </div>
                    <button className="btn-primary w-full mt-4">
                      Contact Agent
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-dark-800 mb-4">Features</h4>
                  <ul className="space-y-2">
                    {selectedProperty.features && selectedProperty.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-dark-600">
                        <svg className="w-4 h-4 mr-2 text-luxury-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-dark-800 mb-4">Property Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-dark-600">Featured:</span>
                      <span className="font-medium">{selectedProperty.featured ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-600">Created:</span>
                      <span className="font-medium">{selectedProperty.createdAt ? new Date(selectedProperty.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-600">Coordinates:</span>
                      <span className="font-medium">{selectedProperty.coordinates ? `${selectedProperty.coordinates.lat}, ${selectedProperty.coordinates.lng}` : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Properties