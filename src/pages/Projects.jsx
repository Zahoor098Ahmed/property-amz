import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiService from '../services/api'
import WishlistButton from '../components/WishlistButton'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Enhanced filters for offplan projects
  const [bedroomFilter, setBedroomFilter] = useState('all')
  const [bathroomFilter, setBathroomFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [developerFilter, setDeveloperFilter] = useState('all')
  const [sortBy, setSortBy] = useState('price-high-low')
  
  // Get URL parameters for developer filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const developer = urlParams.get('developer')
    if (developer) {
      setDeveloperFilter(developer)
    }
  }, [])

  const openProjectDetail = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectDetail = () => {
    setSelectedProject(null)
    setIsModalOpen(false)
  }

  const handleShare = (e, project) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `Check out this amazing project: ${project.title}`,
        url: window.location.href
      })
    } else {
      const shareText = `Check out this amazing project: ${project.title} - ${window.location.href}`
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Project link copied to clipboard!')
      })
    }
  }

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await apiService.getProjects()
        if (response.success && response.data) {
          setProjects(Array.isArray(response.data) ? response.data : [])
        } else {
          setError('Failed to fetch projects')
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to connect to server')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = Array.isArray(projects) ? projects.filter(project => {
    const typeMatch = filter === 'all' || project.type === filter
    const locationMatch = locationFilter === 'all' || project.location === locationFilter
    
    // Enhanced filters
    const bedroomMatch = bedroomFilter === 'all' || project.bedrooms === parseInt(bedroomFilter)
    const bathroomMatch = bathroomFilter === 'all' || project.bathrooms === parseInt(bathroomFilter)
    const statusMatch = statusFilter === 'all' || project.status === statusFilter
    const developerMatch = developerFilter === 'all' || 
      (project.developer && project.developer.toLowerCase().includes(developerFilter.toLowerCase()))
    
    const searchMatch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.developer && project.developer.toLowerCase().includes(searchQuery.toLowerCase()))
    
    let priceMatch = true
    
    if (priceRange === 'under-2m') {
      priceMatch = project.priceFrom < 2000000
    } else if (priceRange === '2m-5m') {
      priceMatch = project.priceFrom >= 2000000 && project.priceFrom <= 5000000
    } else if (priceRange === '5m-10m') {
      priceMatch = project.priceFrom >= 5000000 && project.priceFrom <= 10000000
    } else if (priceRange === 'over-10m') {
      priceMatch = project.priceFrom > 10000000
    }
    
    return typeMatch && locationMatch && searchMatch && priceMatch && 
           bedroomMatch && bathroomMatch && statusMatch && developerMatch
  }).sort((a, b) => {
    // Sorting functionality
    switch (sortBy) {
      case 'price-low-high':
        return a.priceFrom - b.priceFrom
      case 'price-high-low':
        return b.priceFrom - a.priceFrom
      case 'bedrooms-asc':
        return a.bedrooms - b.bedrooms
      case 'bedrooms-desc':
        return b.bedrooms - a.bedrooms
      default:
        return 0
    }
  }) : []

  const uniqueLocations = [...new Set(Array.isArray(projects) ? projects.map(project => project.location) : [])]
  const uniqueDevelopers = [...new Set(Array.isArray(projects) ? projects.map(project => project.developer) : [])]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-dark-900">
      {/* Hero Header */}
      <section className="relative py-32 bg-gradient-to-r from-dark-900 via-luxury-900 to-dark-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)'
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 animate-fade-in">
            Offplan Market
          </span>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 font-serif animate-slide-up">
            <span className="bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
              Luxury Projects
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Discover Dubai's most prestigious offplan developments from world-class developers
          </p>
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="py-8 bg-black/90 backdrop-blur-sm border-b border-gold-500/20 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="relative">
              <label className="block text-sm font-medium text-gold-400 mb-2">Search by Project Name or Location</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter project name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-12 bg-dark-800 border border-gold-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-lg text-white placeholder-gray-400"
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
                  <label className="block text-sm font-medium text-gold-400 mb-2">Property Type</label>
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
                  <label className="block text-sm font-medium text-gold-400 mb-2">Location</label>
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
                  <label className="block text-sm font-medium text-gold-400 mb-2">Developer</label>
                  <select 
                    value={developerFilter} 
                    onChange={(e) => setDeveloperFilter(e.target.value)}
                    className="luxury-select"
                  >
                    <option key="all-developers" value="all">All Developers</option>
                    {uniqueDevelopers.map(developer => (
                      <option key={developer} value={developer}>{developer}</option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gold-400 mb-2">Price Range</label>
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
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gold-400 mb-2">Bedrooms</label>
                  <select 
                    value={bedroomFilter} 
                    onChange={(e) => setBedroomFilter(e.target.value)}
                    className="luxury-select"
                  >
                    <option key="all-bedrooms" value="all">All Bedrooms</option>
                    <option key="studio" value="0">Studio</option>
                    <option key="1-bed" value="1">1 Bedroom</option>
                    <option key="2-bed" value="2">2 Bedrooms</option>
                    <option key="3-bed" value="3">3 Bedrooms</option>
                    <option key="4-bed" value="4">4 Bedrooms</option>
                    <option key="5-bed" value="5">5+ Bedrooms</option>
                  </select>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gold-400 mb-2">Bathrooms</label>
                  <select 
                    value={bathroomFilter} 
                    onChange={(e) => setBathroomFilter(e.target.value)}
                    className="luxury-select"
                  >
                    <option key="all-bathrooms" value="all">All Bathrooms</option>
                    <option key="1-bath" value="1">1 Bathroom</option>
                    <option key="2-bath" value="2">2 Bathrooms</option>
                    <option key="3-bath" value="3">3 Bathrooms</option>
                    <option key="4-bath" value="4">4+ Bathrooms</option>
                  </select>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gold-400 mb-2">Status</label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="luxury-select"
                  >
                    <option key="all-status" value="all">All Status</option>
                    <option key="ready" value="Ready">Ready</option>
                    <option key="construction" value="In Construction">In Construction</option>
                  </select>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gold-400 mb-2">Sort By</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="luxury-select"
                  >
                    <option key="price-high-low" value="price-high-low">Price: High → Low</option>
                    <option key="price-low-high" value="price-low-high">Price: Low → High</option>
                    <option key="bedrooms-desc" value="bedrooms-desc">Bedrooms: High → Low</option>
                    <option key="bedrooms-asc" value="bedrooms-asc">Bedrooms: Low → High</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button 
                    onClick={() => { 
                      setFilter('all'); 
                      setPriceRange('all'); 
                      setLocationFilter('all'); 
                      setSearchQuery(''); 
                      setBedroomFilter('all');
                      setBathroomFilter('all');
                      setStatusFilter('all');
                      setDeveloperFilter('all');
                      setSortBy('price-desc');
                    }}
                    className="btn-primary text-sm mt-6"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            
              <div className="flex items-center gap-4">
                <div className="text-gray-300 font-medium">
                  {filteredProjects.length} of {projects.length} projects
                </div>
                
                <div className="flex bg-dark-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-gold-500 shadow-sm text-black' : 'text-gray-400 hover:text-gold-400'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-gold-500 shadow-sm text-black' : 'text-gray-400 hover:text-gold-400'
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

      {/* Projects Grid/List */}
      <section className="py-16 bg-gradient-to-b from-black to-dark-900">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
              <p className="text-white mt-4">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`luxury-card cursor-pointer transform hover:scale-105 transition-all duration-500 animate-fade-in ${
                    viewMode === 'list' ? 'flex gap-6' : ''
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                  onClick={() => openProjectDetail(project)}
                >
                  <div className={`relative overflow-hidden rounded-xl ${viewMode === 'list' ? 'w-80 flex-shrink-0' : ''}`}>
                    <img 
                      src={project.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === 'Ready' ? 'bg-green-500 text-white' : 'bg-gold-500 text-black'
                      }`}>
                        {project.status || 'In Construction'}
                      </span>
                      {project.type && (
                        <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                          {project.type}
                        </span>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <WishlistButton 
                        item={project}
                        type="project"
                        className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        size="sm"
                      />
                      <button
                        onClick={(e) => handleShare(e, project)}
                        className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-gold-400 transition-colors font-serif">
                        {project.title}
                      </h3>
                      <div className="text-right">
                        <p className="text-gold-400 font-bold text-lg">
                          From AED {project.priceFrom?.toLocaleString() || 'TBD'}
                        </p>
                        {project.priceTo && (
                          <p className="text-gray-400 text-sm">
                            To AED {project.priceTo.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description || 'Luxury development in prime location'}
                    </p>
                    
                    <div className="flex items-center text-gray-400 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{project.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
                        </svg>
                        <span>{project.bedrooms || 'Various'} Bedrooms</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span>{project.bathrooms || 'Various'} Bathrooms</span>
                      </div>
                    </div>
                    
                    {project.developer && (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gold-400 font-semibold">{project.developer}</span>
                        <span className="text-gray-400 text-sm">{project.type || 'Mixed Development'}</span>
                      </div>
                    )}
                    
                    {/* Key Highlights */}
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-white font-semibold mb-2 text-sm">Key Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights ? (
                          project.highlights.slice(0, 3).map((highlight, idx) => (
                            <span key={idx} className="bg-dark-700 text-gold-400 px-2 py-1 rounded text-xs">
                              {highlight}
                            </span>
                          ))
                        ) : (
                          <>
                            <span className="bg-dark-700 text-gold-400 px-2 py-1 rounded text-xs">
                              Prime Location
                            </span>
                            <span className="bg-dark-700 text-gold-400 px-2 py-1 rounded text-xs">
                              Luxury Amenities
                            </span>
                            <span className="bg-dark-700 text-gold-400 px-2 py-1 rounded text-xs">
                              Modern Design
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedProject.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
                alt={selectedProject.title}
                className="w-full h-80 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeProjectDetail}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2 font-serif">{selectedProject.title}</h2>
                  <p className="text-gray-400 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {selectedProject.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gold-400 font-bold text-2xl">
                    From AED {selectedProject.priceFrom?.toLocaleString() || 'TBD'}
                  </p>
                  {selectedProject.priceTo && (
                    <p className="text-gray-400">
                      To AED {selectedProject.priceTo.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-dark-700 p-4 rounded-xl text-center">
                  <p className="text-gray-400 text-sm mb-1">Bedrooms</p>
                  <p className="text-white font-bold text-lg">{selectedProject.bedrooms || 'Various'}</p>
                </div>
                <div className="bg-dark-700 p-4 rounded-xl text-center">
                  <p className="text-gray-400 text-sm mb-1">Bathrooms</p>
                  <p className="text-white font-bold text-lg">{selectedProject.bathrooms || 'Various'}</p>
                </div>
                <div className="bg-dark-700 p-4 rounded-xl text-center">
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <p className="text-gold-400 font-bold text-lg">{selectedProject.status || 'In Construction'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">Description</h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.description || 'Luxury development featuring world-class amenities and prime location in Dubai.'}
                </p>
              </div>
              
              {selectedProject.developer && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Developer</h3>
                  <p className="text-gold-400 font-semibold">{selectedProject.developer}</p>
                </div>
              )}
              
              <div className="flex gap-4">
                <button className="btn-primary flex-1">
                  Request Information
                </button>
                <button 
                  onClick={(e) => handleShare(e, selectedProject)}
                  className="btn-secondary px-6"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects