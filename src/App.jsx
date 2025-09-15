import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import { Toaster } from 'react-hot-toast'
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import Wishlist from './pages/Wishlist'
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
import BlogDetail from './pages/BlogDetail'
import PartnerDetail from './pages/PartnerDetail'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import { WishlistProvider } from './contexts/WishlistContext'
import { initBrowserCompatibility } from './utils/browserCompatibility'
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
>>>>>>> c4429e5a7c8975b31158b27f1f7043f28137eb34
import './App.css'

// Admin route guard component
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken')
  return token ? children : <Navigate to="/admin/login" />
}

function App() {
  // Initialize browser compatibility on component mount
  useEffect(() => {
    initBrowserCompatibility();
  }, []);

  return (
<<<<<<< HEAD
    <Router>
      <div className="App">
        <Routes>
          {/* Admin routes without header and footer */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          
          {/* Public routes with header and footer */}
          <Route path="*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/partner/:id" element={<PartnerDetail />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
=======
    <WishlistProvider>
      <Router>
        <div className="App">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #d4af37',
              },
              success: {
                iconTheme: {
                  primary: '#d4af37',
                  secondary: '#1a1a1a',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#1a1a1a',
                },
              },
            }}
          />
          <Routes>
            {/* Admin routes without header and footer */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            
            {/* Public routes with header and footer */}
            <Route path="*" element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                     <Route path="/properties" element={<Properties />} />
                     <Route path="/projects" element={<Projects />} />
                     <Route path="/about" element={<About />} />
                     <Route path="/contact" element={<Contact />} />
                     <Route path="/wishlist" element={<Wishlist />} />
                     <Route path="/blog/:id" element={<BlogDetail />} />
                     <Route path="/partner/:id" element={<PartnerDetail />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </WishlistProvider>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
  )
}

export default App