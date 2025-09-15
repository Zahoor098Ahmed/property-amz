import React, { useState, useEffect } from 'react'
import apiService from '../../services/api'

const WishlistManagement = () => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [stats, setStats] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({
    type: 'all',
    search: '',
    period: '7d'
  })
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchWishlistData()
  }, [currentPage, filters])

  useEffect(() => {
    if (activeTab === 'analytics') {
      fetchAnalytics()
    }
  }, [activeTab, filters.period])

  const fetchWishlistData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      
      // Fetch wishlist items
      const itemsResponse = await apiService.get('/api/wishlist/admin/all', {
        params: {
          page: currentPage,
          limit: 20,
          type: filters.type,
          search: filters.search
        },
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setWishlistItems(itemsResponse.data.wishlistItems)
      setTotalPages(itemsResponse.data.pagination.pages)
      
      // Fetch stats
      const statsResponse = await apiService.get('/api/wishlist/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setStats(statsResponse.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching wishlist data:', err)
      setError('Failed to load wishlist data')
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await apiService.get('/api/wishlist/admin/analytics', {
        params: { period: filters.period },
        headers: { Authorization: `Bearer ${token}` }
      })
      setAnalytics(response.data)
    } catch (err) {
      console.error('Error fetching analytics:', err)
    }
  }

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this wishlist item?')) {
      return
    }
    
    try {
      const token = localStorage.getItem('adminToken')
      await apiService.delete(`/api/wishlist/admin/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      fetchWishlistData()
    } catch (err) {
      console.error('Error deleting item:', err)
      alert('Failed to delete item')
    }
  }

  const handleClearSession = async (sessionId) => {
    if (!window.confirm(`Are you sure you want to clear all wishlist items for session ${sessionId}?`)) {
      return
    }
    
    try {
      const token = localStorage.getItem('adminToken')
      await apiService.delete(`/api/wishlist/admin/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      fetchWishlistData()
    } catch (err) {
      console.error('Error clearing session:', err)
      alert('Failed to clear session')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-luxury-900 to-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mb-4"></div>
          <p className="text-white text-lg">Loading wishlist data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-luxury-900 to-dark-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent mb-2">
            Wishlist Management
          </h1>
          <p className="text-gray-300">Monitor and manage user wishlist activities</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-dark-800 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'items', label: 'All Items' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gold-500 text-black shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-dark-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Items</p>
                    <p className="text-3xl font-bold text-gold-400">{stats.stats.totalItems}</p>
                  </div>
                  <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Properties</p>
                    <p className="text-3xl font-bold text-blue-400">{stats.stats.propertyItems}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Projects</p>
                    <p className="text-3xl font-bold text-green-400">{stats.stats.projectItems}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Unique Sessions</p>
                    <p className="text-3xl font-bold text-purple-400">{stats.stats.uniqueSessions}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Popular Properties */}
              <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
                <h3 className="text-xl font-bold text-gold-400 mb-4">Popular Properties</h3>
                <div className="space-y-3">
                  {stats.popularProperties.map((item, index) => (
                    <div key={item._id} className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{item.itemData.title}</p>
                        <p className="text-sm text-gray-400">{item.itemData.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gold-400 font-bold">{item.count}</p>
                        <p className="text-xs text-gray-400">wishlisted</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Projects */}
              <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
                <h3 className="text-xl font-bold text-gold-400 mb-4">Popular Projects</h3>
                <div className="space-y-3">
                  {stats.popularProjects.map((item, index) => (
                    <div key={item._id} className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{item.itemData.title}</p>
                        <p className="text-sm text-gray-400">{item.itemData.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gold-400 font-bold">{item.count}</p>
                        <p className="text-xs text-gray-400">wishlisted</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
              <h3 className="text-xl font-bold text-gold-400 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {stats.recentActivity.map((item, index) => (
                  <div key={item._id} className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.itemType === 'property' ? 'bg-blue-400' : 'bg-green-400'
                      }`}></div>
                      <div>
                        <p className="font-medium text-white">{item.itemData.title}</p>
                        <p className="text-sm text-gray-400">Session: {item.sessionId.slice(0, 8)}...</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-300">{formatDate(item.createdAt)}</p>
                      <p className="text-xs text-gray-400 capitalize">{item.itemType}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filters */}
            <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full bg-dark-600 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-gold-500 focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="property">Properties</option>
                    <option value="project">Projects</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="Search by title, location, or session..."
                    className="w-full bg-dark-600 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({ type: 'all', search: '', period: '7d' })}
                    className="w-full bg-gold-500 hover:bg-gold-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl border border-gold-500/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Session</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Added</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {wishlistItems.map((item) => (
                      <tr key={item._id} className="hover:bg-dark-600 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-white">{item.itemData.title}</p>
                            <p className="text-sm text-gray-400">{item.itemData.location}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.itemType === 'property' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {item.itemType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-300">{item.sessionId.slice(0, 12)}...</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-300">{formatDate(item.createdAt)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDeleteItem(item._id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              title="Delete item"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleClearSession(item.sessionId)}
                              className="text-yellow-400 hover:text-yellow-300 transition-colors"
                              title="Clear session"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-dark-900 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-dark-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-500 transition-colors"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-dark-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-500 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            {/* Period Filter */}
            <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-300">Period:</label>
                <select
                  value={filters.period}
                  onChange={(e) => setFilters({ ...filters, period: e.target.value })}
                  className="bg-dark-600 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-gold-500 focus:outline-none"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
              </div>
            </div>

            {analytics && (
              <>
                {/* Daily Stats Chart Placeholder */}
                <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
                  <h3 className="text-xl font-bold text-gold-400 mb-4">Daily Wishlist Activity</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <p>Chart visualization would go here</p>
                    <p className="text-sm ml-2">(Total data points: {analytics.dailyStats.length})</p>
                  </div>
                </div>

                {/* Top Items */}
                <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-xl p-6 border border-gold-500/20">
                  <h3 className="text-xl font-bold text-gold-400 mb-4">Most Wishlisted Items ({filters.period})</h3>
                  <div className="space-y-3">
                    {analytics.topItems.map((item, index) => (
                      <div key={`${item._id.itemId}-${item._id.itemType}`} className="flex items-center justify-between p-3 bg-dark-600 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-white">{item.itemData.title}</p>
                            <p className="text-sm text-gray-400">{item.itemData.location} • {item._id.itemType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gold-400 font-bold">{item.count}</p>
                          <p className="text-xs text-gray-400">times</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistManagement