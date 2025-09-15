import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
<<<<<<< HEAD
import PropertyManagement from '../../components/admin/PropertyManagement'
import ContactManagement from '../../components/admin/ContactManagement'
import ReviewManagement from '../../components/admin/ReviewManagement'
import BlogManagement from '../../components/admin/BlogManagement'
import PartnerManagement from '../../components/admin/PartnerManagement'
=======
<<<<<<< HEAD
import PropertyManagement from '../../components/admin/PropertyManagement'
import ContactManagement from '../../components/admin/ContactManagement'
import BlogManagement from '../../components/admin/BlogManagement'
import PartnerManagement from '../../components/admin/PartnerManagement'
=======
import PropertyManagement from './PropertyManagement'
import ContactManagement from '../../components/admin/ContactManagement'
import BlogManagement from '../../components/admin/BlogManagement'
import PartnerManagement from '../../components/admin/PartnerManagement'
import TestimonialManagement from '../../components/admin/TestimonialManagement'
import ProjectManagement from '../../components/admin/ProjectManagement'
import WishlistManagement from './WishlistManagement'
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
import amzLogo from '../../assets/amz.logo.jpeg'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties')
  const [adminInfo, setAdminInfo] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const user = localStorage.getItem('adminUser')
    
    if (!token) {
      navigate('/admin/login')
      return
    }

    // Set admin info from localStorage or use default
    if (user) {
      try {
        setAdminInfo(JSON.parse(user))
      } catch (error) {
        console.error('Error parsing admin user data:', error)
        // Fallback to default admin info
        setAdminInfo({
          name: 'Admin User',
          email: 'admin@amzproperties.com'
        })
      }
    } else {
      // Fallback to default admin info
      setAdminInfo({
        name: 'Admin User',
        email: 'admin@amzproperties.com'
      })
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    toast.success('Logged out successfully')
    navigate('/admin/login')
  }

  const tabs = [
    { 
      id: 'properties', 
      label: 'Properties', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
      id: 'projects', 
      label: 'Projects', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      id: 'wishlist', 
      label: 'Wishlist', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
      id: 'contacts', 
      label: 'Contacts', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
<<<<<<< HEAD
      id: 'reviews', 
      label: 'Reviews', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
        </svg>
      )
    },
    { 
=======
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
      id: 'blogs', 
      label: 'Blogs', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    { 
      id: 'partners', 
      label: 'Partners', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    },
    { 
      id: 'testimonials', 
      label: 'Testimonials', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-black via-gray-900 to-black shadow-2xl border-b-2 border-yellow-400 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <img 
                src={amzLogo} 
                alt="AMZ Properties Logo" 
                className="w-16 h-16 rounded-xl filter drop-shadow-lg border border-yellow-400/30 hover:scale-105 transition-all duration-300"
                style={{imageRendering: 'crisp-edges'}}
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  AMZ Properties
                </h1>
                <p className="text-yellow-300/70 text-sm font-medium">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {adminInfo && (
                <div className="text-right">
                  <div className="text-yellow-300 font-medium">{adminInfo.name}</div>
                  <div className="text-yellow-400/60 text-xs">Administrator</div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-gradient-to-r from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-md border-b border-yellow-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 px-6 font-medium text-sm transition-all duration-300 rounded-t-xl ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-b from-yellow-400/20 to-yellow-600/10 text-yellow-300 border-b-2 border-yellow-400 shadow-lg'
                    : 'text-yellow-200/70 hover:text-yellow-300 hover:bg-yellow-400/5 border-b-2 border-transparent hover:border-yellow-400/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-300">{tab.icon}</span>
                  <span className="font-semibold">{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 rounded-2xl shadow-2xl border border-yellow-400/30 backdrop-blur-sm overflow-hidden">
            {/* Content Header */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/5 border-b border-yellow-400/20 p-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-black">
                    {tabs.find(tab => tab.id === activeTab)?.icon}
                  </span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  {tabs.find(tab => tab.id === activeTab)?.label} Management
                </h2>
              </div>
            </div>
            
            {/* Content Body */}
            <div className="p-8">
              {activeTab === 'properties' && <PropertyManagement />}
<<<<<<< HEAD
              {activeTab === 'contacts' && <ContactManagement />}
              {activeTab === 'reviews' && <ReviewManagement />}
              {activeTab === 'blogs' && <BlogManagement />}
              {activeTab === 'partners' && <PartnerManagement />}
=======
<<<<<<< HEAD
              {activeTab === 'contacts' && <ContactManagement />}
              {activeTab === 'blogs' && <BlogManagement />}
              {activeTab === 'partners' && <PartnerManagement />}
=======
              {activeTab === 'projects' && <ProjectManagement />}
              {activeTab === 'wishlist' && <WishlistManagement />}
              {activeTab === 'contacts' && <ContactManagement />}
              {activeTab === 'blogs' && <BlogManagement />}
              {activeTab === 'partners' && <PartnerManagement />}
              {activeTab === 'testimonials' && <TestimonialManagement />}
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
            </div>
          </div>
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  )
}

export default AdminDashboard