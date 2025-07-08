import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Crown } from 'lucide-react';

interface Profile {
  id: number;
  name: string;
  age: number;
  shortDescription: string;
  profilePhoto: string;
  location: string;
  isPremium: boolean;
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const handleClick = () => {
    // Scroll to top when clicking profile card
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link to={`/profile/${profile.id}`} className="group" onClick={handleClick}>
      <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl overflow-hidden border border-pink-500/20 hover:border-pink-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-400/10">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={profile.profilePhoto}
            alt={profile.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Premium Badge */}
          {profile.isPremium && (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-2 sm:px-3 py-1 rounded-full flex items-center space-x-1 text-xs font-bold shadow-lg">
              <Crown className="h-3 w-3" />
              <span className="hidden sm:inline">PREMIUM</span>
              <span className="sm:hidden">VIP</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Info Overlay */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
            <h3 className="text-white font-bold text-base sm:text-lg mb-1">{profile.name}, {profile.age}</h3>
            <div className="flex items-center text-gray-300 text-xs sm:text-sm mb-2">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-6">
          <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
            {profile.shortDescription}
          </p>
          
          <div className="flex items-center justify-end">
            <span className="text-pink-400 font-semibold text-xs sm:text-sm group-hover:text-white transition-colors">
              View Profile →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;