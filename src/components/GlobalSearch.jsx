import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { apiService } from '../services/api'

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({
    properties: [],
    projects: [],
    blogs: [],
    partners: []
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const searchRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults({ properties: [], projects: [], blogs: [], partners: [] })
      return
    }

    setLoading(true)
    try {
      const [propertiesRes, projectsRes, blogsRes, partnersRes] = await Promise.all([
        apiService.getProperties({ search: searchQuery, limit: 5 }),
        apiService.getProjects({ search: searchQuery, limit: 5 }),
        apiService.getBlogs({ search: searchQuery, limit: 5 }),
        apiService.getPartners({ search: searchQuery, limit: 5 })
      ])

      setResults({
        properties: propertiesRes.data || [],
        projects: projectsRes.data || [],
        blogs: blogsRes.data || [],
        partners: partnersRes.data || []
      })
    } catch (error) {
      console.error('Search error:', error)
      setResults({ properties: [], projects: [], blogs: [], partners: [] })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query])

  const getTotalResults = () => {
    return results.properties.length + results.projects.length + results.blogs.length + results.partners.length
  }

  const getFilteredResults = () => {
    if (activeTab === 'all') return results
    return {
      properties: activeTab === 'properties' ? results.properties : [],
      projects: activeTab === 'projects' ? results.projects : [],
      blogs: activeTab === 'blogs' ? results.blogs : [],
      partners: activeTab === 'partners' ? results.partners : []
    }
  }

  const handleResultClick = () => {
    onClose()
    setQuery('')
    setResults({ properties: [], projects: [], blogs: [], partners: [] })
  }

  if (!isOpen) return null

  const filteredResults = getFilteredResults()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
      
      {/* Search Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div 
          ref={searchRef}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all"
        >
          {/* Search Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search properties, projects, blogs, partners..."
                className="w-full pl-10 pr-4 py-3 text-lg border-0 focus:ring-0 focus:outline-none placeholder-gray-400"
              />
              <button
                onClick={onClose}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Filters */}
          {query && (
            <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex space-x-1">
                {[
                  { id: 'all', label: `All (${getTotalResults()})` },
                  { id: 'properties', label: `Properties (${results.properties.length})` },
                  { id: 'projects', label: `Projects (${results.projects.length})` },
                  { id: 'blogs', label: `Blogs (${results.blogs.length})` },
                  { id: 'partners', label: `Partners (${results.partners.length})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      activeTab === tab.id
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            ) : query && getTotalResults() === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-1">Try different keywords or check spelling</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {/* Properties Results */}
                {filteredResults.properties.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Properties
                    </h3>
                    <div className="space-y-2">
                      {filteredResults.properties.map(property => (
                        <Link
                          key={property._id}
                          to={`/properties?id=${property._id}`}
                          onClick={handleResultClick}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                            {property.images && property.images.length > 0 ? (
                              <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">{property.title}</p>
                            <p className="text-sm text-gray-500">{property.location}</p>
                            <p className="text-sm font-semibold text-amber-600">
                              AED {property.price?.toLocaleString()}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects Results */}
                {filteredResults.projects.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Projects
                    </h3>
                    <div className="space-y-2">
                      {filteredResults.projects.map(project => (
                        <Link
                          key={project._id}
                          to={`/projects?id=${project._id}`}
                          onClick={handleResultClick}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                            {project.images && project.images.length > 0 ? (
                              <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">{project.title}</p>
                            <p className="text-sm text-gray-500">{project.developer} • {project.location}</p>
                            <p className="text-sm font-semibold text-amber-600">
                              {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blogs Results */}
                {filteredResults.blogs.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Blogs
                    </h3>
                    <div className="space-y-2">
                      {filteredResults.blogs.map(blog => (
                        <Link
                          key={blog._id}
                          to={`/blog/${blog.slug || blog._id}`}
                          onClick={handleResultClick}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                            {blog.image ? (
                              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">{blog.title}</p>
                            <p className="text-sm text-gray-500 line-clamp-2">{blog.excerpt}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Partners Results */}
                {filteredResults.partners.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Partners
                    </h3>
                    <div className="space-y-2">
                      {filteredResults.partners.map(partner => (
                        <Link
                          key={partner._id}
                          to={`/partner/${partner._id}`}
                          onClick={handleResultClick}
                          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                            {partner.logo ? (
                              <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">{partner.name}</p>
                            <p className="text-sm text-gray-500">{partner.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Footer */}
          {query && (
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
              <div className="flex items-center justify-between">
                <span>Press ESC to close</span>
                <span>Found {getTotalResults()} results</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GlobalSearch