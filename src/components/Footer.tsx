import React from 'react';
import { MessageCircle, Send, Phone, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-lg border-t border-pink-500/20 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">E</span>
              </div>
              <span className="text-white font-serif text-lg sm:text-xl font-bold">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Escort Service</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Premium companion services with discretion and elegance. Experience luxury redefined.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-xs sm:text-sm">Our Companions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-xs sm:text-sm">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-xs sm:text-sm">Booking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-xs sm:text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h3>
            <div className="space-y-2 sm:space-y-3">
              <a href="https://wa.me/1234567890" className="flex items-center space-x-2 sm:space-x-3 text-gray-400 hover:text-green-400 transition-colors">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">WhatsApp</span>
              </a>
              <a href="https://t.me/escort_service" className="flex items-center space-x-2 sm:space-x-3 text-gray-400 hover:text-blue-400 transition-colors">
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Telegram</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center space-x-2 sm:space-x-3 text-gray-400 hover:text-pink-400 transition-colors">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Phone</span>
              </a>
              <a href="mailto:contact@escortservice.com" className="flex items-center space-x-2 sm:space-x-3 text-gray-400 hover:text-pink-400 transition-colors">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs sm:text-sm">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-500/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span>© 2025 The Escort Service. All rights reserved. | 18+ Only | Discretion Guaranteed</span>
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-pink-400" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;