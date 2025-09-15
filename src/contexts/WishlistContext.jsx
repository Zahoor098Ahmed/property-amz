import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('amz-wishlist')
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error('Error loading wishlist:', error)
        localStorage.removeItem('amz-wishlist')
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('amz-wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (item) => {
    setIsLoading(true)
    try {
      const isAlreadyInWishlist = wishlistItems.some(wishlistItem => 
        wishlistItem.id === item.id && wishlistItem.type === item.type
      )
      
      if (isAlreadyInWishlist) {
        toast.error('Item is already in your wishlist')
        return false
      }
      
      const wishlistItem = {
        ...item,
        addedAt: new Date().toISOString(),
        type: item.type || 'property' // property or project
      }
      
      setWishlistItems(prev => [...prev, wishlistItem])
      toast.success('Added to wishlist!')
      return true
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      toast.error('Failed to add to wishlist')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromWishlist = (itemId, itemType = 'property') => {
    setIsLoading(true)
    try {
      setWishlistItems(prev => 
        prev.filter(item => !(item.id === itemId && item.type === itemType))
      )
      toast.success('Removed from wishlist')
      return true
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      toast.error('Failed to remove from wishlist')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const isInWishlist = (itemId, itemType = 'property') => {
    return wishlistItems.some(item => item.id === itemId && item.type === itemType)
  }

  const clearWishlist = () => {
    setIsLoading(true)
    try {
      setWishlistItems([])
      toast.success('Wishlist cleared')
      return true
    } catch (error) {
      console.error('Error clearing wishlist:', error)
      toast.error('Failed to clear wishlist')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const getWishlistByType = (type) => {
    return wishlistItems.filter(item => item.type === type)
  }

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistByType,
    isLoading,
    wishlistCount: wishlistItems.length,
    propertiesCount: wishlistItems.filter(item => item.type === 'property').length,
    projectsCount: wishlistItems.filter(item => item.type === 'project').length
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export default WishlistContext