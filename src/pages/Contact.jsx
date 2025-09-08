import React, { useState, useEffect } from 'react'
import { apiService } from '../services/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      const response = await apiService.submitContactForm(formData)
      setSubmitMessage('Thank you for your message! We will get back to you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        phone: '',
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
                  <svg className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-luxury-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
              <a href="tel:+971501234567" className="group btn-ghost btn-lg relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center">
                  Call Now
                  <svg className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Info */}
      <section id="contact-form" className="py-20 relative overflow-hidden">
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
            <div className={`luxury-card p-10 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="mb-8">
                <span className="text-luxury-600 font-medium tracking-wider uppercase text-sm animate-fade-in">Send Message</span>
                <h2 className="text-4xl font-bold text-dark-800 mt-2 font-serif animate-slide-up">Let's Start a Conversation</h2>
                <p className="text-dark-600 mt-4 text-lg animate-fade-in" style={{animationDelay: '0.2s'}}>Share your requirements and we'll get back to you within 24 hours</p>
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
                    <label htmlFor="name" className="block text-sm font-semibold text-dark-700 mb-3 group-hover:text-luxury-600 transition-colors duration-300">
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
                        className="luxury-input w-full group-hover:border-luxury-400 focus:border-luxury-500 focus:ring-2 focus:ring-luxury-200 transition-all duration-300"
                        placeholder="Your full name"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-luxury-500/5 to-gold-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-dark-700 mb-3 group-hover:text-luxury-600 transition-colors duration-300">
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
                        className="luxury-input w-full group-hover:border-luxury-400 focus:border-luxury-500 focus:ring-2 focus:ring-luxury-200 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-luxury-500/5 to-gold-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-semibold text-dark-700 mb-3 group-hover:text-luxury-600 transition-colors duration-300">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="luxury-input w-full group-hover:border-luxury-400 focus:border-luxury-500 focus:ring-2 focus:ring-luxury-200 transition-all duration-300"
                        placeholder="+971 50 123 4567"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-luxury-500/5 to-gold-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="propertyType" className="block text-sm font-semibold text-dark-700 mb-3 group-hover:text-luxury-600 transition-colors duration-300">
                      Property Interest
                    </label>
                    <div className="relative">
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="luxury-select w-full group-hover:border-luxury-400 focus:border-luxury-500 focus:ring-2 focus:ring-luxury-200 transition-all duration-300"
                      >
                        <option key="apartment" value="apartment">Luxury Apartment</option>
                        <option key="villa" value="villa">Premium Villa</option>
                        <option key="penthouse" value="penthouse">Exclusive Penthouse</option>
                        <option key="townhouse" value="townhouse">Designer Townhouse</option>
                        <option key="studio" value="studio">Modern Studio</option>
                        <option key="commercial" value="commercial">Commercial Property</option>
                        <option key="investment" value="investment">Investment Opportunity</option>
                      </select>
                      <div className="absolute inset-0 bg-gradient-to-r from-luxury-500/5 to-gold-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-semibold text-dark-700 mb-3 group-hover:text-luxury-600 transition-colors duration-300">
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
                      className="luxury-input w-full group-hover:border-luxury-400 focus:border-luxury-500 focus:ring-2 focus:ring-luxury-200 transition-all duration-300"
                      placeholder="How can we help you?"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-luxury-500/5 to-gold-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-semibold text-dark-700 mb-3 group-hover:text-luxury-600 transition-colors duration-300">
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
                      className="luxury-input w-full resize-none group-hover:border-luxury-400 focus:border-luxury-500 focus:ring-2 focus:ring-luxury-200 transition-all duration-300"
                      placeholder="Tell us more about your requirements, budget, preferred location, and timeline..."
                    ></textarea>
                    <div className="absolute inset-0 bg-gradient-to-r from-luxury-500/5 to-gold-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
                        : 'bg-gradient-to-r from-luxury-600 to-gold-500 hover:from-luxury-700 hover:to-gold-600 hover:shadow-2xl hover:shadow-gold-500/25 hover:-translate-y-2 hover:scale-105'
                    }`}
                  >
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-luxury-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
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
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </span>
                      )}
                    </span>
                    
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-white rounded-xl animate-ping"></div>
                    </div>
                  </button>
                </div>
              </form>
            </div>
            
            {/* Enhanced Contact Information */}
            <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <div className="mb-12">
                <span className="text-luxury-600 font-medium tracking-wider uppercase text-sm animate-fade-in">Contact Information</span>
                <h2 className="text-4xl font-bold text-dark-800 mt-2 font-serif animate-slide-up">Get In Touch</h2>
                <p className="text-dark-600 mt-4 text-lg animate-fade-in" style={{animationDelay: '0.2s'}}>Multiple ways to reach our luxury real estate experts</p>
              </div>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group hover-lift animate-fade-in" style={{animationDelay: `${0.1 * index}s`}}>
                    <div className="relative flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-luxury hover:shadow-2xl hover:shadow-gold-500/20 transition-all duration-500 overflow-hidden">
                      {/* Background Gradient Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-luxury-50/50 to-gold-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Icon with Enhanced Animation */}
                      <div className={`relative w-16 h-16 bg-gradient-to-r ${info.gradient} rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{info.icon}</span>
                      </div>
                      
                      {/* Content with Enhanced Styling */}
                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl font-bold text-dark-800 mb-3 group-hover:text-luxury-600 transition-colors duration-300">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-dark-600 text-lg leading-relaxed group-hover:text-dark-700 transition-colors duration-300">{detail}</p>
                        ))}
                      </div>
                      
                      {/* Hover Border Effect */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-200 rounded-2xl transition-colors duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
              

            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-32 h-32 border border-luxury-300 rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-24 h-24 border border-gold-300 rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-luxury-200 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 right-10 w-20 h-20 bg-gold-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-luxury-600 font-medium tracking-wider uppercase text-sm animate-fade-in">Support</span>
            <h2 className="text-5xl font-bold text-dark-800 mt-2 mb-6 font-serif animate-slide-up">Frequently Asked Questions</h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
              Quick answers to common questions about our luxury real estate services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`group luxury-card p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-luxury-500/10 animate-fade-in ${
                  activeTab === index ? 'ring-2 ring-luxury-300 bg-gradient-to-r from-luxury-50/50 to-gold-50/50' : 'hover:bg-gradient-to-r hover:from-luxury-50/30 hover:to-gold-50/30'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setActiveTab(activeTab === index ? -1 : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-dark-800 font-serif group-hover:text-luxury-600 transition-colors duration-300 flex-1 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-luxury-500 to-gold-500 flex items-center justify-center text-white transition-transform duration-300 ${
                    activeTab === index ? 'rotate-180' : 'group-hover:scale-110'
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeTab === index ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                }`}>
                  <div className="border-t border-luxury-200 pt-6">
                    <p className="text-dark-600 text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                
                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-200/50 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
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