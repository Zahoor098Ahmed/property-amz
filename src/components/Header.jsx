import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import amzLogo from '../assets/amz.logo.jpeg'
import GlobalSearch from './GlobalSearch'
import { useWishlist } from '../contexts/WishlistContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { wishlistCount } = useWishlist()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-luxury border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src={amzLogo} 
                alt="AMZ Properties Logo" 
                className="w-16 h-16 rounded-xl transition-all duration-300 transform group-hover:scale-105 filter drop-shadow-lg group-hover:drop-shadow-xl border border-gold-300/20 group-hover:border-gold-400/40"
                style={{imageRendering: 'crisp-edges'}}
              />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold font-serif transition-colors duration-300 ${
                isScrolled ? 'text-dark-800' : 'text-white'
              }`}>AMZ Properties</span>
              <span className={`text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${
                isScrolled ? 'text-luxury-600' : 'text-gold-300'
              }`}>Luxury Real Estate</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`relative font-medium transition-all duration-300 group ${
                isActive('/') 
                  ? (isScrolled ? 'text-luxury-600' : 'text-gold-300')
                  : (isScrolled ? 'text-dark-600 hover:text-luxury-600' : 'text-white/90 hover:text-gold-300')
              }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-600 to-gold-500 transition-all duration-300 group-hover:w-full ${
                isActive('/') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/properties" 
              className={`relative font-medium transition-all duration-300 group ${
                isActive('/properties') 
                  ? (isScrolled ? 'text-luxury-600' : 'text-gold-300')
                  : (isScrolled ? 'text-dark-600 hover:text-luxury-600' : 'text-white/90 hover:text-gold-300')
              }`}
            >
              Properties
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-600 to-gold-500 transition-all duration-300 group-hover:w-full ${
                isActive('/properties') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/projects" 
              className={`relative font-medium transition-all duration-300 group ${
                isActive('/projects') 
                  ? (isScrolled ? 'text-luxury-600' : 'text-gold-300')
                  : (isScrolled ? 'text-dark-600 hover:text-luxury-600' : 'text-white/90 hover:text-gold-300')
              }`}
            >
              Projects
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-600 to-gold-500 transition-all duration-300 group-hover:w-full ${
                isActive('/projects') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/about" 
              className={`relative font-medium transition-all duration-300 group ${
                isActive('/about') 
                  ? (isScrolled ? 'text-luxury-600' : 'text-gold-300')
                  : (isScrolled ? 'text-dark-600 hover:text-luxury-600' : 'text-white/90 hover:text-gold-300')
              }`}
            >
              About
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-600 to-gold-500 transition-all duration-300 group-hover:w-full ${
                isActive('/about') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/contact" 
              className={`relative font-medium transition-all duration-300 group ${
                isActive('/contact') 
                  ? (isScrolled ? 'text-luxury-600' : 'text-gold-300')
                  : (isScrolled ? 'text-dark-600 hover:text-luxury-600' : 'text-white/90 hover:text-gold-300')
              }`}
            >
              Contact
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-600 to-gold-500 transition-all duration-300 group-hover:w-full ${
                isActive('/contact') ? 'w-full' : ''
              }`}></span>
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm ${
                isScrolled ? 'text-dark-600 hover:text-luxury-600' : 'text-white/90 hover:text-gold-300'
              }`}
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className={`relative p-2 rounded-xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm ${
                isScrolled ? 'text-dark-600 hover:text-luxury-600' : 'text-white/90 hover:text-gold-300'
              }`}
              aria-label="Wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>
            <Link 
              to="tel:+971501234567" 
              className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                isScrolled ? 'text-dark-600 hover:text-luxury-600' : 'text-white/90 hover:text-gold-300'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="hidden xl:block">+971 50 123 4567</span>
            </Link>
            <Link 
              to="/contact" 
              className={isScrolled ? 'btn-primary' : 'btn-ghost'}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className={`w-6 h-6 transition-colors duration-300 ${
              isScrolled ? 'text-dark-600' : 'text-white'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="hidden py-6 border-t border-white/10 bg-white/95 backdrop-blur-md rounded-b-2xl mt-4 shadow-luxury">
            <nav className="flex flex-col space-y-6">
              <Link 
                to="/" 
                className={`font-medium transition-all duration-300 px-4 py-2 rounded-xl ${
                  isActive('/') 
                    ? 'text-luxury-600 bg-luxury-50' 
                    : 'text-dark-600 hover:text-luxury-600 hover:bg-luxury-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/properties" 
                className={`font-medium transition-all duration-300 px-4 py-2 rounded-xl ${
                  isActive('/properties') 
                    ? 'text-luxury-600 bg-luxury-50' 
                    : 'text-dark-600 hover:text-luxury-600 hover:bg-luxury-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                to="/projects" 
                className={`font-medium transition-all duration-300 px-4 py-2 rounded-xl ${
                  isActive('/projects') 
                    ? 'text-luxury-600 bg-luxury-50' 
                    : 'text-dark-600 hover:text-luxury-600 hover:bg-luxury-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-all duration-300 px-4 py-2 rounded-xl ${
                  isActive('/about') 
                    ? 'text-luxury-600 bg-luxury-50' 
                    : 'text-dark-600 hover:text-luxury-600 hover:bg-luxury-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium transition-all duration-300 px-4 py-2 rounded-xl ${
                  isActive('/contact') 
                    ? 'text-luxury-600 bg-luxury-50' 
                    : 'text-dark-600 hover:text-luxury-600 hover:bg-luxury-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link 
                  to="tel:+971501234567" 
                  className="flex items-center space-x-2 text-dark-600 hover:text-luxury-600 font-medium mb-4 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+971 50 123 4567</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="btn-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Global Search Modal */}
      {isSearchOpen && (
        <GlobalSearch 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      )}
    </header>
  )
}

export default Header