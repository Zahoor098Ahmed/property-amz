import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+971',
    subject: '',
    message: '',
    propertyType: 'apartment'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      const submitData = {
        ...formData,
        phone: formData.countryCode + ' ' + formData.phone
      }
      delete submitData.countryCode
      
      const response = await apiService.submitContactForm(submitData)
      setSubmitMessage('Thank you for your message! We will get back to you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+971',
        subject: '',
        message: '',
        propertyType: 'apartment'
      })
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Visit Our Office',
      details: ['Business Bay, Dubai, UAE', 'Office 1205, XYZ Tower'],
      gradient: 'from-luxury-500 to-gold-500'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.3"/>
        </svg>
      ),
      title: 'Call Us',
      details: ['+971 50 123 4567', '+971 4 567 8901'],
      gradient: 'from-blue-500 to-luxury-500'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12l2 2 4-4" stroke="currentColor" opacity="0.6"/>
        </svg>
      ),
      title: 'Email Us',
      details: ['info@amzproperties.ae', 'sales@amzproperties.ae'],
      gradient: 'from-green-500 to-luxury-500'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 AM - 7:00 PM', 'Sat - Sun: 10:00 AM - 6:00 PM'],
      gradient: 'from-purple-500 to-luxury-500'
    }
  ]

  const faqs = [
    {
      question: 'What areas of Dubai do you cover?',
      answer: 'We cover all major areas of Dubai including Downtown, Marina, JBR, Palm Jumeirah, Business Bay, DIFC, Arabian Ranches, Emirates Hills, and many more premium locations with exclusive properties.'
    },
    {
      question: 'Do you assist with property financing?',
      answer: 'Yes, we work with leading banks and financial institutions to help you secure the best mortgage rates and financing options. Our financial advisors will guide you through the entire process.'
    },
    {
      question: 'What is your commission structure?',
      answer: 'Our commission is competitive and transparent with no hidden charges. We provide detailed fee structures upfront and offer flexible payment options for our premium services.'
    },
    {
      question: 'How long does the property buying process take?',
      answer: 'The timeline varies depending on the property type and financing. Typically, it takes 2-4 weeks from offer acceptance to completion for ready properties, while off-plan properties may take longer.'
    },
    {
      question: 'Do you provide property management services?',
      answer: 'Yes, we offer comprehensive property management services including tenant sourcing, maintenance, rent collection, and investment portfolio management for property owners.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-dark-900">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-dark-900 via-luxury-800 to-dark-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-600/70 to-gold-600/70"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gold-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-luxury-400/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gold-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-10 right-1/4 w-24 h-24 bg-luxury-300/15 rounded-full blur-2xl animate-bounce-slow"></div>
          <div className="absolute bottom-10 left-1/4 w-36 h-36 bg-gold-200/10 rounded-full blur-3xl animate-float"></div>
        </div>
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-400 rotate-45 animate-twinkle"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-luxury-400 rotate-45 animate-twinkle" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-gold-300 rotate-45 animate-twinkle" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-luxury-300 rotate-45 animate-twinkle" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4 block animate-fade-in">
              Luxury Real Estate Experts
            </span>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-serif bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent animate-slide-up">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in" style={{animationDelay: '0.3s'}}>
              Ready to find your dream property? Our luxury real estate experts are here to guide you through every step of your journey in Dubai's premium market.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <a href="#contact-form" className="group btn-primary btn-lg scroll-smooth relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Start Your Journey
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
  
              </a>
              <a href="tel:+971501234567" className="group btn-ghost btn-lg relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Call Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-20 bg-gradient-to-b from-dark-900 to-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-32 h-32 border border-luxury-300 rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-gold-300 rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-luxury-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 bg-gold-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm animate-fade-in">Quick Actions</span>
            <h2 className="text-5xl font-bold text-white mt-2 mb-6 font-serif animate-slide-up">Get Instant Assistance</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
              Connect with our luxury real estate experts instantly through your preferred communication channel
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/971501234567?text=Hello%20AMZ%20Properties,%20I'm%20interested%20in%20your%20luxury%20properties.%20Please%20provide%20more%20information."
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 text-white p-8 rounded-3xl font-semibold transform transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/30 animate-slide-in-left group border border-green-400/20"
              style={{animationDelay: '0.3s'}}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 transform transition-transform duration-300 group-hover:translate-y-1">WhatsApp Chat</h3>
                <p className="text-green-100 text-lg transform transition-transform duration-300 group-hover:translate-y-1">Instant messaging with our experts</p>
                <p className="text-green-200 text-sm mt-2 opacity-80">Available 24/7</p>
              </div>
            </a>
            
            {/* Call Button */}
            <a 
              href="tel:+971501234567"
              className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white p-8 rounded-3xl font-semibold transform transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/30 animate-slide-in-up group border border-blue-400/20"
              style={{animationDelay: '0.4s'}}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 transform transition-transform duration-300 group-hover:translate-y-1">Direct Call</h3>
                <p className="text-blue-100 text-lg transform transition-transform duration-300 group-hover:translate-y-1">+971 50 123 4567</p>
                <p className="text-blue-200 text-sm mt-2 opacity-80">Speak with our consultants</p>
              </div>
            </a>
            
            {/* Email Button */}
            <a 
              href="mailto:info@amzproperties.ae?subject=Inquiry%20about%20Luxury%20Properties&body=Hello%20AMZ%20Properties,%0A%0AI'm%20interested%20in%20learning%20more%20about%20your%20luxury%20properties%20in%20Dubai.%20Please%20contact%20me%20with%20more%20information.%0A%0AThank%20you."
              className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white p-8 rounded-3xl font-semibold transform transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 animate-slide-in-right group border border-purple-400/20"
              style={{animationDelay: '0.5s'}}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 transform transition-transform duration-300 group-hover:translate-y-1">Send Email</h3>
                <p className="text-purple-100 text-lg transform transition-transform duration-300 group-hover:translate-y-1">info@amzproperties.ae</p>
                <p className="text-purple-200 text-sm mt-2 opacity-80">Quick response guaranteed</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Info */}
      <section id="contact-form" className="py-20 relative overflow-hidden bg-gradient-to-br from-black to-dark-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 border border-luxury-300 rotate-45"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border border-gold-300 rotate-12"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-luxury-200 rotate-45"></div>
          <div className="absolute bottom-40 right-1/3 w-18 h-18 border border-gold-200 rotate-12"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <div className={`bg-dark-800/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-gold-500/20 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="mb-8">
                <span className="text-gold-400 font-medium tracking-wider uppercase text-sm animate-fade-in">Send Message</span>
                <h2 className="text-4xl font-bold text-white mt-2 font-serif animate-slide-up">Let's Start a Conversation</h2>
                <p className="text-gray-300 mt-4 text-lg animate-fade-in" style={{animationDelay: '0.2s'}}>Share your requirements and we'll get back to you within 24 hours</p>
              </div>
              
              {submitMessage && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl mb-8 animate-slide-up">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {submitMessage}
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
<<<<<<< HEAD
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-gold-400 transition-colors duration-300">
=======
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
<<<<<<< HEAD
                        className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 w-full group-hover:border-gold-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
                        placeholder="Your full name"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-gold-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
=======
                        className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 w-full focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
                        placeholder="Your full name"
                      />
        
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    </div>
                  </div>
                  
                  <div className="group">
<<<<<<< HEAD
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-gold-400 transition-colors duration-300">
=======
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
<<<<<<< HEAD
                        className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 w-full group-hover:border-gold-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-gold-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
=======
                        className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 w-full focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
        
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
<<<<<<< HEAD
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-gold-400 transition-colors duration-300">
=======
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-3">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                      Phone Number
                    </label>
                    <div className="relative flex">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="bg-dark-700/50 border border-gray-600 text-white rounded-l-xl px-3 py-3 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300 border-r-0"
                      >
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+92">🇵🇰 +92</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+974">🇶🇦 +974</option>
                        <option value="+965">🇰🇼 +965</option>
                        <option value="+968">🇴🇲 +968</option>
                        <option value="+973">🇧🇭 +973</option>
                        <option value="+961">🇱🇧 +961</option>
                        <option value="+962">🇯🇴 +962</option>
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+39">🇮🇹 +39</option>
                        <option value="+34">🇪🇸 +34</option>
                        <option value="+7">🇷🇺 +7</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+81">🇯🇵 +81</option>
                        <option value="+82">🇰🇷 +82</option>
                        <option value="+60">🇲🇾 +60</option>
                        <option value="+65">🇸🇬 +65</option>
                        <option value="+66">🇹🇭 +66</option>
                        <option value="+84">🇻🇳 +84</option>
                        <option value="+62">🇮🇩 +62</option>
                        <option value="+63">🇵🇭 +63</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+64">🇳🇿 +64</option>
                        <option value="+27">🇿🇦 +27</option>
                        <option value="+55">🇧🇷 +55</option>
                        <option value="+52">🇲🇽 +52</option>
                        <option value="+54">🇦🇷 +54</option>
                      </select>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
<<<<<<< HEAD
                        className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 w-full group-hover:border-gold-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
                        placeholder="+971 50 123 4567"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-gold-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
=======
                        className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-r-xl px-4 py-3 flex-1 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300 border-l-0"
                        placeholder="50 123 4567"
                      />
      
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    </div>
                  </div>
                  
                  <div className="group">
<<<<<<< HEAD
                    <label htmlFor="propertyType" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-gold-400 transition-colors duration-300">
=======
                    <label htmlFor="propertyType" className="block text-sm font-semibold text-gray-300 mb-3">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                      Property Interest
                    </label>
                    <div className="relative">
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
<<<<<<< HEAD
                        className="bg-dark-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 w-full group-hover:border-gold-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
=======
                        className="bg-dark-700/50 border border-gray-600 text-white rounded-xl px-4 py-3 w-full focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                      >
                        <option key="apartment" value="apartment">Luxury Apartment</option>
                        <option key="villa" value="villa">Premium Villa</option>
                        <option key="penthouse" value="penthouse">Exclusive Penthouse</option>
                        <option key="townhouse" value="townhouse">Designer Townhouse</option>
                        <option key="studio" value="studio">Modern Studio</option>
                        <option key="commercial" value="commercial">Commercial Property</option>
                        <option key="investment" value="investment">Investment Opportunity</option>
                      </select>
<<<<<<< HEAD
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-gold-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
=======
      
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    </div>
                  </div>
                </div>
                
                <div className="group">
<<<<<<< HEAD
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-gold-400 transition-colors duration-300">
=======
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-3">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    Subject *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
<<<<<<< HEAD
                      className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 w-full group-hover:border-gold-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
=======
                      className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 w-full focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                      placeholder="How can we help you?"
                    />
      
                  </div>
                </div>
                
                <div className="group">
<<<<<<< HEAD
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-gold-400 transition-colors duration-300">
=======
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
<<<<<<< HEAD
                      className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 w-full resize-none group-hover:border-gold-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
=======
                      className="bg-dark-700/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-3 w-full resize-none focus:border-gold-500 focus:ring-2 focus:ring-gold-200/20 transition-all duration-300"
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                      placeholder="Tell us more about your requirements, budget, preferred location, and timeline..."
                    ></textarea>
      
                  </div>
                </div>
                
                {/* Enhanced Submit Button */}
                <div className="relative group">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-8 rounded-xl font-semibold text-white transition-all duration-500 transform relative overflow-hidden ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
<<<<<<< HEAD
                        : 'bg-gradient-to-r from-luxury-600 to-gold-500 hover:from-luxury-700 hover:to-gold-600 hover:shadow-2xl hover:shadow-yellow-500 hover:-translate-y-2 hover:scale-105'
=======
                        : 'bg-gradient-to-r from-luxury-600 to-gold-500'
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    }`}
                  >
                    
                    {/* Button Content */}
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </span>
                      )}
                    </span>
                    
                    {/* Ripple Effect */}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Enhanced Contact Information */}
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <div className="mb-12">
                <span className="text-gold-400 font-medium tracking-wider uppercase text-sm animate-fade-in">Contact Information</span>
