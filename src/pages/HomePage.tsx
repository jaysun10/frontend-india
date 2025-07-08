import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Phone, ChevronLeft, ChevronRight, ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import ParticlesBackground from '../components/ParticlesBackground';
import { profiles } from '../data/profiles';
import { websiteSettings } from '../data/websiteSettings';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { heroSlides } = websiteSettings;

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Star;
    return <IconComponent className="h-12 w-12 sm:h-16 sm:w-16 text-pink-400" />;
  };

  const handleViewMoreClick = () => {
    // Scroll to top when navigating to gallery
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900" />
        
        {/* Particles Background */}
        <ParticlesBackground />
        
        {/* Hero Slides */}
        <div className="relative h-full flex items-center justify-center px-4 z-10">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-center max-w-4xl mx-auto px-4">
                <div className="mb-6 sm:mb-8 flex justify-center">
                  <div className="relative">
                    {getIcon(slide.icon)}
                    <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl"></div>
                  </div>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {slide.heading}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
                  <a
                    href={`https://wa.me/${websiteSettings.contactInfo.whatsapp.replace(/\D/g, '')}`}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg shadow-green-500/25"
                  >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`https://t.me/${websiteSettings.contactInfo.telegram.replace('@', '')}`}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Telegram</span>
                  </a>
                  <a
                    href={`tel:${websiteSettings.contactInfo.phone}`}
                    className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg shadow-pink-500/25"
                  >
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-pink-500/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-pink-500/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-pink-400 scale-125 shadow-lg shadow-pink-400/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Profiles Section - Only show 2 profiles */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
              Featured Companions
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Meet some of our most sought-after companions, each bringing their unique charm and sophistication
            </p>
          </div>

          {profiles.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-gray-400 text-lg sm:text-xl">No companions available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {profiles.slice(0, 2).map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
              
              {profiles.length > 2 && (
                <div className="text-center mt-8 sm:mt-12">
                  <Link
                    to="/gallery"
                    onClick={handleViewMoreClick}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/25"
                  >
                    <span>View More Profiles</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-16 sm:py-20 px-4 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-gray-900/30 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-pink-500/10 backdrop-blur-sm border border-pink-500/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
              <span className="text-pink-400 font-medium text-sm sm:text-base">Ready to Connect?</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 sm:mb-6">
              Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Luxury</span>
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Contact us now to arrange your perfect evening. Discretion, elegance, and satisfaction guaranteed with every encounter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* WhatsApp Card */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 sm:p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Instant messaging for quick responses</p>
              <a
                href={`https://wa.me/${websiteSettings.contactInfo.whatsapp.replace(/\D/g, '')}`}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                <span>Message Now</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </div>

            {/* Telegram Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 sm:p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Send className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Telegram</h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Secure and private communication</p>
              <a
                href={`https://t.me/${websiteSettings.contactInfo.telegram.replace('@', '')}`}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                <span>Chat Now</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/5 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-6 sm:p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Direct Call</h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Speak directly with our team</p>
              <a
                href={`tel:${websiteSettings.contactInfo.phone}`}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                <span>Call Now</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">100% Discretion</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Your privacy is our priority</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">Premium Quality</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Carefully selected companions</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">24/7 Available</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Round-the-clock service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;