import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, approved, rejected
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    featured: 0
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/reviews/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews || [])
        calculateStats(data.reviews || [])
      } else {
        toast.error('Failed to fetch reviews')
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
      toast.error('Error fetching reviews')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (reviewsData) => {
    const stats = {
      total: reviewsData.length,
      pending: reviewsData.filter(r => r.status === 'pending').length,
      approved: reviewsData.filter(r => r.status === 'approved').length,
      rejected: reviewsData.filter(r => r.status === 'rejected').length,
      featured: reviewsData.filter(r => r.featured).length
    }
    setStats(stats)
  }

  const updateReviewStatus = async (reviewId, status) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/reviews/admin/${reviewId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })
      
      if (response.ok) {
        toast.success(`Review ${status} successfully`)
        fetchReviews() // Refresh the list
      } else {
        toast.error('Failed to update review status')
      }
    } catch (error) {
      console.error('Error updating review:', error)
      toast.error('Error updating review')
    }
  }

  const toggleFeatured = async (reviewId, featured) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/reviews/admin/${reviewId}/featured`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ featured: !featured })
      })
      
      if (response.ok) {
        toast.success(`Review ${!featured ? 'featured' : 'unfeatured'} successfully`)
        fetchReviews() // Refresh the list
      } else {
        toast.error('Failed to update featured status')
      }
    } catch (error) {
      console.error('Error updating featured status:', error)
      toast.error('Error updating featured status')
    }
  }

  const deleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/reviews/admin/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (response.ok) {
        toast.success('Review deleted successfully')
        fetchReviews() // Refresh the list
      } else {
        toast.error('Failed to delete review')
      }
    } catch (error) {
      console.error('Error deleting review:', error)
      toast.error('Error deleting review')
    }
  }

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || review.status === filter
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const StatCard = ({ title, value, color, icon }) => (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-white/60">
          {icon}
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Reviews"
          value={stats.total}
          color="from-blue-500 to-blue-600"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          }
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          color="from-yellow-500 to-yellow-600"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          color="from-green-500 to-green-600"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          color="from-red-500 to-red-600"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Featured"
          value={stats.featured}
          color="from-purple-500 to-purple-600"
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
            </svg>
          }
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-yellow-400/20">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  filter === filterOption
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-yellow-400/20">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <p className="text-gray-400 text-lg">No reviews found</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review._id} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{review.title || 'Review'}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span className="font-medium">{review.name}</span>
                        <span>{review.email}</span>
                        <span>{review.propertyType}</span>
                        {review.location && <span>{review.location}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                      {review.featured && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-purple-600 bg-purple-100">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'} fill-current`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-300 text-sm">({review.rating}/5)</span>
                  </div>
                  
                  {/* Review Message */}
                  <p className="text-gray-300 leading-relaxed mb-4">{review.message}</p>
                  
                  {/* Company */}
                  {review.company && (
                    <p className="text-yellow-400 text-sm font-medium">Company: {review.company}</p>
                  )}
                  
                  {/* Date */}
                  <p className="text-gray-500 text-xs mt-2">
                    Submitted: {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-2 min-w-[200px]">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateReviewStatus(review._id, 'approved')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                      </button>
                      <button
                        onClick={() => updateReviewStatus(review._id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                      </button>
                    </>
                  )}
                  
                  {review.status === 'approved' && (
                    <button
                      onClick={() => toggleFeatured(review._id, review.featured)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        review.featured
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-gray-600 hover:bg-gray-700 text-white'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                      </svg>
                      {review.featured ? 'Unfeature' : 'Feature'}
                    </button>
                  )}
                  
                  {review.status !== 'pending' && (
                    <button
                      onClick={() => updateReviewStatus(review._id, 'pending')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mark Pending
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ReviewManagement