<<<<<<< HEAD
                <h2 className="text-4xl font-bold text-white mt-2 font-serif animate-slide-up">Get In Touch</h2>
=======
                <h2 className="text-4xl font-bold text-white mt-2 font-serif animate-slide-up">Contact Information</h2>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                <p className="text-gray-300 mt-4 text-lg animate-fade-in" style={{animationDelay: '0.2s'}}>Multiple ways to reach our luxury real estate experts</p>
              </div>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
<<<<<<< HEAD
                  <div key={index} className="group hover-lift animate-fade-in" style={{animationDelay: `${0.1 * index}s`}}>
                    <div className="relative flex items-start space-x-6 p-6 bg-dark-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gold-500/20 hover:shadow-2xl hover:shadow-gold-500/20 transition-all duration-500 overflow-hidden">
                      {/* Background Gradient Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
=======
                  <div 
                    key={`contact-info-${index}`} 
                    className="transform transition-all duration-700 hover:scale-105 animate-fade-in-up" 
                    style={{animationDelay: `${0.2 * index}s`}}
                  >
                    <div className="relative flex items-start space-x-6 p-6 bg-dark-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gold-500/20 overflow-hidden hover:border-gold-400/40 hover:shadow-2xl transition-all duration-500 group">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                      {/* Icon with Enhanced Animation */}
                      <div className={`relative w-16 h-16 bg-gradient-to-r ${info.gradient} rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 animate-bounce-in`} style={{animationDelay: `${0.3 * index}s`}}>
                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-luxury-400/20 rounded-2xl animate-pulse"></div>
                        <span className="relative z-10 transform transition-transform duration-300 group-hover:scale-110">{info.icon}</span>
                      </div>
                      
                      {/* Content with Enhanced Styling */}
                      <div className="relative z-10 flex-1">
