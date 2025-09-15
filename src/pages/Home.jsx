import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
=======
import { apiService } from '../services/api'
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
// Using Unicode symbols instead of react-icons for now

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+971',
    message: ''
  })

  const [counters, setCounters] = useState({
    properties: 0,
    clients: 0,
    experience: 0,
    awards: 0
  })
  const [exclusiveProperties, setExclusiveProperties] = useState([])
  const [offPlanProperties, setOffPlanProperties] = useState([])
  const [partnerDevelopers, setPartnerDevelopers] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [services, setServices] = useState([])
  const [contactContent, setContactContent] = useState(null)
  
  // Mobile swipe functionality
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isManualSwipe, setIsManualSwipe] = useState(false)
  
  // Partner filtering functionality
  const [selectedDeveloper, setSelectedDeveloper] = useState(null)
  const [showDeveloperModal, setShowDeveloperModal] = useState(false)
  const [exclusiveProperties, setExclusiveProperties] = useState([])
  const [offPlanProperties, setOffPlanProperties] = useState([])
  const [partnerDevelopers, setPartnerDevelopers] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [services, setServices] = useState([])
  
  // Loading and error states
  const [partnersLoading, setPartnersLoading] = useState(false)
  const [partnersError, setPartnersError] = useState(null)
  
  // Background images for hero section
  const heroBackgrounds = [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ]

  // Partner Developers Data
  const staticPartnerDevelopers = [
<<<<<<< HEAD
    { id: 1, name: 'Emaar Properties', logo: 'https://via.placeholder.com/200x100/d97706/000000?text=EMAAR', projects: 25 },
    { id: 2, name: 'Dubai Properties', logo: 'https://via.placeholder.com/200x100/d97706/000000?text=DUBAI+PROP', projects: 18 },
    { id: 3, name: 'Damac Properties', logo: 'https://via.placeholder.com/200x100/d97706/000000?text=DAMAC', projects: 22 },
    { id: 4, name: 'Sobha Realty', logo: 'https://via.placeholder.com/200x100/d97706/000000?text=SOBHA', projects: 15 },
    { id: 5, name: 'Meraas', logo: 'https://via.placeholder.com/200x100/d97706/000000?text=MERAAS', projects: 12 },
    { id: 6, name: 'Nakheel', logo: 'https://via.placeholder.com/200x100/d97706/000000?text=NAKHEEL', projects: 20 }
=======
    { 
      id: 1, 
      name: 'Emaar Properties', 
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=150&fit=crop&crop=center', 
      projects: 25,
      description: 'Leading developer of premium lifestyle communities',
      specialties: ['Luxury Residential', 'Commercial', 'Hospitality']
    },
    { 
      id: 2, 
      name: 'Dubai Properties', 
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=150&fit=crop&crop=center', 
      projects: 18,
      description: 'Innovative real estate solutions and developments',
      specialties: ['Mixed-Use', 'Residential', 'Commercial']
    },
    { 
      id: 3, 
      name: 'DAMAC Properties', 
      logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=150&fit=crop&crop=center', 
      projects: 22,
      description: 'Luxury real estate with world-class amenities',
      specialties: ['Luxury Villas', 'Golf Communities', 'Branded Residences']
    },
    { 
      id: 4, 
      name: 'Sobha Realty', 
      logo: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&h=150&fit=crop&crop=center', 
      projects: 15,
      description: 'Premium developer known for quality construction',
      specialties: ['Waterfront Properties', 'Luxury Apartments', 'Premium Villas']
    },
    { 
      id: 5, 
      name: 'Meraas', 
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=150&fit=crop&crop=center', 
      projects: 12,
      description: 'Creating vibrant communities and experiences',
      specialties: ['Entertainment', 'Retail', 'Hospitality']
    },
    { 
      id: 6, 
      name: 'Nakheel', 
      logo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=150&fit=crop&crop=center', 
      projects: 20,
      description: 'Iconic developments shaping Dubai\'s skyline',
      specialties: ['Master Communities', 'Iconic Landmarks', 'Waterfront']
    }
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
  ]

  // Services Data
   const staticServices = [
    {
      icon: <div className="w-16 h-16 bg-gradient-to-br from-luxury-600 to-gold-500 rounded-2xl flex items-center justify-center mx-auto"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>,
      title: 'Property Sales',
      description: 'Expert guidance in buying and selling luxury properties with personalized service'
    },
    {
      icon: <div className="w-16 h-16 bg-gradient-to-br from-luxury-600 to-gold-500 rounded-2xl flex items-center justify-center mx-auto"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>,
      title: 'Property Management',
      description: 'Comprehensive property management services ensuring maximum returns on investment'
    },
    {
      icon: <div className="w-16 h-16 bg-gradient-to-br from-luxury-600 to-gold-500 rounded-2xl flex items-center justify-center mx-auto"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>,
      title: 'Investment Advisory',
      description: 'Strategic investment advice to help you make informed decisions in Dubai real estate'
    },
    {
      icon: <div className="w-16 h-16 bg-gradient-to-br from-luxury-600 to-gold-500 rounded-2xl flex items-center justify-center mx-auto"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>,
      title: 'Concierge Services',
      description: 'Premium concierge services for all your luxury lifestyle and property needs'
    }
  ]


  // Testimonials Data
  const staticTestimonials = [
    {
      id: 1,
      name: 'Ahmed Al Mansouri',
      role: 'CEO, Al Mansouri Holdings',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      text: 'AMZ Properties delivered exceptional service in finding our dream home. Their expertise in luxury properties is unmatched.',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'International Investor',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      text: 'Professional, reliable, and truly understands the luxury market. Highly recommend for premium property investments.',
      rating: 5
    },
    {
      id: 3,
      name: 'Mohammed Hassan',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      text: 'Outstanding experience from start to finish. AMZ Properties made our property purchase seamless and stress-free.',
      rating: 5
    }
  ]

  // Blog Posts Data
  const staticBlogPosts = [
    {
      id: 1,
      title: 'Dubai Real Estate Market Trends 2024',
      excerpt: 'Discover the latest trends shaping Dubai\'s luxury property market and investment opportunities.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
      date: '2024-01-15',
      category: 'Market Analysis'
    },
    {
      id: 2,
      title: 'Investment Guide: Off-Plan Properties',
      excerpt: 'Everything you need to know about investing in off-plan properties in the UAE.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      date: '2024-01-10',
      category: 'Investment'
    },
    {
      id: 3,
      title: 'Luxury Living: Premium Amenities Guide',
      excerpt: 'Explore the world-class amenities that define luxury living in Dubai\'s premium developments.',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=250&fit=crop',
      date: '2024-01-05',
      category: 'Lifestyle'
    }
  ]
  
  // Auto-change background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % heroBackgrounds.length)
    }, 5000) // Change every 5 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  // Animated counters
  useEffect(() => {
    const targets = { properties: 500, clients: 1200, experience: 15, awards: 25 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    
    const intervals = Object.keys(targets).map(key => {
      let current = 0
      const increment = targets[key] / steps
      
      const intervalId = setInterval(() => {
        current += increment
        if (current >= targets[key]) {
          current = targets[key]
          clearInterval(intervalId)
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, stepDuration)
      
      return intervalId
    })
    
    return () => intervals.forEach(clearInterval)
  }, [])

<<<<<<< HEAD
  // Initialize static data
  useEffect(() => {
    setPartnerDevelopers(staticPartnerDevelopers)
    setTestimonials(staticTestimonials)
    setBlogPosts(staticBlogPosts)
    setServices(staticServices)
=======
  // Initialize static data and fetch partners
  useEffect(() => {
    setBlogPosts(staticBlogPosts)
    setServices(staticServices)
    
    // Fetch partners from API
    const fetchPartners = async () => {
      setPartnersLoading(true)
      setPartnersError(null)
      try {
        const response = await apiService.getPartners({ status: 'active' })
        if (response.partners && response.partners.length > 0) {
          // Map API partners to match the expected format
          const mappedPartners = response.partners.map(partner => ({
            id: partner._id,
            name: partner.name,
            logo: partner.logo.startsWith('http') ? partner.logo : `http://localhost:5002${partner.logo}`,
            projects: partner.totalProjects || 0,
            description: partner.description || 'Premium real estate developer',
            specialties: partner.specialties || ['Residential', 'Commercial']
          }))
          setPartnerDevelopers(mappedPartners)
        } else {
          // Fallback to static data if no partners found
          setPartnerDevelopers(staticPartnerDevelopers)
        }
      } catch (error) {
        console.error('Error fetching partners:', error)
        setPartnersError('Failed to load partners')
        // Fallback to static data if API fails
        setPartnerDevelopers(staticPartnerDevelopers)
      } finally {
        setPartnersLoading(false)
      }
    }
    
    // Fetch testimonials
     const fetchTestimonials = async () => {
       try {
         const testimonialsResponse = await apiService.getTestimonials({ status: 'active' })
         if (testimonialsResponse && testimonialsResponse.length > 0) {
           const mappedTestimonials = testimonialsResponse.map(testimonial => ({
             id: testimonial._id,
             name: testimonial.name,
             role: testimonial.role,
             text: testimonial.text,
             image: testimonial.image && testimonial.image.startsWith('http') ? testimonial.image : `http://localhost:5002${testimonial.image || '/uploads/default-avatar.png'}`,
             rating: testimonial.rating
           }))
           setTestimonials(mappedTestimonials)
         } else {
           setTestimonials(staticTestimonials)
         }
       } catch (error) {
         console.error('Error fetching testimonials:', error)
         setTestimonials(staticTestimonials)
       }
     }
     
     // Fetch blog posts
     const fetchBlogPosts = async () => {
       try {
         const blogsResponse = await apiService.getBlogs({ status: 'published', limit: 3 })
         if (blogsResponse && blogsResponse.length > 0) {
           const mappedBlogs = blogsResponse.map(blog => ({
             id: blog._id,
             title: blog.title,
             excerpt: blog.excerpt || blog.content.substring(0, 150) + '...',
             image: blog.featuredImage && blog.featuredImage.startsWith('http') ? blog.featuredImage : `http://localhost:5002${blog.featuredImage || '/uploads/default-blog.jpg'}`,
             category: blog.category || 'Real Estate',
             date: new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
             slug: blog.slug
           }))
           setBlogPosts(mappedBlogs)
         } else {
           setBlogPosts(staticBlogPosts)
         }
       } catch (error) {
         console.error('Error fetching blog posts:', error)
         setBlogPosts(staticBlogPosts)
       }
     }
    
    fetchPartners()
     fetchTestimonials()
     fetchBlogPosts()
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
<<<<<<< HEAD
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials])

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/reviews')
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data.reviews || [])
        } else {
          // Fallback to static data if API fails
          setTestimonials(staticTestimonials)
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
        // Fallback to static data
        setTestimonials(staticTestimonials)
      }
    }
    fetchReviews()
  }, [])

  // Fetch contact content from API
  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/content/contact')
        if (response.ok) {
          const data = await response.json()
          setContactContent(data)
        }
      } catch (error) {
        console.error('Error fetching contact content:', error)
      }
    }
    fetchContactContent()
  }, [])

