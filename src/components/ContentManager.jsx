import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const ContentManager = () => {
  const [content, setContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      description: ''
    },
    about: {
      title: '',
      description: '',
      mission: '',
      vision: ''
    },
    services: {
      title: '',
      subtitle: ''
    },
    contact: {
      address: '',
      phone: '',
      email: '',
      hours: ''
    }
  })
  const [loading, setLoading] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/content')
      if (response.ok) {
        const data = await response.json()
        setContent(data)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
      toast.error('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (section) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/content/${section}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content[section])
      })

      if (response.ok) {
        toast.success(`${section} content updated successfully`)
      } else {
        throw new Error('Failed to update content')
      }
    } catch (error) {
      console.error('Error updating content:', error)
      toast.error('Failed to update content')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const renderHeroSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Hero Section</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Title
          </label>
          <input
            type="text"
            value={content.hero.title}
            onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter main title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            value={content.hero.subtitle}
            onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter subtitle"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={content.hero.description}
            onChange={(e) => handleInputChange('hero', 'description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
          />
        </div>
      </div>
      <button
        onClick={() => handleSave('hero')}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Hero Content'}
      </button>
    </div>
  )

  const renderAboutSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">About Section</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={content.about.title}
            onChange={(e) => handleInputChange('about', 'title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter about title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={content.about.description}
            onChange={(e) => handleInputChange('about', 'description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter about description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mission
          </label>
          <textarea
            value={content.about.mission}
            onChange={(e) => handleInputChange('about', 'mission', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter mission statement"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vision
          </label>
          <textarea
            value={content.about.vision}
            onChange={(e) => handleInputChange('about', 'vision', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter vision statement"
          />
        </div>
      </div>
      <button
        onClick={() => handleSave('about')}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save About Content'}
      </button>
    </div>
  )

  const renderContactSection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            value={content.contact.address}
            onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="text"
            value={content.contact.phone}
            onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={content.contact.email}
            onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Hours
          </label>
          <input
            type="text"
            value={content.contact.hours}
            onChange={(e) => handleInputChange('contact', 'hours', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter business hours"
          />
        </div>
      </div>
      <button
        onClick={() => handleSave('contact')}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Contact Information'}
      </button>
    </div>
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Website Content Management</h2>
        <p className="text-gray-600">Manage and update website content sections</p>
      </div>

      {/* Section Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'hero', label: 'Hero Section' },
            { key: 'about', label: 'About Us' },
            { key: 'contact', label: 'Contact Info' }
          ].map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeSection === 'hero' && renderHeroSection()}
        {activeSection === 'about' && renderAboutSection()}
        {activeSection === 'contact' && renderContactSection()}
      </div>
    </div>
  )
}

export default ContentManager