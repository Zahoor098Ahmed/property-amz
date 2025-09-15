import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaBuilding, FaAward, FaUsers, FaCalendarAlt } from 'react-icons/fa'
<<<<<<< HEAD
=======
import api from '../services/api'
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9

const PartnerDetail = () => {
  const { id } = useParams()
  const [partner, setPartner] = useState(null)
  const [relatedPartners, setRelatedPartners] = useState([])
  const [loading, setLoading] = useState(true)
<<<<<<< HEAD
=======
  const [error, setError] = useState(null)
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9

  // Static partner data (same as Home page)
  const staticPartnerDevelopers = [
    {
      id: 1,
      name: 'Emaar Properties',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      description: 'Leading developer of premium lifestyle communities in Dubai',
      detailedDescription: `
        Emaar Properties is Dubai's most valuable and largest real estate development company. Founded in 1997, Emaar has established itself as a global leader in real estate development, hospitality, and retail.
        
        The company is renowned for developing some of the world's most iconic landmarks, including the Burj Khalifa, the world's tallest building, and The Dubai Mall, one of the world's largest shopping and entertainment destinations.
        
        Emaar's commitment to excellence and innovation has made it a trusted name in luxury real estate development across the Middle East, North Africa, Asia, and beyond.
      `,
      specialties: ['Luxury Residential', 'Commercial Developments', 'Hospitality', 'Retail'],
      location: 'Dubai, UAE',
      established: '1997',
      totalProjects: '150+',
      employees: '5000+',
      website: 'www.emaar.com',
      phone: '+971 4 367 3333',
      email: 'info@emaar.ae',
      projects: [
        {
          name: 'Burj Khalifa',
          type: 'Mixed-use',
          status: 'Completed',
          year: '2010'
        },
        {
          name: 'Downtown Dubai',
          type: 'Master Community',
          status: 'Completed',
          year: '2004-2014'
        },
        {
          name: 'Dubai Creek Harbour',
          type: 'Waterfront Development',
          status: 'Ongoing',
          year: '2016-2025'
        },
        {
          name: 'Emaar Beachfront',
          type: 'Luxury Residential',
          status: 'Ongoing',
          year: '2017-2024'
        }
      ],
      awards: [
        'Best Developer in the Middle East 2023',
        'Excellence in Real Estate Development 2022',
        'Sustainable Development Award 2021'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'DAMAC Properties',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      description: 'Luxury real estate developer with premium residential and commercial projects',
      detailedDescription: `
        DAMAC Properties is a leading luxury real estate developer in the Middle East, with a strong presence in Dubai, Abu Dhabi, Saudi Arabia, Qatar, Jordan, Lebanon, and the United Kingdom.
        
        Since its inception in 2002, DAMAC has delivered over 44,000 homes and has a development portfolio of over 50,000 units at various stages of progress and planning across the Middle East.
        
        The company is known for its luxury developments, innovative designs, and strategic partnerships with world-renowned brands and designers.
      `,
      specialties: ['Luxury Villas', 'High-end Apartments', 'Golf Communities', 'Branded Residences'],
      location: 'Dubai, UAE',
      established: '2002',
      totalProjects: '200+',
      employees: '3000+',
      website: 'www.damacproperties.com',
      phone: '+971 4 420 0000',
      email: 'info@damacproperties.com',
      projects: [
        {
          name: 'DAMAC Hills',
          type: 'Golf Community',
          status: 'Completed',
          year: '2015-2020'
        },
        {
          name: 'AKOYA Oxygen',
          type: 'Golf Community',
          status: 'Ongoing',
          year: '2014-2024'
        },
        {
          name: 'DAMAC Lagoons',
          type: 'Waterfront Community',
          status: 'Ongoing',
          year: '2021-2026'
        },
        {
          name: 'Paramount Tower',
          type: 'Luxury Residential',
          status: 'Completed',
          year: '2017'
        }
      ],
      awards: [
        'Best Luxury Developer 2023',
        'Innovation in Design Award 2022',
        'Customer Excellence Award 2021'
      ],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Sobha Realty',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      description: 'Premium developer known for quality construction and luxury amenities',
      detailedDescription: `
        Sobha Realty is the international arm of Sobha Limited, one of the fastest growing and foremost backward integrated real estate players in the country.
        
        Founded in 1995, Sobha Limited is currently one of India's largest real estate companies. The company has expanded its operations to Dubai, focusing on luxury residential developments.
        
        Sobha Realty is known for its commitment to quality, innovation, and customer satisfaction, delivering projects that set new benchmarks in luxury living.
      `,
      specialties: ['Luxury Apartments', 'Premium Villas', 'Waterfront Properties', 'Golf Communities'],
      location: 'Dubai, UAE',
      established: '2014',
      totalProjects: '25+',
      employees: '1500+',
      website: 'www.sobharealty.com',
      phone: '+971 4 373 7777',
      email: 'info@sobharealty.com',
      projects: [
        {
          name: 'Sobha Hartland',
          type: 'Waterfront Community',
          status: 'Ongoing',
          year: '2014-2025'
        },
        {
          name: 'Sobha Creek Vistas',
          type: 'Luxury Apartments',
          status: 'Completed',
          year: '2019'
        },
        {
          name: 'Sobha One',
          type: 'Ultra-luxury Tower',
          status: 'Ongoing',
          year: '2022-2026'
        },
        {
          name: 'Sobha Seahaven',
          type: 'Beachfront Residences',
          status: 'Planning',
          year: '2024-2028'
        }
      ],
      awards: [
        'Quality Excellence Award 2023',
        'Best Residential Developer 2022',
        'Green Building Certification 2021'
      ],
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=400&fit=crop'
<<<<<<< HEAD
=======
    },
    {
      id: 3,
      name: 'DAMAC Properties',
      logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop',
      description: 'Luxury real estate with world-class amenities',
      detailedDescription: `
        DAMAC Properties is a leading luxury real estate developer in the Middle East, with a strong presence in Dubai, Abu Dhabi, Saudi Arabia, Qatar, Jordan, Lebanon, and the United Kingdom.
        
        Since its inception in 2002, DAMAC has delivered over 44,000 homes and has a development portfolio of over 50,000 units at various stages of progress and planning across the Middle East.
        
        The company is known for its luxury developments, innovative designs, and strategic partnerships with world-renowned brands and designers.
      `,
      specialties: ['Luxury Villas', 'Golf Communities', 'Branded Residences', 'High-end Apartments'],
      location: 'Dubai, UAE',
      established: '2002',
      totalProjects: '22+',
      employees: '3000+',
      website: 'www.damacproperties.com',
      phone: '+971 4 420 0000',
      email: 'info@damacproperties.com',
      projects: [
        {
          name: 'DAMAC Hills',
          type: 'Golf Community',
          status: 'Completed',
          year: '2017'
        },
        {
          name: 'DAMAC Towers by Paramount',
          type: 'Luxury Towers',
          status: 'Completed',
          year: '2019'
        },
        {
          name: 'DAMAC Lagoons',
          type: 'Waterfront Community',
          status: 'Ongoing',
          year: '2021-2025'
        }
      ],
      awards: [
        'Best Luxury Developer 2023',
        'Innovation in Design Award 2022',
        'Customer Excellence Award 2021'
      ],
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Sobha Realty',
      logo: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=200&h=200&fit=crop',
      description: 'Premium developer known for quality construction',
      detailedDescription: `
        Sobha Realty is the international arm of Sobha Limited, one of the fastest growing and foremost backward integrated real estate players in the country.
        
        Founded in 1995, Sobha Limited is currently one of India's largest real estate companies. The company has expanded its operations to Dubai, focusing on luxury residential developments.
        
        Sobha Realty is known for its commitment to quality, innovation, and customer satisfaction, delivering projects that set new benchmarks in luxury living.
      `,
      specialties: ['Waterfront Properties', 'Luxury Apartments', 'Premium Villas', 'Golf Communities'],
      location: 'Dubai, UAE',
      established: '2014',
      totalProjects: '15+',
      employees: '1500+',
      website: 'www.sobharealty.com',
      phone: '+971 4 373 7777',
      email: 'info@sobharealty.com',
      projects: [
        {
          name: 'Sobha Hartland',
          type: 'Waterfront Community',
          status: 'Ongoing',
          year: '2014-2025'
        },
        {
          name: 'Sobha Creek Vistas',
          type: 'Luxury Apartments',
          status: 'Completed',
          year: '2019'
        },
        {
          name: 'Sobha One',
          type: 'Ultra-luxury Tower',
          status: 'Ongoing',
          year: '2022-2026'
        }
      ],
      awards: [
        'Quality Excellence Award 2023',
        'Best Residential Developer 2022',
        'Green Building Certification 2021'
      ],
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Meraas',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      description: 'Creating vibrant communities and experiences',
      detailedDescription: `
        Meraas is a Dubai-based holding company that focuses on creating vibrant communities and memorable experiences through its diverse portfolio of businesses.
        
        Established in 2007, Meraas has developed some of Dubai's most iconic destinations, including City Walk, The Beach, and Bluewaters Island.
        
        The company's vision is to create places where people love to live, work, and play, contributing to Dubai's position as a global destination.
      `,
      specialties: ['Entertainment', 'Retail', 'Hospitality', 'Mixed-Use Developments'],
      location: 'Dubai, UAE',
      established: '2007',
      totalProjects: '12+',
      employees: '2000+',
      website: 'www.meraas.com',
      phone: '+971 4 317 8888',
      email: 'info@meraas.com',
      projects: [
        {
          name: 'City Walk',
          type: 'Mixed-Use Development',
          status: 'Completed',
          year: '2013'
        },
        {
          name: 'Bluewaters Island',
          type: 'Island Development',
          status: 'Completed',
          year: '2018'
        },
        {
          name: 'The Beach',
          type: 'Beachfront Destination',
          status: 'Completed',
          year: '2014'
        }
      ],
      awards: [
        'Best Mixed-Use Development 2023',
        'Tourism Excellence Award 2022',
        'Innovation in Entertainment 2021'
      ],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Nakheel',
      logo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop',
      description: 'Iconic developer of world-famous landmarks',
      detailedDescription: `
        Nakheel is a Dubai-based real estate developer known for creating some of the world's most iconic developments, including the Palm Jumeirah, The World Islands, and Dubai Waterfront.
        
        Established in 2000, Nakheel has been at the forefront of Dubai's transformation into a global destination, creating innovative and ambitious projects that have redefined the city's skyline.
        
        The company continues to develop landmark projects that contribute to Dubai's status as a world-class destination for living, working, and leisure.
      `,
      specialties: ['Iconic Developments', 'Waterfront Projects', 'Master Communities', 'Retail Destinations'],
      location: 'Dubai, UAE',
      established: '2000',
      totalProjects: '20+',
      employees: '4000+',
      website: 'www.nakheel.com',
      phone: '+971 4 390 3333',
      email: 'info@nakheel.com',
      projects: [
        {
          name: 'Palm Jumeirah',
          type: 'Artificial Island',
          status: 'Completed',
          year: '2006'
        },
        {
          name: 'The World Islands',
          type: 'Artificial Archipelago',
          status: 'Ongoing',
          year: '2003-2025'
        },
        {
          name: 'Dragon City',
          type: 'Trading Hub',
          status: 'Completed',
          year: '2005'
        }
      ],
      awards: [
        'Iconic Development Award 2023',
        'Engineering Excellence 2022',
        'Landmark Project Award 2021'
      ],
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop'
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
    }
  ]

  useEffect(() => {
<<<<<<< HEAD
    // Find the partner by ID
    const foundPartner = staticPartnerDevelopers.find(dev => dev.id === parseInt(id))
    if (foundPartner) {
      setPartner(foundPartner)
      // Set related partners (exclude current partner)
      const related = staticPartnerDevelopers.filter(dev => dev.id !== parseInt(id)).slice(0, 2)
      setRelatedPartners(related)
    }
    setLoading(false)
=======
    const fetchPartnerData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Scroll to top when component loads
        window.scrollTo(0, 0)
        
        // Fetch partner by ID from API
        const partnerData = await api.getPartnerById(id)
        setPartner(partnerData)
        
        // Fetch all partners for related partners
        const allPartnersResponse = await api.getPartners({ limit: 10 })
        const allPartners = allPartnersResponse.partners || []
        
        // Set related partners (exclude current partner)
        const related = allPartners.filter(p => p._id !== id).slice(0, 2)
        setRelatedPartners(related)
        
      } catch (error) {
        console.error('Error fetching partner:', error)
        setError(error.message || 'Failed to load partner details')
        
        // Fallback to static data if API fails
        const foundPartner = staticPartnerDevelopers.find(dev => dev.id === parseInt(id))
        if (foundPartner) {
          setPartner(foundPartner)
          const related = staticPartnerDevelopers.filter(dev => dev.id !== parseInt(id)).slice(0, 2)
          setRelatedPartners(related)
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchPartnerData()
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
  }, [id])

  if (loading) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gold-400 text-xl">Loading...</div>
=======
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading partner details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Partner not found</div>
          <div className="text-gray-400 mb-6">The partner you're looking for doesn't exist or has been removed.</div>
          <Link to="/" className="bg-gold-500 hover:bg-gold-600 text-dark-900 px-6 py-3 rounded-lg font-semibold transition-colors">
            Back to Home
          </Link>
        </div>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
      </div>
    )
  }

  if (!partner) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Partner Not Found</h1>
          <Link to="/" className="text-gold-400 hover:text-gold-300 transition-colors">
            Return to Home
=======
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">Partner not found</div>
          <div className="text-gray-400 mb-6">The partner you're looking for doesn't exist.</div>
          <Link to="/" className="bg-gold-500 hover:bg-gold-600 text-dark-900 px-6 py-3 rounded-lg font-semibold transition-colors">
            Back to Home
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-dark-900 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-dark-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link to="/" className="text-gold-400 hover:text-gold-300 transition-colors">
                Home
              </Link>
              <span className="text-gray-500 mx-2">/</span>
              <span className="text-gray-300">Partners</span>
              <span className="text-gray-500 mx-2">/</span>
              <span className="text-white">{partner.name}</span>
            </nav>

            {/* Partner Header */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <img 
<<<<<<< HEAD
                    src={partner.logo} 
=======
                    src={partner.logo || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop'} 
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    alt={partner.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gold-500/30"
                  />
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">
                      {partner.name}
                    </h1>
                    <p className="text-gold-400 text-lg">{partner.description}</p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gold-500/20">
                    <div className="flex items-center text-gold-400 mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <span className="text-sm">Established</span>
                    </div>
                    <p className="text-white font-semibold">{partner.established}</p>
                  </div>
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gold-500/20">
                    <div className="flex items-center text-gold-400 mb-2">
                      <FaBuilding className="mr-2" />
                      <span className="text-sm">Projects</span>
                    </div>
<<<<<<< HEAD
                    <p className="text-white font-semibold">{partner.totalProjects}</p>
=======
                    <p className="text-white font-semibold">{partner.totalProjects || '0'}</p>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                  </div>
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gold-500/20">
                    <div className="flex items-center text-gold-400 mb-2">
                      <FaUsers className="mr-2" />
                      <span className="text-sm">Employees</span>
                    </div>
<<<<<<< HEAD
                    <p className="text-white font-semibold">{partner.employees}</p>
=======
                    <p className="text-white font-semibold">{partner.employees || 'N/A'}</p>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                  </div>
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gold-500/20">
                    <div className="flex items-center text-gold-400 mb-2">
                      <FaMapMarkerAlt className="mr-2" />
                      <span className="text-sm">Location</span>
                    </div>
<<<<<<< HEAD
                    <p className="text-white font-semibold">{partner.location}</p>
=======
                    <p className="text-white font-semibold">{partner.contact?.address?.city || partner.location || 'N/A'}</p>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={partner.image} 
                  alt={partner.name}
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20 mb-8">
                  <h2 className="text-3xl font-bold text-white mb-6 font-serif">About {partner.name}</h2>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
<<<<<<< HEAD
                    {partner.detailedDescription}
=======
                    {partner.about || partner.detailedDescription || 'No detailed information available.'}
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                  </div>
                </div>

                {/* Specialties */}
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-6 font-serif">Specialties</h3>
                  <div className="grid grid-cols-2 gap-4">
<<<<<<< HEAD
                    {partner.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center">
=======
                    {(partner.specialties || []).map((specialty, index) => (
                      <div key={`specialty-${index}`} className="flex items-center">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                        <div className="w-2 h-2 bg-gold-400 rounded-full mr-3"></div>
                        <span className="text-gray-300">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Major Projects */}
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gold-500/20">
                  <h3 className="text-2xl font-bold text-white mb-6 font-serif">Major Projects</h3>
                  <div className="space-y-4">
<<<<<<< HEAD
                    {partner.projects.map((project, index) => (
                      <div key={index} className="border border-gold-500/20 rounded-xl p-4 hover:border-gold-400/40 transition-colors">
=======
                    {(partner.projects || []).map((project, index) => (
                      <div key={`project-${index}`} className="border border-gold-500/20 rounded-xl p-4 hover:border-gold-400/40 transition-colors">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-semibold">{project.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                            project.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{project.type}</span>
<<<<<<< HEAD
                          <span>{project.year}</span>
=======
                          <span>{project.completionYear || project.year}</span>
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20">
                  <h3 className="text-xl font-bold text-white mb-6 font-serif">Contact Information</h3>
                  <div className="space-y-4">
<<<<<<< HEAD
                    <div className="flex items-center">
                      <FaGlobe className="text-gold-400 mr-3" />
                      <a href={`https://${partner.website}`} className="text-gray-300 hover:text-gold-400 transition-colors">
                        {partner.website}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-gold-400 mr-3" />
                      <a href={`tel:${partner.phone}`} className="text-gray-300 hover:text-gold-400 transition-colors">
                        {partner.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-gold-400 mr-3" />
                      <a href={`mailto:${partner.email}`} className="text-gray-300 hover:text-gold-400 transition-colors">
                        {partner.email}
                      </a>
                    </div>
=======
                    {(partner.contact?.website || partner.website) && (
                      <div className="flex items-center">
                        <FaGlobe className="text-gold-400 mr-3" />
                        <a href={`https://${partner.contact?.website || partner.website}`} className="text-gray-300 hover:text-gold-400 transition-colors">
                          {partner.contact?.website || partner.website}
                        </a>
                      </div>
                    )}
                    {(partner.contact?.phone || partner.phone) && (
                      <div className="flex items-center">
                        <FaPhone className="text-gold-400 mr-3" />
                        <a href={`tel:${partner.contact?.phone || partner.phone}`} className="text-gray-300 hover:text-gold-400 transition-colors">
                          {partner.contact?.phone || partner.phone}
                        </a>
                      </div>
                    )}
                    {(partner.contact?.email || partner.email) && (
                      <div className="flex items-center">
                        <FaEnvelope className="text-gold-400 mr-3" />
                        <a href={`mailto:${partner.contact?.email || partner.email}`} className="text-gray-300 hover:text-gold-400 transition-colors">
                          {partner.contact?.email || partner.email}
                        </a>
                      </div>
                    )}
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                  </div>
                </div>

                {/* Awards */}
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20">
                  <h3 className="text-xl font-bold text-white mb-6 font-serif">Awards & Recognition</h3>
                  <div className="space-y-3">
<<<<<<< HEAD
                    {partner.awards.map((award, index) => (
                      <div key={index} className="flex items-start">
=======
                    {(partner.awards || []).map((award, index) => (
                      <div key={`award-${index}`} className="flex items-start">
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                        <FaAward className="text-gold-400 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Partners */}
      {relatedPartners.length > 0 && (
        <section className="py-16 border-t border-gold-500/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center font-serif">
                Other Partners
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPartners.map((relatedPartner) => (
                  <Link 
<<<<<<< HEAD
                    key={relatedPartner.id}
                    to={`/partner/${relatedPartner.id}`}
=======
                    key={relatedPartner._id || relatedPartner.id}
                    to={`/partner/${relatedPartner._id || relatedPartner.id}`}
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                    className="group"
                  >
                    <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gold-500/20 hover:border-gold-400/40 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <img 
<<<<<<< HEAD
                          src={relatedPartner.logo} 
=======
                          src={relatedPartner.logo || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop'} 
>>>>>>> 862326b0dae02b9e946428193aebddf5819173e9
                          alt={relatedPartner.name}
                          className="w-12 h-12 rounded-full object-cover mr-4 border border-gold-500/30"
                        />
                        <div>
                          <h3 className="text-white font-semibold text-lg group-hover:text-gold-400 transition-colors">
                            {relatedPartner.name}
                          </h3>
                          <p className="text-gray-400 text-sm">{relatedPartner.location}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {relatedPartner.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold-600/20 to-gold-400/20 border-t border-gold-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6 font-serif">
            Interested in {partner.name} Properties?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our expert team to explore exclusive properties from {partner.name} and other premium developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-xl font-semibold hover:from-gold-700 hover:to-gold-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contact Us
            </Link>
            <Link 
              to="/properties" 
              className="px-8 py-4 border border-gold-500 text-gold-400 rounded-xl font-semibold hover:bg-gold-500/10 transition-all duration-300"
            >
              View Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PartnerDetail