=======
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [testimonials])

>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Add cache-busting parameter to prevent browser caching
<<<<<<< HEAD
        const response = await fetch(`/api/properties?_=${new Date().getTime()}`)
=======
        const response = await fetch(`http://localhost:3001/api/properties?_=${new Date().getTime()}`)
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
        if (response.ok) {
          const result = await response.json()
          const data = result.success ? result.data : result
          if (Array.isArray(data)) {
            const exclusive = data.filter(property => property.type === 'exclusive')
            const offPlan = data.filter(property => property.type === 'off-plan')
            setExclusiveProperties(exclusive)
            setOffPlanProperties(offPlan)
          } else {
            // Fallback to static data if data is not an array
            setExclusiveProperties(staticExclusiveProperties)
            setOffPlanProperties(staticOffPlanProperties)
          }
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
        // Fallback to static data if API fails
        setExclusiveProperties(staticExclusiveProperties)
        setOffPlanProperties(staticOffPlanProperties)
      }
    }
    
    fetchProperties()
  }, [])

  // Form handling functions
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

<<<<<<< HEAD
=======
  const handleContactChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        message: formData.message,
        source: 'Home Page Contact Form'
      }
      
      const response = await apiService.submitContactForm(contactData)
      
      if (response.success) {
        alert('Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', phone: '', countryCode: '+971', message: '' })
      } else {
        throw new Error(response.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Error sending message. Please try again later.')
    }
  }

