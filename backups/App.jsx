import React, { useState } from 'react';
import {
  Home, Search, Play, MessageSquare, User,
  Heart, MessageCircle, Send, Bookmark, MoreVertical,
  Plus, Bell, Settings, Phone, Video, Edit3, Grid,
  Tag, ChevronLeft, Moon, LogOut, Compass, Mic,
  Repeat, Share, Clapperboard, MessageCircleMore, X,
  Globe, Shield, Info, HelpCircle, MoreHorizontal,
  Calendar, MapPin, Star, CheckCircle2
} from 'lucide-react';

// --- Production UI Components ---

const StoryRing = ({ children, hasStory, className = '' }) => (
  <div className={`relative rounded-full flex items-center justify-center transition-all ${hasStory
      ? 'ring-[2px] ring-offset-[3px] ring-offset-white dark:ring-offset-[#0B0F14] ring-[#6C5CE7] shadow-[0_0_12px_rgba(108,92,231,0.2)] dark:shadow-[0_0_12px_rgba(108,92,231,0.3)]'
      : 'border-[1.5px] border-black/10 dark:border-white/[0.1]'
    } ${className}`}>
    {children}
  </div>
);

const IconButton = ({ icon: Icon, active, onClick, className = '', notification }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center justify-center transition-transform active:scale-90 ${active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'} ${className}`}
  >
    <Icon size={24} strokeWidth={active ? 2.5 : 2} className={active ? 'fill-current' : ''} />
    {notification && (
      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#6C5CE7] border-2 border-white dark:border-[#0B0F14] rounded-full shadow-[0_0_8px_rgba(108,92,231,0.6)]"></span>
    )}
  </button>
);

// --- Shared Helper Components (Token Optimized) ---

const SettingsGroup = ({ title, children }) => (
  <div className="flex flex-col gap-2 mb-4">
    <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1">{title}</h2>
    <div className="bg-gray-100 dark:bg-[#111827] rounded-2xl overflow-hidden shadow-sm">
      {children}
    </div>
  </div>
);

const SettingsItem = ({ icon: Icon, label, onClick, toggle }) => (
  <div
    className="w-full flex items-center justify-between p-4 border-b border-black/5 dark:border-white/[0.04] last:border-0 active:bg-gray-200 dark:active:bg-[#1A2235] transition-colors cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <Icon size={20} className="text-gray-900 dark:text-white" />
      <span className="text-gray-900 dark:text-white text-[15px] font-medium">{label}</span>
    </div>
    {toggle !== undefined ? (
      <div className={`w-11 h-6 rounded-full p-0.5 flex transition-colors duration-300 shadow-inner ${toggle ? 'bg-[#6C5CE7]' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${toggle ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
    ) : (
      <ChevronLeft size={18} className="text-gray-400 rotate-180" />
    )}
  </div>
);

const EditField = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/[0.04] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1A2235] transition-colors last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D946EF] to-[#8B5CF6] flex items-center justify-center shadow-sm">
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-[14px] font-medium text-gray-900 dark:text-white">{label}</span>
        <span className="text-[12px] text-gray-500 font-medium mt-0.5">{value}</span>
      </div>
    </div>
    <ChevronLeft size={18} className="text-gray-400 rotate-180" />
  </div>
);

// --- Mock Data ---

const MOCK_USER = {
  username: 'hariomsingh',
  name: 'HARIOM SINGH',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
  cover: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
  posts: 0,
  followers: 6,
  following: 6,
  bio: 'Digital Creator • UI/UX',
  personas: ['🎨 Creative', '☕ Coffee Addict', '💻 Tech Geek'],
};

const MOCK_USERS = [
  { id: 1, user: 'Your Story', avatar: MOCK_USER.avatar, isMe: true },
  { id: 2, user: 'raw_aadiii25', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', hasStory: true },
  { id: 3, user: 'arice', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', hasStory: false },
  { id: 4, user: 'jiteshpal1602', isTextAvatar: true, initial: 'J', hasStory: false },
  { id: 5, user: 'rayyankha9087', isTextAvatar: true, initial: 'R', hasStory: false },
  { id: 6, user: 'vishal', avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop', hasStory: false },
  { id: 7, user: 'kiara_singh_1242', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', hasStory: true },
];

const MOCK_POSTS = [
  {
    id: 1,
    user: 'gunjan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop',
    caption: 'Not perfect, but progress 🐎',
    tags: ['#ArtProgress', '#Sketch'],
    time: '10 hours ago',
    likes: 124,
  }
];

const MOCK_GALLERY = Array(12).fill('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop');

const MOCK_COMMENTS = [
  { id: 1, user: 'alex_dev', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', text: 'This looks incredibly clean! 🔥', time: '2h', likes: 12 },
  { id: 2, user: 'omnexia_tech', avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop', isVoice: true, duration: '0:14', time: '1h', likes: 5 },
  { id: 3, user: 'kiara_singh', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', text: 'Love the premium framed cards touch ✨', time: '30m', likes: 2 },
];

const DEMOCRACY_CHANNELS = [
  { id: 1, name: 'Global Tech Trends', members: '1.2M', icon: Globe },
  { id: 2, name: 'Design Innovations', members: '850K', icon: Edit3 },
  { id: 3, name: 'Creator Economy', members: '420K', icon: Star },
  { id: 4, name: 'Security & Privacy', members: '200K', icon: Shield },
];

// --- Core Views ---

const CreatePostView = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('recent'); // 'recent' | 'democracy'
  const [selectedChannel, setSelectedChannel] = useState(1);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0B0F14] overflow-hidden relative">
      <div className="flex justify-between items-center px-4 py-3 border-b border-black/5 dark:border-white/[0.08] bg-white dark:bg-[#0B0F14] z-10">
        <IconButton icon={X} onClick={onBack} className="-ml-2" />
        <h1 className="text-[16px] font-bold text-gray-900 dark:text-white flex-1 text-center">New Post</h1>
        <button className="bg-[#00D1FF] text-white px-5 py-1.5 rounded-full text-[14px] font-bold shadow-md hover:bg-blue-400 transition-colors">Next</button>
      </div>

      <div className="flex px-5 py-3 gap-6 bg-white dark:bg-[#0B0F14] z-10 border-b border-black/5 dark:border-white/[0.04]">
        <button
          onClick={() => setActiveTab('recent')}
          className={`text-[14px] font-bold pb-1 transition-colors ${activeTab === 'recent' ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          Recent
        </button>
        <button
          onClick={() => setActiveTab('democracy')}
          className={`text-[14px] font-bold pb-1 transition-colors ${activeTab === 'democracy' ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
        >
          Democracy
        </button>
      </div>

      {activeTab === 'recent' ? (
        <>
          <div className="flex-none relative w-full aspect-square bg-gray-200 dark:bg-gray-800 z-0">
            <img src={MOCK_USER.avatar} className="w-full h-full object-cover" alt="Preview" />
            {/* 3x3 Grid Overlay */}
            <div className="absolute inset-0 flex flex-col justify-evenly pointer-events-none z-10">
              <div className="w-full h-[1px] bg-white/40"></div>
              <div className="w-full h-[1px] bg-white/40"></div>
            </div>
            <div className="absolute inset-0 flex justify-evenly pointer-events-none z-10">
              <div className="w-[1px] h-full bg-white/40"></div>
              <div className="w-[1px] h-full bg-white/40"></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-0.5 bg-white dark:bg-[#0B0F14] pb-24">
            {MOCK_GALLERY.map((img, idx) => (
              <div key={idx} className="aspect-square bg-gray-200 dark:bg-gray-800">
                <img src={img} className="w-full h-full object-cover" alt="Gallery item" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#05070A] px-4 py-6 pb-24">
          <div className="flex flex-col mb-6 text-center px-4">
            <div className="w-16 h-16 bg-[#6C5CE7]/10 dark:bg-[#00D1FF]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe size={32} className="text-[#6C5CE7] dark:text-[#00D1FF]" />
            </div>
            <h2 className="text-[18px] font-bold text-gray-900 dark:text-white tracking-tight">Post to Democracy</h2>
            <p className="text-[13px] text-gray-500 mt-1 font-medium">Select a community channel to cast your post into the democratic feed.</p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Available Channels</span>
            {DEMOCRACY_CHANNELS.map(channel => {
              const Icon = channel.icon;
              const isSelected = selectedChannel === channel.id;
              return (
                <div
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${isSelected
                      ? 'bg-white dark:bg-[#111827] border-[#6C5CE7] dark:border-[#00D1FF] shadow-md'
                      : 'bg-white/50 dark:bg-[#0B0F14] border-black/5 dark:border-white/[0.08] hover:border-black/10 dark:hover:border-white/[0.15]'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-[#6C5CE7]/10 dark:bg-[#00D1FF]/10 text-[#6C5CE7] dark:text-[#00D1FF]' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[15px] font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{channel.name}</span>
                      <span className="text-[12px] font-medium text-gray-500">{channel.members} participants</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-[#6C5CE7] dark:border-[#00D1FF] bg-[#6C5CE7] dark:bg-[#00D1FF]' : 'border-gray-300 dark:border-gray-600 bg-transparent'
                    }`}>
                    {isSelected && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
        <div className="bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl rounded-full p-1.5 flex items-center shadow-lg border border-black/10 dark:border-white/10">
          <button className="bg-[#00D1FF] text-white px-7 py-2.5 rounded-full font-bold text-[13px] shadow-sm">POST</button>
          <button className="text-gray-600 dark:text-gray-300 px-7 py-2.5 rounded-full font-bold text-[13px] hover:bg-black/5 dark:hover:bg-white/5 transition-colors">STORY</button>
          <button className="text-gray-600 dark:text-gray-300 px-7 py-2.5 rounded-full font-bold text-[13px] hover:bg-black/5 dark:hover:bg-white/5 transition-colors">SOO</button>
        </div>
      </div>
    </div>
  );
};

const UserListView = ({ title, users, onBack }) => (
  <div className="flex flex-col h-full bg-white dark:bg-[#0B0F14] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-[16px] font-bold text-gray-900 dark:text-white flex-1 text-center -ml-6">{title}</h1>
    </div>
    <div className="flex flex-col px-4 py-4 gap-6">
      {users.map((user, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-blue-500/20 p-[2px] overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-[#111827]">
              {user.isTextAvatar ? (
                <span className="font-bold text-[16px] text-gray-900 dark:text-white">{user.initial}</span>
              ) : (
                <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt={user.user} />
              )}
            </div>
            <span className="font-medium text-gray-900 dark:text-white text-[14px]">{user.user}</span>
          </div>
          {/* Exact match for the Screenshot's gradient Visit Button */}
          <button className="bg-gradient-to-r from-[#D946EF] to-[#8B5CF6] text-white px-7 py-2 rounded-xl text-[13px] font-bold shadow-md hover:opacity-90 transition-opacity active:scale-95">
            Visit
          </button>
        </div>
      ))}
    </div>
  </div>
);

const EditProfileView = ({ onBack }) => (
  <div className="flex flex-col h-full bg-gray-50 dark:bg-[#05070A] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

    {/* Clean immersive header mapped to the screenshot */}
    <div className="relative h-[320px] w-full bg-[#111827]">
      <div className="absolute top-4 left-4 z-20">
        <IconButton icon={ChevronLeft} onClick={onBack} className="text-white drop-shadow-md" />
      </div>
      <img src={MOCK_USER.cover} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <div className="relative">
          <img src={MOCK_USER.avatar} className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-lg" alt="Edit avatar" />
          <div className="absolute bottom-1 right-1 bg-[#00D1FF] w-5 h-5 rounded-full border-2 border-[#111827]"></div>
        </div>
        <span className="text-white text-[13px] font-medium mt-3 drop-shadow-md cursor-pointer hover:underline">Edit photo</span>
        <h2 className="text-2xl font-semibold text-white tracking-tight mt-2 drop-shadow-md">{MOCK_USER.name}</h2>
        <span className="text-[14px] text-gray-300 font-medium drop-shadow-md">harioms2312@gmail.com</span>
      </div>
    </div>

    <div className="flex flex-col px-4 mt-6 gap-6 pb-12">
      {/* Personal Info */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
          <h3 className="text-[14px] font-medium text-gray-800 dark:text-gray-200">Personal Information</h3>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/[0.08] overflow-hidden shadow-sm flex flex-col">
          <EditField icon={User} label="Name" value={MOCK_USER.name} />
          <EditField icon={User} label="Username" value={MOCK_USER.username} />
          <EditField icon={Info} label="Bio" value="Not Set" />
          <EditField icon={Edit3} label="Tagline" value="Not Set" />
          <EditField icon={Calendar} label="Date of Birth" value="Not Set" />
          <EditField icon={Phone} label="Phone number" value="Not Set" />
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
          <h3 className="text-[14px] font-medium text-gray-800 dark:text-gray-200">Location</h3>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/[0.08] overflow-hidden shadow-sm flex flex-col">
          <EditField icon={MapPin} label="Location" value="" />
        </div>
      </div>
    </div>
  </div>
);

const SwitchAccountView = ({ onBack }) => (
  <div className="flex flex-col h-full bg-gray-50 dark:bg-[#05070A] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-gray-50/90 dark:bg-[#05070A]/90 backdrop-blur-xl z-20 shadow-sm border-b border-black/5 dark:border-white/[0.08]">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-[16px] font-bold text-gray-900 dark:text-white flex-1 text-center -ml-6">Switch Account Type</h1>
    </div>

    <div className="flex flex-col px-5 py-6 gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-[20px] font-bold text-gray-900 dark:text-white tracking-tight">Choose Your Account Type</h2>
        <p className="text-[13px] text-gray-500 font-medium leading-relaxed">Select the type of account that best describes you. You can change this later in settings.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative p-5 rounded-2xl bg-[#00D1FF]/5 dark:bg-[#00D1FF]/10 border-2 border-[#00D1FF] flex items-start gap-4 cursor-pointer shadow-sm">
          <div className="mt-1 flex-shrink-0">
            <User size={24} className="text-[#00D1FF]" />
          </div>
          <div className="flex flex-col flex-1 pr-6">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-gray-900 dark:text-white">Normal User</span>
              <span className="bg-[#00D1FF]/20 text-[#00D1FF] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Current</span>
            </div>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 font-medium mt-1 leading-snug">Standard account for personal use with all basic features</p>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#00D1FF] flex items-center justify-center shadow-md">
            <CheckCircle2 size={16} className="text-white" />
          </div>
        </div>

        <div className="relative p-5 rounded-2xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] flex items-start gap-4 cursor-pointer hover:border-black/20 dark:hover:border-white/20 transition-colors shadow-sm">
          <div className="mt-1 flex-shrink-0">
            <Star size={24} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex flex-col flex-1 pr-6">
            <span className="text-[15px] font-bold text-gray-900 dark:text-white">Creator</span>
            <p className="text-[13px] text-gray-500 font-medium mt-1 leading-snug">For content creators with access to monetization and analytics tools</p>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
        </div>

        <div className="relative p-5 rounded-2xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] flex items-start gap-4 cursor-pointer hover:border-black/20 dark:hover:border-white/20 transition-colors shadow-sm">
          <div className="mt-1 flex-shrink-0">
            <Tag size={24} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div className="flex flex-col flex-1 pr-6">
            <span className="text-[15px] font-bold text-gray-900 dark:text-white">Business</span>
            <p className="text-[13px] text-gray-500 font-medium mt-1 leading-snug">For businesses and brands to promote products and services</p>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
        </div>
      </div>

      <div className="mt-4 p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
          <Info size={18} />
          <span className="text-[14px] font-bold">Important Information</span>
        </div>
        <p className="text-[13px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed">You can switch between account types at any time from settings. Some features may vary based on your account type.</p>
      </div>
    </div>
  </div>
);

const HomeView = ({ onNotificationClick, onCommentClick, onCreatePostClick }) => {
  const [feedTab, setFeedTab] = useState('forYou');

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-32 bg-gray-50 dark:bg-[#05070A] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex-none sticky top-0 z-20 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl flex flex-col pt-1 border-b border-black/5 dark:border-white/[0.08] shadow-sm">

        <div className="flex justify-between items-center px-4 pt-2 pb-4">
          <h1 className="text-[22px] font-extrabold text-gray-900 dark:text-white tracking-tight">Soosial<span className="text-[#6C5CE7]">.</span></h1>

          <div className="flex-1 mx-4 flex items-center h-[38px] rounded-full border-[1.5px] border-black/10 dark:border-white/[0.15] pl-4 pr-1 bg-gray-100 dark:bg-[#0B0F14] focus-within:border-black/20 dark:focus-within:border-white/[0.3] transition-colors shadow-inner">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-[13px] text-gray-900 dark:text-white outline-none placeholder-gray-500 font-medium"
            />
            <button className="bg-gray-900 dark:bg-white h-[30px] w-[42px] rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-90 shadow-sm">
              <Search size={16} className="text-white dark:text-[#0B0F14]" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <IconButton icon={Plus} className="!p-2 bg-gray-50 dark:bg-[#111827] rounded-full border border-black/5 dark:border-white/[0.08]" onClick={onCreatePostClick} />
            <IconButton icon={Bell} notification={true} className="!p-2 bg-gray-50 dark:bg-[#111827] rounded-full border border-black/5 dark:border-white/[0.08]" onClick={onNotificationClick} />
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto px-5 pt-1 pb-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0" onClick={onCreatePostClick}>
            <div className="relative w-[66px] h-[66px] rounded-full border-[1.5px] border-dashed border-black/20 dark:border-white/[0.3] flex items-center justify-center hover:border-black/40 dark:hover:border-white/[0.7] transition-colors p-[3px]">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-100 dark:bg-transparent">
                <img src={MOCK_USER.avatar} alt="You" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Plus size={26} className="text-gray-900 dark:text-white drop-shadow-md group-hover:scale-110 transition-transform" strokeWidth={2} />
              </div>
            </div>
            <span className="text-[12px] text-gray-900 dark:text-white font-bold tracking-wide mt-0.5">Add Story</span>
          </div>

          {MOCK_USERS.filter(u => !u.isMe).map(story => (
            <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0">
              <div className="relative mt-0.5 mb-0.5">
                <img
                  src={story.avatar}
                  alt={story.user}
                  className={`w-[64px] h-[64px] rounded-full object-cover transition-transform duration-300 group-hover:scale-95 ${story.hasStory ? 'ring-[2px] ring-offset-[3px] ring-offset-white dark:ring-offset-[#0B0F14] ring-[#6C5CE7] shadow-[0_0_12px_rgba(108,92,231,0.2)] dark:shadow-[0_0_12px_rgba(108,92,231,0.4)]' : 'border-[1.5px] border-black/10 dark:border-white/[0.15]'
                    }`}
                />
                {story.hasStory && (
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#00D1FF] rounded-full border-[2.5px] border-white dark:border-[#0B0F14] shadow-sm z-10"></div>
                )}
              </div>
              <span className="text-[12px] text-gray-600 dark:text-gray-400 font-medium truncate w-[72px] text-center mt-0.5">{story.user}</span>
            </div>
          ))}
        </div>

        <div className="flex px-5 gap-6">
          <button
            onClick={() => setFeedTab('forYou')}
            className={`py-3 text-[14px] font-bold transition-all relative ${feedTab === 'forYou' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            For you
            {feedTab === 'forYou' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6C5CE7] rounded-t-full"></div>}
          </button>
          <button
            onClick={() => setFeedTab('democracy')}
            className={`py-3 text-[14px] font-bold transition-all relative ${feedTab === 'democracy' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Democracy
            {feedTab === 'democracy' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6C5CE7] rounded-t-full"></div>}
          </button>
        </div>
      </div>

      <div className="flex-none flex flex-col pt-5">
        {feedTab === 'forYou' ? (
          MOCK_POSTS.map(post => (
            <div key={post.id} className="mx-4 mb-6 bg-white dark:bg-[#0B0F14] border border-black/5 dark:border-white/[0.08] rounded-[28px] p-2.5 shadow-xl">
              <div className="flex justify-between items-center px-3 pt-2 pb-3">
                <div className="flex items-center gap-3">
                  <StoryRing hasStory={true} className="w-10 h-10 flex-shrink-0">
                    <img src={post.avatar} alt={post.user} className="w-full h-full rounded-full object-cover" />
                  </StoryRing>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight tracking-tight">{post.user}</span>
                    <span className="text-[12px] font-medium text-gray-500 mt-0.5">{post.time}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="relative group">
                <img src={post.image} alt="Post" className="w-full aspect-[4/5] object-cover rounded-[20px] border border-black/5 dark:border-white/[0.04]" />
              </div>

              <div className="flex justify-between items-center px-3 pt-4 pb-2">
                <div className="flex items-center gap-5">
                  <button className="flex items-center gap-1.5 text-gray-900 dark:text-white hover:text-rose-500 dark:hover:text-rose-500 transition-colors active:scale-90">
                    <Heart size={24} className={post.likes > 100 ? 'fill-rose-500 text-rose-500' : ''} />
                    <span className="text-[15px] font-bold">{post.likes}</span>
                  </button>
                  <button
                    onClick={() => onCommentClick(post)}
                    className="flex items-center gap-1.5 text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors active:scale-90"
                  >
                    <MessageSquare size={24} />
                    <span className="text-[15px] font-bold">12</span>
                  </button>
                  <button className="flex items-center text-gray-900 dark:text-white hover:text-[#00D1FF] transition-colors active:scale-90">
                    <Send size={24} />
                  </button>
                </div>
                <button className="text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors active:scale-90">
                  <Bookmark size={24} />
                </button>
              </div>

              <div className="px-3 pt-2 pb-2">
                <p className="text-[14px] text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                  <span className="font-bold text-gray-900 dark:text-white mr-2">{post.user}</span>
                  {post.caption}
                </p>
                <p className="text-[13px] text-[#6C5CE7] font-semibold mt-1.5">{post.tags.join(' ')}</p>
              </div>
            </div>
          ))
        ) : (
          MOCK_TWEETS.map(tweet => (
            <div key={tweet.id} className="flex gap-3 px-4 py-4 border-b border-black/5 dark:border-white/[0.08] hover:bg-black/5 dark:hover:bg-[#111827]/40 transition-colors cursor-pointer">
              <img src={tweet.avatar} alt={tweet.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-black/5 dark:border-white/[0.06]" />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[14px]">
                  <span className="font-bold text-gray-900 dark:text-white truncate tracking-tight">{tweet.name}</span>
                  <span className="text-gray-500 truncate font-medium">{tweet.username}</span>
                  <span className="text-gray-400 dark:text-gray-600">·</span>
                  <span className="text-gray-500 flex-shrink-0 font-medium">{tweet.time}</span>
                </div>
                <p className="text-[14px] text-gray-800 dark:text-gray-200 mt-1 leading-relaxed">{tweet.content}</p>
                {tweet.image && (
                  <img src={tweet.image} alt="Tweet media" className="mt-3 w-full rounded-2xl border border-black/5 dark:border-white/[0.08] object-cover max-h-[300px]" />
                )}
                <div className="flex justify-between items-center mt-3 pr-6 text-gray-500">
                  <button className="flex items-center gap-1.5 hover:text-[#00D1FF] transition-colors group active:scale-95">
                    <div className="p-1.5 -ml-1.5 rounded-full group-hover:bg-[#00D1FF]/10"><MessageSquare size={16} /></div>
                    <span className="text-[13px] font-medium">{tweet.replies}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-green-500 transition-colors group active:scale-95">
                    <div className="p-1.5 rounded-full group-hover:bg-green-500/10"><Repeat size={16} /></div>
                    <span className="text-[13px] font-medium">{tweet.reposts}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors group active:scale-95">
                    <div className="p-1.5 rounded-full group-hover:bg-rose-500/10"><Heart size={16} /></div>
                    <span className="text-[13px] font-medium">{tweet.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-[#6C5CE7] transition-colors group active:scale-95">
                    <div className="p-1.5 rounded-full group-hover:bg-[#6C5CE7]/10"><Share size={16} /></div>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const SettingsView = ({ onBack, isDarkMode, toggleDarkMode, onSwitchAccountClick }) => (
  <div className="flex flex-col h-full bg-white dark:bg-[#0B0F14] overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight ml-2 flex-1 text-center pr-6">Settings</h1>
    </div>

    <div className="flex flex-col px-4 py-6 gap-6">
      <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#111827] px-4 py-3 rounded-xl border border-black/5 dark:border-white/[0.08] shadow-inner">
        <Search className="text-gray-500 dark:text-gray-400" size={18} />
        <input type="text" placeholder="Search" className="bg-transparent border-none text-gray-900 dark:text-white outline-none w-full placeholder-gray-500 text-[14px] font-medium" />
      </div>

      <SettingsGroup title="Your account">
        <SettingsItem icon={User} label="Account" />
        <SettingsItem icon={MoreHorizontal} label="Switch Account Type" onClick={onSwitchAccountClick} />
      </SettingsGroup>

      <SettingsGroup title="How you use Soosial">
        <SettingsItem icon={Settings} label="Notification Settings" />
        <SettingsItem icon={Globe} label="Change Language" />
        <SettingsItem icon={Bookmark} label="Saved Posts" />
        <SettingsItem icon={Moon} label="Dark mode" toggle={isDarkMode} onClick={toggleDarkMode} />
      </SettingsGroup>

      <SettingsGroup title="More info and support">
        <SettingsItem icon={Shield} label="Privacy" />
        <SettingsItem icon={Info} label="FAQ" />
        <SettingsItem icon={HelpCircle} label="Help" />
      </SettingsGroup>

      <SettingsGroup title="Login">
        <SettingsItem icon={Share} label="Share" />
      </SettingsGroup>
    </div>
  </div>
);

const ProfileView = ({ onSettingsClick, isPartnership, setIsPartnership, profileColor, setProfileColor, onFollowersClick, onFollowingClick, onEditProfileClick }) => {
  const PRESET_COLORS = ['#6C5CE7', '#00D1FF', '#FF4757', '#10B981', '#FFA502'];

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-[#05070A] overflow-y-auto pb-32 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div
        className="absolute top-0 left-0 right-0 h-64 opacity-20 dark:opacity-10 pointer-events-none transition-colors duration-500"
        style={{ background: isPartnership ? `radial-gradient(circle at top right, ${profileColor}, transparent 70%)` : 'transparent' }}
      />

      <div className="flex justify-between items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
        <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white tracking-tight">Profile</div>
        <div className="flex items-center gap-4">
          <IconButton icon={Plus} />
          <IconButton icon={Settings} onClick={onSettingsClick} />
        </div>
      </div>

      <div className="flex flex-col px-4 pt-6 pb-4 gap-6 relative z-10">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col flex-1 pr-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">{MOCK_USER.name}</h1>
                {isPartnership && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white uppercase tracking-wider shadow-sm transition-colors duration-500" style={{ backgroundColor: profileColor }}>Partner</span>
                )}
              </div>
              <p className="text-[14px] font-bold mt-1 mb-2 transition-colors duration-500" style={{ color: isPartnership ? profileColor : '#6C5CE7' }}>@{MOCK_USER.username}</p>
              <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{MOCK_USER.bio}</p>
            </div>

            <div
              className="relative w-[84px] h-[84px] rounded-full p-[3px] flex-shrink-0 shadow-lg transition-all duration-500"
              style={{ background: isPartnership ? `linear-gradient(to bottom right, ${profileColor}, ${profileColor}30)` : 'linear-gradient(to top right, #6C5CE7, #00D1FF)' }}
            >
              <div className="w-full h-full rounded-full border-4 border-gray-50 dark:border-[#05070A] overflow-hidden bg-white dark:bg-[#0B0F14]">
                <img src={MOCK_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-2 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {MOCK_USER.personas.map((persona, idx) => {
              const icon = persona.split(' ')[0];
              const label = persona.split(' ').slice(1).join(' ');
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0">
                  <div className="relative w-[48px] h-[48px] rounded-full p-[2px] bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-[#111827] dark:to-[#1A2235] shadow-sm group-hover:shadow-md transition-all active:scale-95">
                    <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0F14] border border-black/5 dark:border-white/5 flex items-center justify-center">
                      <span className="text-[20px] drop-shadow-md group-hover:scale-110 transition-transform">{icon}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-gray-900 dark:text-white flex items-center gap-2"><span className="text-xl">✨</span> Partnership Account</span>
            <div
              className={`w-11 h-6 rounded-full p-0.5 flex transition-colors duration-500 shadow-inner cursor-pointer ${!isPartnership ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
              style={isPartnership ? { backgroundColor: profileColor } : {}}
              onClick={() => setIsPartnership(!isPartnership)}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isPartnership ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {isPartnership && (
            <div className="flex items-center gap-4 pt-3 border-t border-black/5 dark:border-white/[0.08] animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Profile Theme</span>
              <div className="flex gap-3">
                {PRESET_COLORS.map(color => (
                  <button key={color} onClick={() => setProfileColor(color)} className={`relative w-6 h-6 rounded-full shadow-sm transition-all duration-300 ${profileColor === color ? 'scale-125' : 'hover:scale-110'}`} style={{ backgroundColor: color }}>
                    {profileColor === color && <span className="absolute inset-0 rounded-full border-2 border-white dark:border-[#111827] shadow-[0_0_0_2px_currentColor]" style={{ color }} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex flex-col items-center">
            <span className="font-bold text-[18px] text-gray-900 dark:text-white tracking-tight">{MOCK_USER.posts}</span>
            <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Posts</span>
          </div>
          <div className="w-[1px] h-8 bg-black/10 dark:bg-white/[0.1]"></div>
          <div className="flex flex-col items-center cursor-pointer hover:opacity-70 transition-opacity" onClick={onFollowersClick}>
            <span className="font-bold text-[18px] text-gray-900 dark:text-white tracking-tight">{MOCK_USER.followers}</span>
            <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Followers</span>
          </div>
          <div className="w-[1px] h-8 bg-black/10 dark:bg-white/[0.1]"></div>
          <div className="flex flex-col items-center cursor-pointer hover:opacity-70 transition-opacity" onClick={onFollowingClick}>
            <span className="font-bold text-[18px] text-gray-900 dark:text-white tracking-tight">{MOCK_USER.following}</span>
            <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Following</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onEditProfileClick}
            className="flex-1 rounded-xl font-bold py-2.5 text-[14px] active:scale-[0.98] transition-all duration-500 shadow-md text-white"
            style={{ backgroundColor: isPartnership ? profileColor : (document.documentElement.classList.contains('dark') ? '#ffffff' : '#0B0F14'), color: (isPartnership || !document.documentElement.classList.contains('dark')) ? '#ffffff' : '#0B0F14' }}
          >
            Edit profile
          </button>
          <button className="flex-1 bg-white dark:bg-[#111827] rounded-xl font-bold text-gray-900 dark:text-white py-2.5 text-[14px] border border-black/10 dark:border-white/[0.08] hover:bg-gray-50 dark:active:bg-[#1A2235] transition-colors shadow-sm">
            Share profile
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 relative z-10">
        <div className="flex bg-white dark:bg-[#111827] p-1 rounded-xl border border-black/5 dark:border-white/[0.08] shadow-inner">
          <button className="flex-1 py-2 flex justify-center items-center gap-2 bg-gray-100 dark:bg-[#1A2235] rounded-lg shadow-sm text-gray-900 dark:text-white transition-all"><Grid size={18} /><span className="text-[13px] font-bold">Posts</span></button>
          <button className="flex-1 py-2 flex justify-center items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all font-bold"><Tag size={18} /><span className="text-[13px]">Tagged</span></button>
        </div>
      </div>
    </div>
  );
};

// --- Main Layout Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeChat, setActiveChat] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activePostComments, setActivePostComments] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // New Modal States
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);

  // Partnership Profile State
  const [isPartnership, setIsPartnership] = useState(false);
  const [profileColor, setProfileColor] = useState('#00D1FF');

  const renderContent = () => {
    // Top-level modals
    if (showCreatePost) return <CreatePostView onBack={() => setShowCreatePost(false)} />;
    if (showSwitchAccount) return <SwitchAccountView onBack={() => setShowSwitchAccount(false)} />;
    if (showFollowers) return <UserListView title="Followers" users={MOCK_USERS.filter(u => !u.isMe)} onBack={() => setShowFollowers(false)} />;
    if (showFollowing) return <UserListView title="Following" users={MOCK_USERS.filter(u => !u.isMe)} onBack={() => setShowFollowing(false)} />;
    if (showEditProfile) return <EditProfileView onBack={() => setShowEditProfile(false)} />;
    if (showNotifications) return <NotificationsView onBack={() => setShowNotifications(false)} />;
    if (showSettings) return <SettingsView onBack={() => setShowSettings(false)} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} onSwitchAccountClick={() => setShowSwitchAccount(true)} />;
    if (activeChat) return <ChatDetailView chat={activeChat} onBack={() => setActiveChat(null)} />;

    switch (activeTab) {
      case 'home': return <HomeView onNotificationClick={() => setShowNotifications(true)} onCommentClick={setActivePostComments} onCreatePostClick={() => setShowCreatePost(true)} />;
      case 'soos': return <SoosView />;
      case 'chats': return <ChatsListView onChatSelect={setActiveChat} />;
      case 'profile': return <ProfileView
        onSettingsClick={() => setShowSettings(true)}
        isPartnership={isPartnership}
        setIsPartnership={setIsPartnership}
        profileColor={profileColor}
        setProfileColor={setProfileColor}
        onFollowersClick={() => setShowFollowers(true)}
        onFollowingClick={() => setShowFollowing(true)}
        onEditProfileClick={() => setShowEditProfile(true)}
      />;
      default: return <HomeView onNotificationClick={() => setShowNotifications(true)} onCommentClick={setActivePostComments} onCreatePostClick={() => setShowCreatePost(true)} />;
    }
  };

  const navItems = [
    { id: 'home', icon: Home },
    { id: 'soos', icon: Clapperboard },
    { id: 'chats', icon: MessageCircleMore },
    { id: 'profile', isAvatar: true },
  ];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} bg-gray-200 dark:bg-black w-full min-h-screen flex justify-center items-center font-sans tracking-tight selection:bg-[#6C5CE7]/30 antialiased transition-colors duration-300`}>
      <div className="w-full max-w-[430px] h-[100dvh] sm:h-[932px] sm:rounded-[3rem] sm:border-[8px] border-gray-300 dark:border-[#111827] overflow-hidden relative shadow-2xl bg-gray-50 dark:bg-[#05070A] flex flex-col transition-colors duration-300">

        <div className="flex-1 overflow-hidden relative z-0 flex flex-col">
          {renderContent()}
        </div>

        {/* Floating Blurred Pill Navbar */}
        {!activeChat && !showSettings && !showNotifications && !activePostComments && !showCreatePost && !showEditProfile && !showFollowers && !showFollowing && !showSwitchAccount && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none px-6">
            <nav className="pointer-events-auto bg-white/30 dark:bg-[#111827]/30 border border-white/50 dark:border-white/[0.15] rounded-full flex justify-between items-center px-5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] w-full max-w-[280px] gap-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;

                if (item.isAvatar) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className="p-1 flex flex-col items-center justify-center transition-transform active:scale-90 relative"
                    >
                      <div className={`rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'ring-[2px] ring-offset-[2px] ring-offset-white dark:ring-offset-[#0B0F14] ring-[#6C5CE7] shadow-[0_0_10px_rgba(108,92,231,0.2)] dark:shadow-[0_0_10px_rgba(108,92,231,0.4)]' : ''}`}>
                        <img
                          src={MOCK_USER.avatar}
                          alt="Profile"
                          className={`w-[24px] h-[24px] rounded-full object-cover transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                        />
                      </div>
                    </button>
                  );
                }

                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="p-2 flex flex-col items-center justify-center transition-transform active:scale-90 relative"
                  >
                    <Icon
                      size={24}
                      className={isActive ? 'text-gray-900 dark:text-white drop-shadow-md' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors'}
                      strokeWidth={isActive ? 2.5 : 2}
                      fill={isActive ? 'currentColor' : 'none'}
                    />
                    <span className={`absolute -bottom-1.5 w-1 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-[#6C5CE7] dark:bg-[#00D1FF] shadow-[0_0_6px_#6C5CE7] dark:shadow-[0_0_6px_#00D1FF] opacity-100 scale-100' : 'bg-transparent opacity-0 scale-0'}`}></span>
                  </button>
                )
              })}
            </nav>
          </div>
        )}

        {/* Comments Overlay Modal */}
        {activePostComments && (
          <div className="absolute inset-0 z-[200] flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-opacity" onClick={() => setActivePostComments(null)}></div>

            <div className="relative bg-white/40 dark:bg-[#05070A]/50 w-full h-[75%] rounded-t-[2.5rem] border-t border-black/10 dark:border-white/[0.1] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
              <div className="flex justify-center pt-3 pb-2 w-full absolute top-0 z-10 cursor-pointer" onClick={() => setActivePostComments(null)}>
                <div className="w-12 h-1.5 bg-gray-400 dark:bg-white/30 rounded-full shadow-sm"></div>
              </div>

              <div className="flex justify-between items-center px-6 pt-8 pb-4 border-b border-black/10 dark:border-white/[0.08]">
                <h2 className="text-[16px] font-bold text-gray-900 dark:text-white tracking-tight drop-shadow-sm">Comments</h2>
                <IconButton icon={X} onClick={() => setActivePostComments(null)} className="!p-1.5 bg-white/30 dark:bg-white/10 rounded-full hover:bg-white/50 dark:hover:bg-white/20" />
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {MOCK_COMMENTS.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img src={comment.avatar} alt={comment.user} className="w-9 h-9 rounded-full object-cover border border-black/5 dark:border-white/[0.06] flex-shrink-0 shadow-sm" />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-gray-900 dark:text-white drop-shadow-sm">{comment.user}</span>
                        <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300 drop-shadow-sm">{comment.time}</span>
                      </div>

                      {comment.isVoice ? (
                        <div className="flex items-center gap-2 bg-white/50 dark:bg-[#6C5CE7]/20 border border-white/50 dark:border-[#6C5CE7]/30 rounded-full px-3 py-1.5 w-max mt-1.5 cursor-pointer hover:bg-white/70 dark:hover:bg-[#6C5CE7]/30 transition-colors shadow-sm">
                          <Play size={14} className="text-[#6C5CE7] dark:text-[#00D1FF] fill-current drop-shadow-sm" />
                          <div className="w-16 h-1 bg-black/10 dark:bg-[#6C5CE7]/30 rounded-full overflow-hidden flex">
                            <div className="w-1/3 h-full bg-[#6C5CE7] dark:bg-[#00D1FF] rounded-full"></div>
                          </div>
                          <span className="text-[12px] text-[#6C5CE7] dark:text-[#00D1FF] font-bold drop-shadow-sm">{comment.duration}</span>
                        </div>
                      ) : (
                        <p className="text-[14px] text-gray-800 dark:text-gray-100 mt-0.5 leading-snug font-medium drop-shadow-sm">{comment.text}</p>
                      )}

                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-[12px] font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors drop-shadow-sm">Reply</button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-1">
                      <Heart size={14} className="text-gray-600 dark:text-gray-400 hover:text-rose-500 cursor-pointer transition-colors drop-shadow-sm" />
                      <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 drop-shadow-sm">{comment.likes}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-4 bg-transparent border-t border-black/10 dark:border-white/[0.08] pb-8">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-[#111827]/50 rounded-full p-1.5 border border-black/10 dark:border-white/[0.1] focus-within:border-black/30 dark:focus-within:border-white/[0.3] transition-colors shadow-sm">
                  <img src={MOCK_USER.avatar} className="w-8 h-8 rounded-full object-cover ml-1 border border-white/20" alt="You" />
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-transparent text-gray-900 dark:text-white text-[14px] outline-none placeholder-gray-600 dark:placeholder-gray-300 font-bold px-2 drop-shadow-sm"
                  />
                  <button className="p-2.5 bg-white/60 dark:bg-[#1A2235]/80 rounded-full flex-shrink-0 text-[#6C5CE7] dark:text-[#00D1FF] hover:bg-white/80 dark:hover:bg-white/20 transition-colors shadow-sm active:scale-90">
                    <Mic size={18} />
                  </button>
                  <button className="p-2.5 bg-[#6C5CE7] rounded-full flex-shrink-0 text-white hover:bg-[#5a4cdb] transition-colors shadow-md active:scale-90">
                    <Send size={18} className="-ml-0.5 mt-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-1.5 bg-black/20 dark:bg-white/20 rounded-full z-[100] pointer-events-none" />
      </div>
    </div>
  );
}