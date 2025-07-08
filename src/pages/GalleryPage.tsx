import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { profiles, Profile } from '../data/profiles';

const GalleryPage: React.FC = () => {
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>(profiles);
  const [searchTerm, setSearchTerm] = useState('');

  // Search functionality
  useEffect(() => {
    const filtered = profiles.filter(profile =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.age.toString().includes(searchTerm)
    );
    setFilteredProfiles(filtered);
  }, [searchTerm]);

  const handleBackClick = () => {
    // Scroll to top when going back to home
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            onClick={handleBackClick}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-pink-400 transition-colors mb-6 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Our Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Gallery</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Browse through our complete collection of sophisticated companions
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, location, or age..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 border border-pink-500/30 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-lg backdrop-blur-sm"
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="mb-8">
          {filteredProfiles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl">No companions found matching your search.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-pink-400 hover:text-pink-300 transition-colors"
              >
                Clear search to see all companions
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProfiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;