>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        alert('Message sent successfully!')
        setFormData({ name: '', email: '', phone: '', countryCode: '+971', message: '' })
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Error sending message. Please try again.')
    }
  }

<<<<<<< HEAD
  const handleDeveloperClick = (developerId) => {
    // Navigate to partner detail page
    window.location.href = `/partner/${developerId}`
=======
  const handleDeveloperClick = (developerId, developerName) => {
    // Store selected developer for filtering
    setSelectedDeveloper({ id: developerId, name: developerName })
    // Navigate to properties page with developer filter
    window.location.href = `/properties?developer=${encodeURIComponent(developerName)}`
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
  }

  const countryCodes = [
    { code: '+971', country: 'UAE' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+966', country: 'Saudi Arabia' }
  ]


  
  // Static Exclusive Properties Data (fallback)
  const staticExclusiveProperties = [
    {
      id: 1,
      title: 'Luxury Villa',
      price: 'FROM AED 7,500,000',
      bedrooms: 2,
      bathrooms: 2,
      location: 'Jumeirah Village Triangle',
      badge: 'Exclusive',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Premium Penthouse',
      price: 'FROM AED 35,000,000',
      bedrooms: 7,
      bathrooms: 7,
      location: 'Al Manara',
      badge: 'Exclusive',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Modern Apartment',
      price: 'FROM AED 2,400,000',
      bedrooms: 2,
      bathrooms: 2,
      location: 'Mohammad Bin Rashid City',
      badge: 'Exclusive',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Studio Apartment',
      price: 'FROM AED 1,850,000',
      bedrooms: 1,
      bathrooms: 1,
      location: 'Mohammad Bin Rashid City',
      badge: 'Exclusive',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Waterfront Villa',
      price: 'FROM AED 3,200,000',
      bedrooms: 4,
      bathrooms: 4,
      location: 'Damac Lagoons',
      badge: 'Exclusive',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Modern Studio',
      price: 'FROM AED 1,280,000',
      bedrooms: 2,
      bathrooms: 2,
      location: 'Dubai Studio City',
      badge: 'Exclusive',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  // Static Off-Plan Properties Data (fallback)
  const staticOffPlanProperties = [
    {
      id: 7,
      title: 'Luxury Apartments',
      price: 'FROM AED 2,100,000',
      bedrooms: '1 2 3',
      location: 'Mina Rashid',
      developer: 'Emaar Properties',
      badge: 'Off Plan',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      title: 'Studio & Apartments',
      price: 'FROM AED 748,000',
      bedrooms: 'Studio 1 2',
      location: 'Majan',
      developer: 'Meraki Developers',
      badge: 'Off Plan',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 9,
      title: 'Premium Villas',
      price: 'FROM AED 4,100,000',
      bedrooms: '1 2 3 4',
      location: 'Palm Jumeirah',
      developer: 'Beyond Development',
      badge: 'Off Plan',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 10,
      title: 'Waterfront Apartments',
      price: 'FROM AED 1,910,000',
      bedrooms: '1 2 3',
      location: 'Dubai Creek Harbour',
      developer: 'Emaar Properties',
      badge: 'Off Plan',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]



  const achievements = [
    { 
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-luxury-600 to-gold-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            <circle cx="12" cy="10" r="2" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
      ), 
      number: counters.properties, 
      label: 'Premium Properties', 
      suffix: '+' 
    },
    { 
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-luxury-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.4"/>
          </svg>
        </div>
      ), 
      number: counters.clients, 
      label: 'Happy Clients', 
      suffix: '+' 
    },
    { 
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v2m0 8v2m6-6h-2m-8 0H6" stroke="currentColor" opacity="0.5"/>
          </svg>
        </div>
      ), 
      number: counters.experience, 
      label: 'Years Experience', 
      suffix: '+' 
    },
    { 
      icon: (
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-gold-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            <circle cx="12" cy="12" r="2" fill="white" opacity="0.3"/>
          </svg>
        </div>
      ), 
      number: counters.awards, 
      label: 'Awards Won', 
      suffix: '+' 
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Search */}
      <section className="relative min-h-screen text-white overflow-hidden">
        {/* Background Images */}
        {heroBackgrounds.map((bg, index) => (
          <div
            key={`hero-bg-${index}`}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-600/40 to-gold-600/40"></div>
        
        {/* Background Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroBackgrounds.map((_, index) => (
            <button
              key={`hero-indicator-${index}`}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBgIndex 
                  ? 'bg-gold-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        
        <div className="relative container mx-auto px-4 py-20 flex flex-col justify-center min-h-screen">
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-8">
              <span className="text-gold-400 font-medium tracking-wider uppercase text-lg mb-4 block">Welcome to AMZ Properties</span>
              <h1 className="text-7xl md:text-8xl font-bold mb-6 font-serif bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent leading-tight">
                Dubai's Premier<br />Luxury Real Estate
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                Discover exceptional properties in the world's most prestigious locations. 
                We specialize in exclusive luxury real estate that defines sophisticated living.
              </p>
            </div>
            
            {/* Property Search */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/20">
              <h3 className="text-2xl font-semibold mb-6 text-gold-200">Find Your Dream Luxury Property</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter project name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-luxury-600 to-gold-500 text-white rounded-xl font-semibold hover:from-luxury-700 hover:to-gold-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Search Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Developers Section */}
<<<<<<< HEAD
      <section className="py-20 bg-black border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Trusted Partners</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">Our Partner Developers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Collaborating with Dubai's most prestigious developers to bring you exceptional properties</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partnerDevelopers.map((developer) => (
              <div 
                key={developer.id}
                onClick={() => handleDeveloperClick(developer.id)}
                className="luxury-card p-6 text-center cursor-pointer group hover:scale-105 transition-all duration-300"
              >
                <img 
                  src={developer.logo} 
                  alt={developer.name}
                  className="w-full h-16 object-contain mb-4 filter brightness-0 invert group-hover:filter-none transition-all duration-300"
                />
                <h3 className="text-white font-semibold text-sm mb-2">{developer.name}</h3>
                <p className="text-gold-400 text-xs">{developer.projects} Projects</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Properties Section */}
      <section className="py-20 bg-black/95 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Premium Collection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">Exclusive Properties with AMZ Properties</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Discover our handpicked selection of Dubai's most prestigious properties</p>
          </div>
          
=======
      <section className="py-24 bg-gradient-to-b from-black via-gray-900/50 to-black border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block animate-fade-in">Trusted Partners</span>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text mb-6 font-serif animate-fade-in">Our Partner Developers</h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in">Collaborating with Dubai's most prestigious developers to bring you exceptional properties and unmatched luxury experiences</p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-8 rounded-full"></div>
          </div>
          
          {/* Loading State */}
          {partnersLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400"></div>
              <span className="ml-4 text-gold-400 font-semibold">Loading Partners...</span>
            </div>
          )}

          {/* Error State */}
          {partnersError && (
            <div className="text-center py-16">
              <div className="text-red-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-lg font-semibold">{partnersError}</p>
                <p className="text-gray-400 mt-2">Please try again later</p>
              </div>
            </div>
          )}

          {/* Partner Logos Carousel */}
          {!partnersLoading && !partnersError && (
          <div className="relative overflow-hidden block">
            <div className="flex animate-scroll-infinite space-x-8 hover:pause-animation">
              {/* First set of logos */}
              {partnerDevelopers.map((developer, index) => (
                <div 
                  key={`first-${developer.id}-${index}`}
                  onClick={() => handleDeveloperClick(developer.id, developer.name)}
                  className="flex-shrink-0 partner-logo-card sparkle-container p-8 text-center cursor-pointer group w-72 partner-card-entrance"
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="relative mb-6">
                    <img 
                      src={developer.logo} 
                      alt={developer.name}
                      className="w-full h-20 object-cover rounded-xl partner-logo-enhanced shadow-lg group-hover:shadow-2xl transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-gold-400 transition-colors duration-300 font-serif">{developer.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">{developer.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {developer.specialties && developer.specialties.slice(0, 2).map((specialty, idx) => (
                      <span key={`first-${developer.id}-specialty-${idx}`} className="px-3 py-1 bg-gold-500/20 text-gold-300 text-xs rounded-full border border-gold-500/30 group-hover:bg-gold-500/30 transition-colors duration-300">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-gold-400 text-sm font-semibold group-hover:text-gold-300 transition-colors duration-300">{developer.projects} Projects</p>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partnerDevelopers.map((developer, index) => (
                <div 
                  key={`second-${developer.id}-${index}`}
                  onClick={() => handleDeveloperClick(developer.id, developer.name)}
                  className="flex-shrink-0 partner-logo-card sparkle-container p-8 text-center cursor-pointer group w-72 partner-card-entrance"
                  style={{animationDelay: `${(index + partnerDevelopers.length) * 0.2}s`}}
                >
                  <div className="relative mb-6">
                    <img 
                      src={developer.logo} 
                      alt={developer.name}
                      className="w-full h-20 object-cover rounded-xl partner-logo-enhanced shadow-lg group-hover:shadow-2xl transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-gold-400 transition-colors duration-300 font-serif">{developer.name}</h3>
                  <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">{developer.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {developer.specialties && developer.specialties.slice(0, 2).map((specialty, idx) => (
                      <span key={`second-${developer.id}-specialty-${idx}`} className="px-3 py-1 bg-gold-500/20 text-gold-300 text-xs rounded-full border border-gold-500/30 group-hover:bg-gold-500/30 transition-colors duration-300">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-gold-400 text-sm font-semibold group-hover:text-gold-300 transition-colors duration-300">{developer.projects} Projects</p>
                </div>
              ))}
            </div>
          </div>
          )}
          
          {/* Enhanced Grid for Mobile */}
          {!partnersLoading && !partnersError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-6 mt-12">
            {partnerDevelopers.slice(0, 4).map((developer, index) => (
              <div 
                key={developer.id}
                onClick={() => handleDeveloperClick(developer.id, developer.name)}
                className="partner-logo-card sparkle-container p-6 text-center cursor-pointer group partner-card-entrance"
                style={{animationDelay: `${index * 0.3}s`}}
              >
                <div className="relative mb-4">
                  <img 
                    src={developer.logo} 
                    alt={developer.name}
                    className="w-full h-16 object-cover rounded-lg partner-logo-enhanced shadow-md group-hover:shadow-xl transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-white font-bold text-sm mb-2 group-hover:text-gold-400 transition-colors font-serif">{developer.name}</h3>
                <p className="text-gray-300 text-xs mb-3 group-hover:text-gray-200 transition-colors leading-relaxed">{developer.description}</p>
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {developer.specialties && developer.specialties.slice(0, 1).map((specialty, idx) => (
                    <span key={`mobile-${developer.id}-specialty-${idx}`} className="px-2 py-1 bg-gold-500/20 text-gold-300 text-xs rounded-full border border-gold-500/30 group-hover:bg-gold-500/30 transition-colors duration-300">
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-gold-400 text-xs font-semibold group-hover:text-gold-300 transition-colors">{developer.projects} Projects</p>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Exclusive Properties Section */}
      <section className="py-20 bg-black/95 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Premium Collection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">Exclusive Properties with AMZ Properties</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Discover our handpicked selection of Dubai's most prestigious properties</p>
          </div>
          
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exclusiveProperties.map((property, index) => (
              <div key={property.id} className="group bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in border border-gold-500/20" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.type === 'exclusive' ? 'Exclusive' : property.badge || 'Exclusive'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">{property.title}</h3>
                  <div className="text-gold-400 font-bold text-xl mb-2">{property.price}</div>
                  <div className="flex items-center text-gray-300 mb-4">
                    <span className="mr-4">{property.bedrooms} bed, {property.bathrooms} bath</span>
                    <span>{property.area}</span>
                  </div>
<<<<<<< HEAD
                  <div className="text-sm text-gray-400">{property.location}</div>
=======
                  <div className="text-sm text-gray-400 mb-4">{property.location}</div>
                  <Link 
                    to="/properties" 
                    className="inline-block w-full bg-gradient-to-r from-luxury-600 to-gold-500 text-white px-6 py-3 rounded-xl font-medium text-center hover:from-luxury-700 hover:to-gold-600 transition-all duration-300 transform hover:scale-105"
                  >
                    View Details
                  </Link>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Off-Plan Properties Section */}
      <section className="py-20 bg-black/95 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Future Investments</span>
            <h2 className="text-5xl font-bold text-gold-400 mb-6 font-serif animate-slide-up">Off-Plan Properties</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>Secure your future with Dubai's most promising upcoming developments</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offPlanProperties.map((property, index) => (
              <div key={property.id} className="group bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in border border-gold-500/20" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.type === 'off-plan' ? 'Off-Plan' : property.badge || 'Off-Plan'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">{property.title}</h3>
                  <div className="text-gold-400 font-bold text-xl mb-2">{property.price}</div>
                  <div className="flex items-center text-gray-300 mb-4">
                    <span className="mr-4">{property.bedrooms} bed, {property.bathrooms} bath</span>
                    <span>{property.area}</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">{property.location}</div>
<<<<<<< HEAD
                  {property.developer && <div className="text-sm text-gray-400">Developer: {property.developer}</div>}
=======
                  {property.developer && <div className="text-sm text-gray-400 mb-4">Developer: {property.developer}</div>}
                  <Link 
                    to="/properties" 
                    className="inline-block w-full bg-gradient-to-r from-luxury-600 to-gold-500 text-white px-6 py-3 rounded-xl font-medium text-center hover:from-luxury-700 hover:to-gold-600 transition-all duration-300 transform hover:scale-105"
                  >
                    View Details
                  </Link>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black/90 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Premium Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">Exceptional Service Excellence</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Tailored luxury real estate services designed for discerning clients who demand nothing but the finest
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className="luxury-card text-center p-8 group hover:scale-105 transition-all duration-500">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-serif group-hover:text-gold-400 transition-colors">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Client Reviews Section */}
      <section className="py-20 bg-black/90 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">CLIENT REVIEWS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">What Our Clients Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Hear from our satisfied clients about their exceptional experience with AMZ Properties
            </p>
          </div>
          
          {testimonials.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <div className="luxury-card p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-luxury-600/10"></div>
                <div className="relative z-10">
                  <div className="mb-8">
                    <img 
                      src={testimonials[activeTestimonial]?.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'} 
                      alt={testimonials[activeTestimonial]?.name}
                      className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-gold-500/30"
                    />
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-gold-400 mx-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-white font-light italic mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial]?.review || testimonials[activeTestimonial]?.text}"
                  </blockquote>
                  
                  <div className="text-gold-400 font-semibold text-lg mb-2">
                    {testimonials[activeTestimonial]?.name}
                  </div>
                  <div className="text-gray-300">
                    {testimonials[activeTestimonial]?.designation || testimonials[activeTestimonial]?.role}
                  </div>
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center mt-8 space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-gold-400 scale-125' 
                        : 'bg-gray-600 hover:bg-gold-400/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-black/95 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Our Achievements</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">Excellence in Numbers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Our track record speaks for itself - delivering exceptional results for our clients</p>
          </div>
          
=======
      {/* Achievements Section */}
      <section className="py-20 bg-black/95 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Our Achievements</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">Excellence in Numbers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Our track record speaks for itself - delivering exceptional results for our clients</p>
          </div>
          
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement.label} className="luxury-card text-center p-8 group hover:scale-105 transition-all duration-500">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div className="text-4xl font-bold text-gold-400 mb-2">
                  {achievement.number}{achievement.suffix}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">{achievement.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Blog Section */}
      <section className="py-20 bg-black/95 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Latest Insights</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">From Our Blog</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Stay updated with the latest trends and insights in Dubai's luxury real estate market</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="block">
                <article className="luxury-card overflow-hidden group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gold-400 text-sm mb-3">
                      <span>{post.category}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-gold-400 transition-colors">{post.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-gold-400 text-sm font-medium group-hover:text-gold-300 transition-colors">
                      Read More <span className="ml-2 text-xs">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
=======
      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/50 to-black border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Client Reviews</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">What Our Clients Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Hear from our satisfied clients about their exceptional experience with AMZ Properties</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{transform: `translateX(-${activeTestimonial * 100}%)`}}>
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="luxury-card text-center p-8 md:p-12">
                      <div className="mb-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gold-400/30"
                        />
                        <div className="flex justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-gold-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <blockquote className="text-lg md:text-xl text-gray-300 mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-1">{testimonial.name}</h4>
                        <p className="text-gold-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation dots */}
             <div className="flex justify-center mt-8 space-x-2">
               {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-gold-400' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Contact Section */}
      {contactContent && (
        <section className="py-20 bg-gradient-to-b from-black to-dark-900 border-t border-gold-500/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">{contactContent.subtitle || 'Get In Touch'}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">{contactContent.title || 'Contact Us Today'}</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">{contactContent.description || 'Ready to find your dream property? Let\'s start the conversation and make your real estate goals a reality.'}</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="luxury-card p-8 md:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Send us a Message</h3>
                  <p className="text-gray-300">Fill out the form below and we'll get back to you within 24 hours</p>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gold-400 font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-dark-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-gold-400 font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-dark-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gold-400 font-medium mb-2">Phone Number *</label>
                    <div className="flex">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="bg-dark-700/50 border border-gray-600 text-white rounded-l-xl px-3 py-3 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
                      >
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+92">🇵🇰 +92</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="flex-1 bg-dark-700/50 border border-l-0 border-gray-600 text-white rounded-r-xl px-4 py-3 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gold-400 font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-dark-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your property requirements or any questions you have..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold py-4 px-8 rounded-xl hover:from-gold-400 hover:to-gold-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gold-500/25"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="luxury-card p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gold-400 font-semibold mb-2">Visit Our Office</h4>
                        <p className="text-gray-300">Business Bay, Dubai, UAE</p>
                        <p className="text-gray-300">Office 1205, XYZ Tower</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-luxury-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gold-400 font-semibold mb-2">Call Us</h4>
                        <p className="text-gray-300">+971 50 123 4567</p>
                        <p className="text-gray-300">+971 4 567 8901</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-luxury-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gold-400 font-semibold mb-2">Email Us</h4>
                        <p className="text-gray-300">info@amzproperties.ae</p>
                        <p className="text-gray-300">sales@amzproperties.ae</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-luxury-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gold-400 font-semibold mb-2">Working Hours</h4>
                        <p className="text-gray-300">Mon - Fri: 9:00 AM - 7:00 PM</p>
                        <p className="text-gray-300">Sat - Sun: 10:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="luxury-card p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    <a href="tel:+971501234567" className="flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </a>
                    <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
=======
      {/* Blog Section */}
      <section className="py-20 bg-black/95 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Latest Insights</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gold-400 mb-6 font-serif">From Our Blog</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Stay updated with the latest trends and insights in Dubai's luxury real estate market</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug || post.id}`} className="block">
                <article className="luxury-card overflow-hidden group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gold-400 text-sm mb-3">
                      <span>{post.category}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-gold-400 transition-colors">{post.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-gold-400 text-sm font-medium group-hover:text-gold-300 transition-colors">
                      Read More <span className="ml-2 text-xs">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section - Above Footer */}
      <section className="py-20 bg-gradient-to-br from-luxury-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-900/90 to-black/90"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">Contact Us Today</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to find your dream property? <span className="text-gold-400 font-semibold">Let's start the conversation</span> and make your real estate goals a reality.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark-800/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gold-500/20 p-8 md:p-12">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-gold-400 font-medium mb-3 text-lg">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleContactChange}
                      required
                      className="w-full px-6 py-4 bg-dark-700/50 border-2 border-gold-500/30 rounded-xl text-white placeholder-gray-400 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label className="block text-gold-400 font-medium mb-3 text-lg">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleContactChange}
                      required
                      className="w-full px-6 py-4 bg-dark-700/50 border-2 border-gold-500/30 rounded-xl text-white placeholder-gray-400 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                {/* Phone Field with Country Code */}
                <div>
                  <label className="block text-gold-400 font-medium mb-3 text-lg">Phone Number *</label>
                  <div className="relative flex">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleContactChange}
                      className="bg-dark-700/50 border-2 border-gold-500/30 border-r-0 rounded-l-xl px-4 py-4 text-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+92">🇵🇰 +92</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+974">🇶🇦 +974</option>
                      <option value="+965">🇰🇼 +965</option>
                      <option value="+973">🇧🇭 +973</option>
                      <option value="+968">🇴🇲 +968</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleContactChange}
                      required
                      className="flex-1 px-6 py-4 bg-dark-700/50 border-2 border-gold-500/30 border-l-0 rounded-r-xl text-white placeholder-gray-400 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 transition-all duration-300"
                      placeholder="50 123 4567"
                    />
                  </div>
                </div>
                
                {/* Message Field */}
                <div>
                  <label className="block text-gold-400 font-medium mb-3 text-lg">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleContactChange}
                    required
                    rows={5}
                    className="w-full px-6 py-4 bg-dark-700/50 border-2 border-gold-500/30 rounded-xl text-white placeholder-gray-400 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your property requirements or any questions you have..."
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-luxury-900 rounded-2xl font-bold text-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/30"
                  >
                    Send Message
                    <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border border-gold-400/20 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 border border-gold-400/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-20 w-2 h-2 bg-gold-400/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-32 w-3 h-3 bg-gold-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </section>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9

    </div>
  )
}

export default Home