<<<<<<< HEAD
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{detail}</p>
                        ))}
                      </div>
                      
                      {/* Hover Border Effect */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400/30 rounded-2xl transition-colors duration-300"></div>
=======
                        <h3 className="text-xl font-bold text-white mb-3 transform transition-all duration-300 group-hover:text-gold-300 animate-slide-in-right" style={{animationDelay: `${0.4 * index}s`}}>{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p 
                            key={idx} 
                            className="text-gray-300 text-lg leading-relaxed transform transition-all duration-300 group-hover:text-gray-200 animate-fade-in-left" 
                            style={{animationDelay: `${0.5 * index + 0.1 * idx}s`}}
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-luxury-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    </div>
                  </div>
                ))}
              </div>
              


            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Enhanced FAQ Section */}
=======
      {/* Google Maps Section */}
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
      <section className="py-20 bg-gradient-to-b from-black to-dark-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-32 h-32 border border-luxury-300 rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-gold-300 rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-luxury-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 bg-gold-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
<<<<<<< HEAD
=======
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm animate-fade-in">Location</span>
            <h2 className="text-5xl font-bold text-white mt-2 mb-6 font-serif animate-slide-up">Visit Our Office</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
              Located in the heart of Dubai's business district, our office is easily accessible and designed to provide you with the ultimate luxury property consultation experience.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Office Details */}
            <div className="space-y-8">
              <div className="bg-dark-800/90 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 font-serif flex items-center">
                  <svg className="w-8 h-8 text-gold-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Office Location
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-semibold">AMZ Properties</p>
                      <p className="text-gray-300">Business Bay, Dubai</p>
                      <p className="text-gray-300">United Arab Emirates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-semibold">Office Hours</p>
                      <p className="text-gray-300">Monday - Friday: 9:00 AM - 7:00 PM</p>
                      <p className="text-gray-300">Saturday: 10:00 AM - 5:00 PM</p>
                      <p className="text-gray-300">Sunday: By Appointment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-semibold">Parking</p>
                      <p className="text-gray-300">Complimentary valet parking available</p>
                      <p className="text-gray-300">Underground parking for clients</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Directions */}
              <div className="bg-gradient-to-br from-gold-500/10 to-gold-400/10 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-white mb-4 font-serif">Getting Here</h4>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-300">• 5 minutes from Dubai Mall</p>
                  <p className="text-gray-300">• 10 minutes from Burj Khalifa</p>
                  <p className="text-gray-300">• 15 minutes from Dubai International Airport</p>
                  <p className="text-gray-300">• Metro: Business Bay Station (5 min walk)</p>
                </div>
              </div>
            </div>
            
            {/* Google Maps Embed */}
            <div className="relative">
              <div className="bg-dark-800/90 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-4 overflow-hidden">
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1234567890123!2d55.2708!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sBusiness%20Bay%2C%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                    title="AMZ Properties Office Location"
                  ></iframe>
                  
                  {/* Map Overlay */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <p className="text-sm font-semibold">📍 AMZ Properties</p>
                    <p className="text-xs text-gray-300">Business Bay, Dubai</p>
                  </div>
                </div>
                
                {/* Map Actions */}
                <div className="mt-4 flex space-x-3">
                  <a 
                    href="https://maps.google.com/?q=Business+Bay,+Dubai,+UAE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-center"
                  >
                    Open in Google Maps
                  </a>
                  <a 
                    href="https://maps.google.com/maps/dir//Business+Bay,+Dubai,+UAE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-lg font-semibold text-center"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-black to-dark-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-32 h-32 border border-luxury-300 rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-gold-300 rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-luxury-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 bg-gold-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
            <span className="text-gold-400 font-medium tracking-wider uppercase text-sm animate-fade-in">Support</span>
            <h2 className="text-5xl font-bold text-white mt-2 mb-6 font-serif animate-slide-up">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
              Quick answers to common questions about our luxury real estate services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div 
<<<<<<< HEAD
                key={index} 
                className={`group bg-dark-800/90 backdrop-blur-sm rounded-2xl border border-gold-500/20 p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/20 animate-fade-in ${
                  activeTab === index ? 'ring-2 ring-gold-400/50 bg-gradient-to-r from-gold-500/10 to-gold-400/10' : 'hover:bg-gradient-to-r hover:from-gold-500/5 hover:to-gold-400/5'
                }`}
=======
                key={`faq-${index}`} 
                className={`bg-dark-800/90 backdrop-blur-sm rounded-2xl border border-gold-500/20 p-8 cursor-pointer animate-fade-in ${
                activeTab === index ? 'ring-2 ring-gold-400/50 bg-gradient-to-r from-gold-500/10 to-gold-400/10' : ''
              }`}
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setActiveTab(activeTab === index ? -1 : index)}
              >
                <div className="flex items-center justify-between">
<<<<<<< HEAD
                  <h3 className="text-xl font-bold text-white font-serif group-hover:text-gold-400 transition-colors duration-300 flex-1 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 flex items-center justify-center text-white transition-transform duration-300 ${
                    activeTab === index ? 'rotate-180' : 'group-hover:scale-110'
=======
                  <h3 className="text-xl font-bold text-white font-serif flex-1 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 flex items-center justify-center text-white ${
                    activeTab === index ? 'rotate-180' : ''
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeTab === index ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-gold-500/20 pt-6">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                
<<<<<<< HEAD
                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400/30 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
=======

>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-dark-900 via-luxury-900 to-dark-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-600/20 to-gold-600/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold mb-6 font-serif bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Don't wait any longer. Contact our expert team today and let us help you find your perfect luxury property in Dubai.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:+971501234567" className="btn-primary btn-lg">
              Call Now: +971 50 123 4567
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <a href="mailto:info@amzproperties.ae" className="btn-ghost btn-lg">
              Email Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact