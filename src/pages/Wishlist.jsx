import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../contexts/WishlistContext'
import WishlistButton from '../components/WishlistButton'

const Wishlist = () => {
  const { wishlistItems, getWishlistByType, clearWishlist, wishlistCount, propertiesCount, projectsCount } = useWishlist()
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filteredItems = activeTab === 'all' 
    ? wishlistItems 
    : getWishlistByType(activeTab === 'properties' ? 'property' : 'project')

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(1)}M`
    }
    return `AED ${price.toLocaleString()}`
  }

  const PropertyCard = ({ item }) => (
    <div className="bg-dark-800 rounded-2xl overflow-hidden border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={item.images?.[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
          alt={item.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <WishlistButton item={item} type={item.type} size="md" />
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-gold-500 text-black text-sm font-medium rounded-full">
            {item.type === 'property' ? 'Property' : 'Project'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
            {item.title || item.projectName}
          </h3>
          <span className="text-2xl font-bold text-gold-400">
            {formatPrice(item.price)}
          </span>
        </div>
        
        <div className="flex items-center text-gray-400 mb-4">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{item.location}</span>
        </div>
        
        {item.bedrooms && (
          <div className="flex items-center gap-4 text-gray-300 mb-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524z" />
              </svg>
              <span>{item.bedrooms} Bed</span>
            </div>
            {item.bathrooms && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>{item.bathrooms} Bath</span>
              </div>
            )}
            {item.size && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 000 2h14a1 1 0 100-2H3zM3 8a1 1 0 000 2h14a1 1 0 100-2H3zM3 12a1 1 0 100 2h14a1 1 0 100-2H3z" />
                </svg>
                <span>{item.size} sq ft</span>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Added {new Date(item.addedAt).toLocaleDateString()}
          </span>
          <Link 
            to={item.type === 'property' ? `/properties` : `/projects`}
            className="btn-primary text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-dark-900">
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
            Your Collection
          </span>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 font-serif animate-slide-up">
            <span className="bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
              Wishlist
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Your saved properties and projects in one place
          </p>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Stats and Controls */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400">{wishlistCount}</div>
                <div className="text-gray-400">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400">{propertiesCount}</div>
                <div className="text-gray-400">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400">{projectsCount}</div>
                <div className="text-gray-400">Projects</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Tabs */}
              <div className="flex bg-dark-800 rounded-xl p-1">
                {[
                  { id: 'all', label: 'All', count: wishlistCount },
                  { id: 'properties', label: 'Properties', count: propertiesCount },
                  { id: 'projects', label: 'Projects', count: projectsCount }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.id 
                        ? 'bg-gold-500 text-black font-medium' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeTab === tab.id ? 'bg-black/20' : 'bg-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex bg-dark-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-gold-500 text-black' : 'text-gray-400 hover:text-gold-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-gold-500 text-black' : 'text-gray-400 hover:text-gold-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Clear All Button */}
              {wishlistCount > 0 && (
                <button
                  onClick={clearWishlist}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Wishlist Items */}
          {filteredItems.length > 0 ? (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredItems.map((item) => (
                <PropertyCard key={`${item.type}-${item.id}`} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-600">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {activeTab === 'all' ? 'Your wishlist is empty' : `No ${activeTab} in wishlist`}
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Start exploring our {activeTab === 'all' ? 'properties and projects' : activeTab} and save your favorites here.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/properties" className="btn-primary">
                  Browse Properties
                </Link>
                <Link to="/projects" className="btn-ghost">
                  Browse Projects
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Wishlist