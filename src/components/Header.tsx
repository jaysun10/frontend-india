import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.toLowerCase() === 'titi') {
      navigate('/admin');
      setSearchTerm('');
    }
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToGallery = () => {
    navigate('/gallery');
  };

  const navigateToContact = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to contact section
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other pages, navigate to home and then scroll to contact
      navigate('/', { state: { scrollToContact: true } });
    }
  };

  // Handle scroll to contact when navigating from other pages
  useEffect(() => {
    if (location.state?.scrollToContact && location.pathname === '/') {
      setTimeout(() => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const isHomePage = location.pathname === '/';
  const isGalleryPage = location.pathname === '/gallery';
  const isProfilePage = location.pathname.startsWith('/profile/');
  const isContactActive = location.hash === '#contact-section' || 
    (isHomePage && document.getElementById('contact-section')?.getBoundingClientRect().top <= 100);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at top or scrolling up, hide when scrolling down
      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true); // Show when scrolling up
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide when scrolling down (after 100px)
      }
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className={`max-w-7xl mx-auto transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-xl border border-pink-500/30 shadow-2xl shadow-pink-500/20' 
          : 'bg-gray-900/20 backdrop-blur-md border border-white/10'
      } rounded-xl sm:rounded-2xl`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <button onClick={navigateToHome} className="flex items-center space-x-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-pink-500/25">
                <span className="text-white font-bold text-xs sm:text-sm">E</span>
              </div>
              <span className="text-white font-serif text-lg sm:text-xl font-bold">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Escort Service</span>
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <button 
                onClick={navigateToHome}
                className={`relative px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 group ${
                  isHomePage && !isContactActive
                    ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">Home</span>
                {isHomePage && !isContactActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                )}
              </button>
              
              <button 
                onClick={navigateToGallery}
                className={`relative px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 group ${
                  isGalleryPage || isProfilePage
                    ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">Profiles</span>
                {(isGalleryPage || isProfilePage) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                )}
              </button>
              
              <button 
                onClick={navigateToContact}
                className={`relative px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 group ${
                  isContactActive
                    ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">Contact</span>
                {isContactActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                )}
              </button>
            </nav>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search companions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800/50 border border-pink-500/30 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 w-48 xl:w-64 backdrop-blur-sm transition-all duration-300 focus:w-56 xl:focus:w-72"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </form>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 hover:text-pink-400 transition-colors rounded-full hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-pink-500/20 bg-gray-900/95 backdrop-blur-xl rounded-b-xl sm:rounded-b-2xl">
              <nav className="flex flex-col space-y-2">
                <button 
                  onClick={() => {
                    navigateToHome();
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isHomePage && !isContactActive
                      ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => {
                    navigateToGallery();
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isGalleryPage || isProfilePage
                      ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Profiles
                </button>
                <button 
                  onClick={() => {
                    navigateToContact();
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isContactActive
                      ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Contact
                </button>
                <form onSubmit={handleSearch} className="mt-4 px-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search companions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800/50 border border-pink-500/30 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 w-full backdrop-blur-sm"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </form>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;