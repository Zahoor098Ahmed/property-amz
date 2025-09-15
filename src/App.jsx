import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import About from './pages/About'
import Contact from './pages/Contact'
import BlogDetail from './pages/BlogDetail'
import PartnerDetail from './pages/PartnerDetail'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import './App.css'

// Admin route guard component
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken')
  return token ? children : <Navigate to="/admin/login" />
}

function App() {
  return (
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
  )
}

export default App