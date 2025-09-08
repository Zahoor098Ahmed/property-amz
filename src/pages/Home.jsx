import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [counters, setCounters] = useState({
    properties: 0,
    clients: 0,
    experience: 0,
    awards: 0
  })
  
  // Background images for hero section
  const heroBackgrounds = [
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
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
      
      return setInterval(() => {
        current += increment
        if (current >= targets[key]) {
          current = targets[key]
          clearInterval(intervals.find(i => i === interval))
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
      }, stepDuration)
    })
    
    return () => intervals.forEach(clearInterval)
  }, [])
  
  // Exclusive Properties Data (matching LCR Dubai)
  const exclusiveProperties = [
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

  // Off-Plan Properties Data
  const offPlanProperties = [
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

  // Services Data
  const services = [
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
    <div className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <section className="relative min-h-screen text-white overflow-hidden">
        {/* Background Images */}
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-600/30 to-gold-600/30"></div>
        
        {/* Background Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
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

      {/* Exclusive Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-luxury-600 font-medium tracking-wider uppercase text-sm mb-4 block">Premium Collection</span>
            <h2 className="text-5xl font-bold text-dark-800 mb-6 font-serif animate-slide-up">Exclusives Properties with AMZ Properties</h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>Discover our handpicked selection of Dubai's most prestigious properties</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exclusiveProperties.map((property, index) => (
              <div key={property.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-luxury-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-luxury-600 font-bold text-xl mb-2">{property.price}</div>
                  <div className="flex items-center text-dark-600 mb-4">
                    <span className="mr-4">{property.bedrooms}{property.bedrooms === 1 ? '' : property.bedrooms === 2 ? '2' : ''}</span>
                    <span>{property.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Off-Plan Properties Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-gold-600 font-medium tracking-wider uppercase text-sm mb-4 block">Future Investments</span>
            <h2 className="text-5xl font-bold text-dark-800 mb-6 font-serif animate-slide-up">Off-Plan Properties</h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>Secure your future with Dubai's most promising upcoming developments</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offPlanProperties.map((property, index) => (
              <div key={property.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-luxury-600 font-bold text-xl mb-2">{property.price}</div>
                  <div className="flex items-center text-dark-600 mb-4">
                    <span className="mr-4">{property.bedrooms}</span>
                    <span>{property.location}</span>
                  </div>
                  <div className="text-sm text-gray-500">Developer: {property.developer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-dark-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-900/20 to-gold-900/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Premium Services</span>
            <h2 className="text-5xl font-bold mb-6 font-serif animate-slide-up">Exceptional Service Excellence</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
              Tailored luxury real estate services designed for discerning clients who demand nothing but the finest
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-gold-500/30 transition-all duration-500 hover:transform hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 font-serif group-hover:text-gold-400 transition-colors">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-luxury-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-600/20 to-gold-600/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block">Our Achievements</span>
            <h2 className="text-5xl font-bold mb-6 font-serif text-white animate-slide-up">Excellence in Numbers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
              Trusted by thousands of clients across Dubai's luxury real estate market
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  {achievement.icon}
                </div>
                <div className="text-4xl font-bold text-gold-400 mb-2 font-serif">
                  {achievement.number}{achievement.suffix}
                </div>
                <h3 className="text-lg font-semibold text-white">{achievement.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-5xl font-bold text-dark-800 mb-6 font-serif animate-slide-up">Get in Touch</h2>
              <p className="text-xl text-dark-600 animate-slide-up" style={{animationDelay: '0.2s'}}>Ready to find your dream property? Contact our expert team today.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
                <h3 className="text-2xl font-bold text-dark-800 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                    <div className="w-12 h-12 bg-luxury-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-dark-800">Phone</div>
                      <div className="text-dark-600">+971 50 123 4567</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center animate-fade-in" style={{animationDelay: '0.5s'}}>
                    <div className="w-12 h-12 bg-luxury-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-dark-800">Email</div>
                      <div className="text-dark-600">info@amzproperties.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center animate-fade-in" style={{animationDelay: '0.6s'}}>
                    <div className="w-12 h-12 bg-luxury-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-dark-800">Address</div>
                      <div className="text-dark-600">Dubai Marina, UAE</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
                <form className="space-y-6">
                  <div className="animate-slide-up" style={{animationDelay: '0.5s'}}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-600 focus:border-transparent transition-all duration-300 hover:border-luxury-400"
                    />
                  </div>
                  <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-600 focus:border-transparent transition-all duration-300 hover:border-luxury-400"
                    />
                  </div>
                  <div className="animate-slide-up" style={{animationDelay: '0.7s'}}>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-600 focus:border-transparent transition-all duration-300 hover:border-luxury-400"
                    />
                  </div>
                  <div className="animate-slide-up" style={{animationDelay: '0.8s'}}>
                    <textarea
                      rows={4}
                      placeholder="Your Message"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-600 focus:border-transparent transition-all duration-300 hover:border-luxury-400"
                    ></textarea>
                  </div>
                  <div className="animate-slide-up" style={{animationDelay: '0.9s'}}>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-luxury-600 to-gold-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-luxury-700 hover:to-gold-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home