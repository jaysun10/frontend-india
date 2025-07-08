import React, { useState } from 'react';
import { X, User, Phone, MapPin, Globe, Heart, Send, Sparkles, MessageCircle } from 'lucide-react';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  girlName: string;
}

interface FormData {
  customerName: string;
  phoneNumber: string;
  country: string;
  state: string;
  girlName: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose, girlName }) => {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    phoneNumber: '',
    country: '',
    state: '',
    girlName: girlName
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'telegram'>('whatsapp');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createMessage = () => {
    if (selectedPlatform === 'whatsapp') {
      return `🌟 *EXCLUSIVE BOOKING REQUEST* 🌟

✨ *CUSTOMER DETAILS* ✨
👤 *Name:* ${formData.customerName}
📱 *Phone:* ${formData.phoneNumber}
🌍 *Country:* ${formData.country}
📍 *State:* ${formData.state}

💖 *DESIRED COMPANION:* ${formData.girlName} 💖

🕐 *Request Time:* ${new Date().toLocaleString()}

🔥 *Ready for an unforgettable experience!* 🔥`;
    } else {
      return `🌟 **EXCLUSIVE BOOKING REQUEST** 🌟

✨ **CUSTOMER DETAILS** ✨
👤 **Name:** ${formData.customerName}
📱 **Phone:** ${formData.phoneNumber}
🌍 **Country:** ${formData.country}
📍 **State:** ${formData.state}

💖 **DESIRED COMPANION:** ${formData.girlName} 💖

🕐 **Request Time:** ${new Date().toLocaleString()}

🔥 **Ready for an unforgettable experience!** 🔥`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = createMessage();
    const encodedMessage = encodeURIComponent(message);

    if (selectedPlatform === 'whatsapp') {
      const whatsappNumber = '+919306145339';
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // For Telegram, you can use a bot username or direct message
      const telegramUrl = `https://t.me/share/url?url=&text=${encodedMessage}`;
      window.open(telegramUrl, '_blank');
    }

    // Reset form and close
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        customerName: '',
        phoneNumber: '',
        country: '',
        state: '',
        girlName: girlName
      });
      onClose();
    }, 1000);
  };

  const isFormValid = formData.customerName && formData.phoneNumber && formData.country && formData.state;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900/50 to-pink-900/50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-pink-500/30 shadow-2xl">
        {/* Header */}
        <div className="relative p-6 sm:p-8 border-b border-pink-500/20">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative flex justify-between items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-4 py-2 mb-4">
                <Heart className="h-4 w-4 text-pink-400" />
                <span className="text-pink-400 font-medium text-sm">Exclusive Booking</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Desire</span>
              </h2>
              <p className="text-gray-300">Complete the form below to book your time with {girlName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Platform Selection */}
          <div className="space-y-3">
            <label className="block text-white font-semibold mb-3">
              Choose Your Preferred Platform
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedPlatform('whatsapp')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-3 ${
                  selectedPlatform === 'whatsapp'
                    ? 'border-green-400 bg-green-500/20 text-green-400'
                    : 'border-gray-600 bg-gray-800/30 text-gray-400 hover:border-green-400/50'
                }`}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlatform('telegram')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-3 ${
                  selectedPlatform === 'telegram'
                    ? 'border-blue-400 bg-blue-500/20 text-blue-400'
                    : 'border-gray-600 bg-gray-800/30 text-gray-400 hover:border-blue-400/50'
                }`}
              >
                <Send className="h-5 w-5" />
                <span className="font-semibold">Telegram</span>
              </button>
            </div>
          </div>

          {/* Customer Name */}
          <div className="group">
            <label className="block text-white font-semibold mb-3 flex items-center space-x-2">
              <User className="h-5 w-5 text-pink-400" />
              <span>Your Name</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 group-hover:border-gray-500/70"
                placeholder="Enter your full name"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="group">
            <label className="block text-white font-semibold mb-3 flex items-center space-x-2">
              <Phone className="h-5 w-5 text-pink-400" />
              <span>Phone Number</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 group-hover:border-gray-500/70"
                placeholder="Enter your phone number"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          </div>

          {/* Country and State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-white font-semibold mb-3 flex items-center space-x-2">
                <Globe className="h-5 w-5 text-pink-400" />
                <span>Country</span>
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 group-hover:border-gray-500/70 appearance-none cursor-pointer"
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Singapore">Singapore</option>
                  <option value="UAE">UAE</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>

            <div className="group">
              <label className="block text-white font-semibold mb-3 flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-pink-400" />
                <span>State/Region</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 group-hover:border-gray-500/70"
                  placeholder="Enter your state/region"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Selected Girl */}
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Selected Companion</p>
                <p className="text-white font-semibold text-lg">{girlName}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                isFormValid && !isSubmitting
                  ? selectedPlatform === 'whatsapp'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-[1.02]'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-[1.02]'
                  : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  {selectedPlatform === 'whatsapp' ? (
                    <MessageCircle className="h-5 w-5" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  <span>Book Now via {selectedPlatform === 'whatsapp' ? 'WhatsApp' : 'Telegram'}</span>
                  <Sparkles className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gray-800/30 border border-gray-600/30 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm leading-relaxed">
              🔒 Your information is secure and will only be used for booking purposes. 
              We guarantee 100% discretion and privacy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;