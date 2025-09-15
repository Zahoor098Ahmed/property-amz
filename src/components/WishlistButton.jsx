import React from 'react'
import { useWishlist } from '../contexts/WishlistContext'

const WishlistButton = ({ item, type = 'property', className = '', size = 'md' }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist, isLoading } = useWishlist()
  
  const isWishlisted = isInWishlist(item.id, type)
  
  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isWishlisted) {
      removeFromWishlist(item.id, type)
    } else {
      const wishlistItem = {
        ...item,
        type
      }
      addToWishlist(wishlistItem)
    }
  }
  
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5'
  }
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  return (
    <button
      onClick={handleWishlistToggle}
      disabled={isLoading}
      className={`
        ${sizeClasses[size]}
        ${className}
        ${isWishlisted 
          ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' 
          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
        }
        border backdrop-blur-sm rounded-full transition-all duration-300
        flex items-center justify-center group
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
      `}
      title={isWishlisted ? `Remove from wishlist` : `Add to wishlist`}
      aria-label={isWishlisted ? `Remove from wishlist` : `Add to wishlist`}
    >
      {isLoading ? (
        <svg className={`${iconSizes[size]} animate-spin`} fill="none" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg 
          className={`${iconSizes[size]} transition-transform duration-200 ${isWishlisted ? 'scale-110' : 'group-hover:scale-110'}`} 
          fill={isWishlisted ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth={isWishlisted ? 0 : 2}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
      )}
    </button>
  )
}

export default WishlistButton