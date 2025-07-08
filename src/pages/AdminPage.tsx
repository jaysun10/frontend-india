import React, { useState } from 'react';
import { Users, Settings, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { profiles, Profile } from '../data/profiles';
import { websiteSettings, WebsiteSettings } from '../data/websiteSettings';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profiles' | 'settings'>('profiles');
  const [localProfiles, setLocalProfiles] = useState<Profile[]>(profiles);
  const [localSettings, setLocalSettings] = useState<WebsiteSettings>(websiteSettings);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(false);

  const emptyProfile: Omit<Profile, 'id'> = {
    name: '',
    age: 18,
    shortDescription: '',
    fullDescription: '',
    profilePhoto: '',
    additionalPhotos: [],
    services: [],
    location: '',
    availability: '',
    isPremium: false,
    contactInfo: {
      whatsapp: '',
      telegram: '',
      phone: ''
    }
  };

  const handleSaveProfile = () => {
    if (!editingProfile) return;

    if (editingProfile.id) {
      // Update existing profile
      setLocalProfiles(prev => prev.map(p => p.id === editingProfile.id ? editingProfile : p));
    } else {
      // Create new profile
      const newProfile = {
        ...editingProfile,
        id: Math.max(...localProfiles.map(p => p.id)) + 1
      };
      setLocalProfiles(prev => [...prev, newProfile]);
    }
    
    setEditingProfile(null);
    setShowProfileForm(false);
    alert('Profile saved! Note: Changes are only visible in this session. To make permanent changes, edit the code in /escort-service-frontend/src/data/profiles.ts');
  };

  const handleDeleteProfile = (id: number) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    
    setLocalProfiles(prev => prev.filter(p => p.id !== id));
    alert('Profile deleted! Note: Changes are only visible in this session. To make permanent changes, edit the code in /escort-service-frontend/src/data/profiles.ts');
  };

  const handleSaveSettings = () => {
    alert('Settings saved! Note: Changes are only visible in this session. To make permanent changes, edit the code in /escort-service-frontend/src/data/websiteSettings.ts');
  };

  const updateProfileField = (field: string, value: any) => {
    if (!editingProfile) return;
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditingProfile({
        ...editingProfile,
        [parent]: {
          ...(editingProfile as any)[parent],
          [child]: value
        }
      });
    } else {
      setEditingProfile({
        ...editingProfile,
        [field]: value
      });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Admin Panel</h1>
          <p className="text-gray-400">Manage your companions and website settings</p>
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-400 text-sm">
              <strong>Note:</strong> This admin panel allows you to preview changes, but they are only temporary. 
              To make permanent changes, edit the files in <code>/escort-service-frontend/src/data/</code>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800/30 p-1 rounded-xl inline-flex">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'profiles'
                ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Manage Profiles</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Website Settings</span>
          </button>
        </div>

        {/* Profiles Tab */}
        {activeTab === 'profiles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Companion Profiles</h2>
              <button
                onClick={() => {
                  setEditingProfile({ ...emptyProfile, id: 0 });
                  setShowProfileForm(true);
                }}
                className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Profile</span>
              </button>
            </div>

            {/* Profiles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localProfiles.map((profile) => (
                <div key={profile.id} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={profile.profilePhoto}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-white font-bold">{profile.name}</h3>
                      <p className="text-gray-400">Age {profile.age}</p>
                      {profile.isPremium && (
                        <span className="text-yellow-400 text-sm font-semibold">PREMIUM</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {profile.shortDescription}
                  </p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingProfile(profile);
                        setShowProfileForm(true);
                      }}
                      className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Website Settings</h2>
            
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Business Name</label>
                  <input
                    type="text"
                    value={localSettings.businessName}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      businessName: e.target.value
                    })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Tagline</label>
                  <input
                    type="text"
                    value={localSettings.tagline}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      tagline: e.target.value
                    })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    value={localSettings.description}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      description: e.target.value
                    })}
                    rows={3}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">WhatsApp</label>
                  <input
                    type="text"
                    value={localSettings.contactInfo.whatsapp}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      contactInfo: {
                        ...localSettings.contactInfo,
                        whatsapp: e.target.value
                      }
                    })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Telegram</label>
                  <input
                    type="text"
                    value={localSettings.contactInfo.telegram}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      contactInfo: {
                        ...localSettings.contactInfo,
                        telegram: e.target.value
                      }
                    })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Phone</label>
                  <input
                    type="text"
                    value={localSettings.contactInfo.phone}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      contactInfo: {
                        ...localSettings.contactInfo,
                        phone: e.target.value
                      }
                    })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={localSettings.contactInfo.email}
                    onChange={(e) => setLocalSettings({
                      ...localSettings,
                      contactInfo: {
                        ...localSettings.contactInfo,
                        email: e.target.value
                      }
                    })}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleSaveSettings}
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Form Modal */}
        {showProfileForm && editingProfile && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">
                  {editingProfile.id ? 'Edit Profile' : 'Add New Profile'}
                </h3>
                <button
                  onClick={() => {
                    setShowProfileForm(false);
                    setEditingProfile(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      value={editingProfile.name}
                      onChange={(e) => updateProfileField('name', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Age</label>
                    <input
                      type="number"
                      value={editingProfile.age}
                      onChange={(e) => updateProfileField('age', parseInt(e.target.value))}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Location</label>
                    <input
                      type="text"
                      value={editingProfile.location}
                      onChange={(e) => updateProfileField('location', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Availability</label>
                    <input
                      type="text"
                      value={editingProfile.availability}
                      onChange={(e) => updateProfileField('availability', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Profile Photo URL</label>
                    <input
                      type="url"
                      value={editingProfile.profilePhoto}
                      onChange={(e) => updateProfileField('profilePhoto', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={editingProfile.isPremium}
                        onChange={(e) => updateProfileField('isPremium', e.target.checked)}
                        className="rounded border-gray-600 bg-gray-700 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span>Premium Profile</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Short Description</label>
                  <textarea
                    value={editingProfile.shortDescription}
                    onChange={(e) => updateProfileField('shortDescription', e.target.value)}
                    rows={2}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Full Description</label>
                  <textarea
                    value={editingProfile.fullDescription}
                    onChange={(e) => updateProfileField('fullDescription', e.target.value)}
                    rows={4}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Services (comma-separated)</label>
                  <input
                    type="text"
                    value={editingProfile.services.join(', ')}
                    onChange={(e) => updateProfileField('services', e.target.value.split(', ').filter(s => s.trim()))}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Additional Photos (comma-separated URLs)</label>
                  <textarea
                    value={editingProfile.additionalPhotos.join(', ')}
                    onChange={(e) => updateProfileField('additionalPhotos', e.target.value.split(', ').filter(s => s.trim()))}
                    rows={2}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">WhatsApp</label>
                    <input
                      type="text"
                      value={editingProfile.contactInfo.whatsapp}
                      onChange={(e) => updateProfileField('contactInfo.whatsapp', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Telegram</label>
                    <input
                      type="text"
                      value={editingProfile.contactInfo.telegram}
                      onChange={(e) => updateProfileField('contactInfo.telegram', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Phone</label>
                    <input
                      type="text"
                      value={editingProfile.contactInfo.phone}
                      onChange={(e) => updateProfileField('contactInfo.phone', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowProfileForm(false);
                    setEditingProfile(null);
                  }}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;