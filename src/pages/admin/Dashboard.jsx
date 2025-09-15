import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import PropertyManagement from '../../components/admin/PropertyManagement'
import ContactManagement from '../../components/admin/ContactManagement'
import BlogManagement from '../../components/admin/BlogManagement'
import PartnerManagement from '../../components/admin/PartnerManagement'
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
      id: 'contacts', 
      label: 'Contacts', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
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
              {activeTab === 'contacts' && <ContactManagement />}
              {activeTab === 'blogs' && <BlogManagement />}
              {activeTab === 'partners' && <PartnerManagement />}
            </div>
          </div>
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  )
}

export default AdminDashboard