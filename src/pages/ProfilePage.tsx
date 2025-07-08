import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Crown, MessageCircle, Send, Phone, ChevronLeft, ChevronRight, Heart, Sparkles, Calendar, BookOpen } from 'lucide-react';
import { profiles } from '../data/profiles';
import BookingForm from '../components/BookingForm';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const profile = profiles.find(p => p.id === parseInt(id || '0'));

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Profile not found</h2>
          <Link to="/" className="text-pink-400 hover:text-white transition-colors">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const allPhotos = [profile.profilePhoto, ...profile.additionalPhotos];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  // Function to format availability with better explanation
  const formatAvailability = (availability: string) => {
    const availabilityMap: { [key: string]: { icon: string, description: string } } = {
      'Evenings & Weekends': { icon: '🌙', description: 'Available during evening hours and weekends for your convenience' },
      'Flexible Schedule': { icon: '⏰', description: 'Adaptable timing to match your busy lifestyle' },
      'Business Hours': { icon: '💼', description: 'Professional availability during standard business hours' },
      'Weekends & Holidays': { icon: '🎉', description: 'Perfect for weekend getaways and holiday celebrations' },
      'By Appointment': { icon: '📅', description: 'Exclusive availability by advance booking only' }
    };

    const info = availabilityMap[availability] || { icon: '📅', description: 'Contact for availability details' };
    return info;
  };

  const availabilityInfo = formatAvailability(profile.availability);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-20 sm:pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-pink-400 transition-all duration-300 mb-6 sm:mb-8 group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 sm:px-6 py-2 sm:py-3"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Gallery</span>
          </Link>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
            {/* Photo Gallery - Takes 2 columns */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {/* Main Photo */}
              <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-800/30 backdrop-blur-lg border border-pink-500/20 shadow-2xl">
                <img
                  src={allPhotos[currentPhotoIndex]}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Premium Badge */}
                {profile.isPremium && (
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-2 font-bold shadow-lg backdrop-blur-sm text-xs sm:text-sm">
                    <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>PREMIUM</span>
                  </div>
                )}

                {allPhotos.length > 1 && (
                  <>
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-pink-500/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-pink-500/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>

                    {/* Photo Counter */}
                    <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-black/50 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm backdrop-blur-sm">
                      {currentPhotoIndex + 1} / {allPhotos.length}
                    </div>
                  </>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Name Overlay */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-1 sm:mb-2">
                    {profile.name}
                  </h1>
                  <div className="flex items-center space-x-2 sm:space-x-4 text-gray-200">
                    <span className="text-lg sm:text-xl">Age {profile.age}</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
                      <span className="text-sm sm:text-base">{profile.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Thumbnails */}
              {allPhotos.length > 1 && (
                <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2">
                  {allPhotos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        index === currentPhotoIndex
                          ? 'border-pink-400 scale-105 shadow-lg shadow-pink-400/25'
                          : 'border-gray-600 hover:border-pink-400/50'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`${profile.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Info - Takes 1 column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Quick Info Card */}
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-xl">
                {/* Enhanced Availability Section */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 mb-4 sm:mb-6 border border-purple-500/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base">{profile.availability}</h4>
                      <span className="text-lg">{availabilityInfo.icon}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {availabilityInfo.description}
                  </p>
                </div>
                
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
                  {profile.shortDescription}
                </p>

                {/* Book Now Button */}
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40"
                >
                  <BookOpen className="h-6 w-6" />
                  <span>Book Your Desire Now</span>
                  <Sparkles className="h-6 w-6" />
                </button>
              </div>

              {/* About Section - Moved above Services */}
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 sm:mb-6 flex items-center space-x-2">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />
                  <span>About {profile.name}</span>
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {profile.fullDescription}
                </p>
              </div>

              {/* Services Card - Now below About */}
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 sm:mb-6 flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400" />
                  <span>Services</span>
                </h3>
                <div className="space-y-3">
                  {profile.services.map((service, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/15 to-pink-500/20 border border-pink-500/30 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-500/10">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium text-sm sm:text-base">{service}</span>
                          <div className="w-2 h-2 bg-pink-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        {/* Subtle animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Section - Full Width */}
          <div className="mt-8 sm:mt-12">
            <div className="bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-gray-900/40 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-pink-500/30 shadow-2xl relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-8 sm:mb-12">
                  <div className="inline-flex items-center space-x-2 bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-2 mb-6">
                    <Sparkles className="h-5 w-5 text-pink-400" />
                    <span className="text-pink-400 font-medium">Ready to Connect?</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                    Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">{profile.name}</span>
                  </h3>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Choose your preferred way to connect and start your unforgettable experience
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {/* WhatsApp Card */}
                  <div className="group">
                    <a
                      href={`https://wa.me/${profile.contactInfo.whatsapp.replace(/\D/g, '')}`}
                      className="block bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:scale-105 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/20"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/25">
                        <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">WhatsApp</h4>
                      <p className="text-gray-300 mb-4 text-sm sm:text-base">Instant messaging for quick responses</p>
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center space-x-2 group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300">
                        <span>Message Now</span>
                      </div>
                    </a>
                  </div>

                  {/* Telegram Card */}
                  <div className="group">
                    <a
                      href={`https://t.me/${profile.contactInfo.telegram.replace('@', '')}`}
                      className="block bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:scale-105 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/25">
                        <Send className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">Telegram</h4>
                      <p className="text-gray-300 mb-4 text-sm sm:text-base">Secure and private communication</p>
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center space-x-2 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                        <span>Chat Now</span>
                      </div>
                    </a>
                  </div>

                  {/* Phone Card */}
                  <div className="group">
                    <a
                      href={`tel:${profile.contactInfo.phone}`}
                      className="block bg-gradient-to-br from-pink-500/20 to-purple-500/10 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:scale-105 hover:border-pink-400/50 hover:shadow-2xl hover:shadow-pink-500/20"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/25">
                        <Phone className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">Call Now</h4>
                      <p className="text-gray-300 mb-4 text-sm sm:text-base">Direct line for immediate connection</p>
                      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center space-x-2 group-hover:from-pink-500 group-hover:to-purple-600 transition-all duration-300">
                        <span>Call Direct</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 sm:mt-12 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-3">
                      <Heart className="h-6 w-6 text-pink-400" />
                    </div>
                    <h5 className="text-white font-semibold mb-1">100% Discretion</h5>
                    <p className="text-gray-400 text-sm">Your privacy is our priority</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-3">
                      <Sparkles className="h-6 w-6 text-pink-400" />
                    </div>
                    <h5 className="text-white font-semibold mb-1">Premium Quality</h5>
                    <p className="text-gray-400 text-sm">Verified and professional</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-3">
                      <Calendar className="h-6 w-6 text-pink-400" />
                    </div>
                    <h5 className="text-white font-semibold mb-1">24/7 Available</h5>
                    <p className="text-gray-400 text-sm">Round-the-clock service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingForm 
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        girlName={profile.name}
      />
    </div>
  );
};

export default ProfilePage;