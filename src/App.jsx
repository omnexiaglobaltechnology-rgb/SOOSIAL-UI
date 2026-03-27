import React, { useState, useEffect } from 'react';
import {
  Bell, Bookmark, Calendar, CheckCircle2, ChevronLeft, Clapperboard, Compass, Edit3, Globe, Grid, Heart, HelpCircle, Home, Image, Info, LogOut, MapPin, MessageCircle, MessageCircleMore, MessageSquare, Mic, Moon, MoreHorizontal, MoreVertical, Phone, PhoneCall, PhoneIncoming, PhoneMissed, Play, Plus, Repeat, Search, Send, Settings, Share, Shield, Star, Tag, User, UserX, Video, VideoOff, X
} from 'lucide-react';

// --- Shared UI Components ---
const IconButton = ({ icon: Icon, active, onClick, className = '', notification }) => (
  <button onClick={onClick} className={`relative flex items-center justify-center transition-transform active:scale-90 ${active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'} ${className}`}>
    <Icon size={24} strokeWidth={active ? 2.5 : 2} className={active ? 'fill-current' : ''} />
    {notification && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#6C5CE7] border-2 border-white dark:border-[#0B0F14] rounded-full shadow-sm"></span>}
  </button>
);

const SettingsGroup = ({ title, children }) => (
  <div className="flex flex-col gap-2 mb-4">
    <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1 mb-1">{title}</h2>
    <div className="bg-gray-100 dark:bg-[#111827] rounded-2xl overflow-hidden shadow-sm">{children}</div>
  </div>
);

const SettingsItem = ({ icon: Icon, label, onClick, toggle, iconBg }) => (
  <div className="w-full flex items-center justify-between p-4 border-b border-black/5 dark:border-white/[0.04] last:border-0 active:bg-gray-200 dark:active:bg-[#1A2235] transition-colors cursor-pointer" onClick={onClick}>
    <div className="flex items-center gap-4">
      {iconBg ? (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}><Icon size={20} /></div>
      ) : <Icon size={20} className="text-gray-900 dark:text-white" />}
      <span className="text-gray-900 dark:text-white text-[15px] font-medium">{label}</span>
    </div>
    {toggle !== undefined ? (
      <div className={`w-11 h-6 rounded-full p-0.5 flex transition-colors duration-300 shadow-inner ${toggle ? 'bg-[#6C5CE7]' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${toggle ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
    ) : <ChevronLeft size={18} className="text-gray-400 rotate-180" />}
  </div>
);

const EditField = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/[0.04] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1A2235] transition-colors last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-sm">
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

const StoryRing = ({ children, hasStory, className = '' }) => (
  <div className={`relative rounded-full flex items-center justify-center transition-all ${hasStory ? 'ring-[2px] ring-offset-[3px] ring-offset-white dark:ring-offset-[#0B0F14] ring-[#6C5CE7] shadow-sm' : 'border-[1.5px] border-black/10 dark:border-white/[0.1]'} ${className}`}>
    {children}
  </div>
);

// --- Compressed Data ---
const IMG1 = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop';
const IMG2 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop';
const IMG3 = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop';
const COV1 = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop';
const PST1 = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop';

const MOCK_USER = { username: 'hariomsingh', name: 'HARIOM SINGH', avatar: IMG1, cover: COV1, posts: 0, followers: 6, following: 6, bio: 'Digital Creator • UI/UX', personas: ['🎨 Creative', '☕ Coffee Addict', '💻 Tech Geek'] };
const MOCK_USERS = [{ id: 1, user: 'Your Story', avatar: IMG1, isMe: true }, { id: 2, user: 'raw_aadiii25', avatar: IMG2, hasStory: true }, { id: 3, user: 'arice', avatar: IMG3, hasStory: false }, { id: 4, user: 'jiteshpal1602', isTextAvatar: true, initial: 'J', hasStory: false }];
const MOCK_POSTS = [{ id: 1, user: 'gunjan', avatar: IMG2, image: PST1, caption: 'Not perfect, but progress 🐎', tags: ['#ArtProgress', '#Sketch'], time: '10 hours ago', likes: 124 }];
const MOCK_TWEETS = [{ id: 1, name: 'Alex Developer', username: '@alex_dev', avatar: IMG2, content: 'Glassmorphism is back in! 🚀', time: '2h', replies: 45, reposts: 12, likes: 342 }];
const MOCK_CHATS = [
  { id: 1, name: 'omnexia technology', msg: 'Hey, when are we meeting?', time: 'Wed', unread: 1, avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop', hasStory: true },
  { id: 2, name: 'daphnelahi7757', msg: 'Call me when you are free', time: 'Mar 09', unread: 0, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop', hasStory: false },
  { id: 3, name: 'kiara_singh_1242', msg: 'Sounds good to me.', time: 'Wed', unread: 0, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', hasStory: true },
  { id: 4, name: 'arice', msg: 'Sent an attachment', time: 'Mon', unread: 0, avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop', hasStory: false },
  { id: 5, name: 'raw_aadiii25', msg: 'Check this design 🎨', time: 'Tue', unread: 2, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', hasStory: true },
  { id: 6, name: 'alex_dev', msg: 'Pushed the latest build ✅', time: 'Sun', unread: 0, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', hasStory: false },
  { id: 7, name: 'tech_insider', msg: 'Have you seen the new update?', time: 'Sat', unread: 0, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop', hasStory: true },
  { id: 8, name: 'ganeshkgp', msg: '📸 Shared a photo', time: 'Fri', unread: 3, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', hasStory: false },
];

const MOCK_FOLLOWERS = [
  { id: 1, user: 'raw_aadiii25', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop' },
  { id: 2, user: 'arice', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop' },
  { id: 3, user: 'jiteshpal1602', isTextAvatar: true, initial: 'J' },
  { id: 4, user: 'rayyankha9087', isTextAvatar: true, initial: 'R' },
  { id: 5, user: 'vishal', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
  { id: 6, user: 'kiara_singh_1242', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
];

const MOCK_FOLLOWING = [
  { id: 1, user: 'omnexia_tech', avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop' },
  { id: 2, user: 'gunjan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
  { id: 3, user: 'alex_dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  { id: 4, user: 'tech_insider', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' },
  { id: 5, user: 'ganeshkgp', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { id: 6, user: 'kiara_singh_1242', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
];

const MOCK_PULSE_POSTS = [
  {
    id: 1,
    name: 'Alex Developer',
    username: '@alex_dev',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    content: 'Just deployed the new UI. Solid minimal design is back. What do you guys think? 🚀',
    time: '2h',
    likes: 342,
    comments: 45,
  },
  {
    id: 2,
    name: 'Tech Insider',
    username: '@tech_insider',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop',
    content: 'New design systems are prioritizing speed and usability over heavy visual effects. The landscape is shifting rapidly. #TechNews',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
    time: '4h',
    likes: 1205,
    comments: 128,
  },
  {
    id: 3,
    name: 'Ganesh KGP',
    username: '@ganeshkgp',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    content: 'Built this short clip of our campus sunset 🌅 what a view!',
    isVideo: true,
    videoThumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
    videoDuration: '0:12',
    time: '6h',
    likes: 89,
    comments: 14,
  },
];
const MOCK_COMMENTS = [{ id: 1, user: 'alex_dev', avatar: IMG2, text: 'This looks incredibly clean! 🔥', time: '2h', likes: 12 }];
const PULSE_CHANNELS = [{ id: 1, name: 'Global Tech Trends', members: '1.2M', icon: Globe }, { id: 2, name: 'Design Innovations', members: '850K', icon: Edit3 }];
const MOCK_NOTIFICATIONS = [{ id: 1, user: 'raw_aadiii25', avatar: IMG2, action: 'started following you', time: '3 hours' }];
const MOCK_ACTIVE_USERS = [
  { id: 1, name: 'omnexia', avatar: IMG1, online: true },
  { id: 2, name: 'yash-pat...', avatar: IMG2, online: true },
  { id: 3, name: 'thakur_a...', avatar: IMG3, online: true },
  { id: 4, name: 'darkside', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', online: true },
  { id: 5, name: 'arice', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop', online: true },
];
const MOCK_REQUESTS = [
  { id: 1, name: 'thakur_abhaysingh04_', msg: 'Hey, I would like to connect!', time: '21-Feb-2026', avatar: IMG3 },
  { id: 2, name: 'yash-pathik', msg: 'Sent you a chat request', time: '19-Feb-2026', avatar: IMG2 },
];

// --- Sub-Views ---

const CreatePostView = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('recent');
  const [selectedChannel, setSelectedChannel] = useState(1);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0B0F14] overflow-hidden relative">
      <div className="flex justify-between items-center px-4 py-3 border-b border-black/5 dark:border-white/[0.08] z-10 bg-white dark:bg-[#0B0F14]">
        <IconButton icon={X} onClick={onBack} className="-ml-2" />
        <h1 className="text-[16px] font-bold text-gray-900 dark:text-white flex-1 text-center">New Post</h1>
        <button className="bg-[#00D1FF] text-white px-5 py-1.5 rounded-full text-[14px] font-bold shadow-md hover:bg-blue-400">Next</button>
      </div>
      <div className="flex px-5 py-3 gap-6 border-b border-black/5 dark:border-white/[0.04] z-10 bg-white dark:bg-[#0B0F14]">
        <button onClick={() => setActiveTab('recent')} className={`text-[14px] font-bold pb-1 ${activeTab === 'recent' ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white' : 'text-gray-500'}`}>For you</button>
        <button onClick={() => setActiveTab('pulse')} className={`text-[14px] font-bold pb-1 ${activeTab === 'pulse' ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white' : 'text-gray-500'}`}>Pulse</button>
      </div>

      {activeTab === 'recent' ? (
        <div className="flex-1 overflow-y-auto">
          <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-800">
            <img src={MOCK_USER.avatar} className="w-full h-full object-cover" alt="Preview" />
            <div className="absolute inset-0 flex flex-col justify-evenly pointer-events-none z-10"><div className="w-full h-[1px] bg-white/40"></div><div className="w-full h-[1px] bg-white/40"></div></div>
            <div className="absolute inset-0 flex justify-evenly pointer-events-none z-10"><div className="w-[1px] h-full bg-white/40"></div><div className="w-[1px] h-full bg-white/40"></div></div>
          </div>
          <div className="grid grid-cols-4 gap-0.5 pb-24">
            {Array(8).fill(PST1).map((img, idx) => (<div key={idx} className="aspect-square bg-gray-200 dark:bg-gray-800"><img src={img} className="w-full h-full object-cover" alt="Gallery" /></div>))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#05070A] p-5 pb-32">
          <div className="bg-white dark:bg-[#111827] rounded-[28px] border border-black/5 dark:border-white/[0.08] p-5 shadow-sm flex flex-col gap-5">
            <div className="flex gap-4">
              <img src={MOCK_USER.avatar} className="w-12 h-12 rounded-full object-cover border border-black/5" alt="Me" />
              <textarea 
                placeholder="What's happening in the community?" 
                className="flex-1 bg-transparent text-gray-900 dark:text-white outline-none resize-none text-[15px] font-medium min-h-[120px]"
              />
            </div>
            
            <div className="relative group rounded-[20px] overflow-hidden bg-gray-100 dark:bg-[#0B0F14] border border-dashed border-black/10 dark:border-white/10 aspect-video flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-200/50 dark:hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#6C5CE7]/10 dark:bg-[#00D1FF]/10 flex items-center justify-center text-[#6C5CE7] dark:text-[#00D1FF]">
                <Plus size={24} />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[14px] font-bold text-gray-900 dark:text-white">Add Image or Video</span>
                <span className="text-[11px] font-medium text-gray-500 mt-0.5">Videos must be less than 15 seconds</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-4 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 text-[13px] font-bold"><MapPin size={16} /> Location</button>
              <button className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-4 py-2.5 rounded-xl text-gray-700 dark:text-gray-300 text-[13px] font-bold"><Tag size={16} /> Tag people</button>
            </div>
          </div>
        </div>
      )}

      {/* Resized Glassmorphism 30% Post Options */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <div className="pointer-events-auto bg-black/10 dark:bg-white/10 backdrop-blur-xl rounded-full p-1.5 flex items-center border border-white/30 dark:border-white/20 shadow-lg gap-1">
          {activeTab === 'recent' ? (
            <>
              <button className="bg-white/40 dark:bg-white/20 text-gray-900 dark:text-white px-5 py-2 rounded-full font-bold text-[13px] shadow-sm backdrop-blur-md">POST</button>
              <button className="text-gray-800 dark:text-gray-200 px-5 py-2 rounded-full font-bold text-[13px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors">STORY</button>
              <button className="text-gray-800 dark:text-gray-200 px-5 py-2 rounded-full font-bold text-[13px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors">SOOS</button>
            </>
          ) : (
            <button className="bg-white/40 dark:bg-white/20 text-gray-900 dark:text-white px-8 py-2 rounded-full font-bold text-[13px] shadow-sm backdrop-blur-md tracking-wide">POST TO PULSE</button>
          )}
        </div>
      </div>
    </div>
  );
};

const UserListView = ({ title, users, onBack }) => (
  <div className="flex flex-col h-full bg-white dark:bg-[#0B0F14] overflow-y-auto [&::-webkit-scrollbar]:hidden">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-[16px] font-bold text-gray-900 dark:text-white flex-1 text-center -ml-6">{title}</h1>
    </div>
    <div className="flex flex-col px-4 py-4 gap-6">
      {users.map((u, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-black/5 dark:border-white/10 p-[2px] flex items-center justify-center bg-gray-50 dark:bg-[#111827]">
              {u.isTextAvatar ? <span className="font-bold text-[16px] text-gray-900 dark:text-white">{u.initial}</span> : <img src={u.avatar} className="w-full h-full rounded-full object-cover" alt={u.user} />}
            </div>
            <span className="font-medium text-gray-900 dark:text-white text-[14px]">{u.user}</span>
          </div>
          {/* Screenshot Gradient Visit Button */}
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-7 py-2 rounded-[14px] text-[13px] font-bold shadow-md hover:opacity-90 active:scale-95 transition-all">Visit</button>
        </div>
      ))}
    </div>
  </div>
);

const EditProfileView = ({ onBack }) => (
  <div className="flex flex-col h-full bg-gray-50 dark:bg-[#05070A] overflow-y-auto [&::-webkit-scrollbar]:hidden">
    <div className="relative h-[320px] w-full bg-[#111827]">
      <div className="absolute top-4 left-4 z-20"><IconButton icon={ChevronLeft} onClick={onBack} className="text-white drop-shadow-md" /></div>
      <img src={MOCK_USER.cover} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
        <div className="relative">
          <img src={MOCK_USER.avatar} className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-lg" alt="Avatar" />
          <div className="absolute bottom-1 right-1 bg-[#00D1FF] w-5 h-5 rounded-full border-2 border-[#111827]"></div>
        </div>
        <span className="text-white text-[13px] font-medium mt-3 drop-shadow-md cursor-pointer hover:underline">Edit photo</span>
        <h2 className="text-2xl font-semibold text-white tracking-tight mt-2 drop-shadow-md">{MOCK_USER.name}</h2>
        <span className="text-[14px] text-gray-300 font-medium drop-shadow-md">harioms2312@gmail.com</span>
      </div>
    </div>
    {/* Screenshot Icons & Groups */}
    <div className="flex flex-col px-4 mt-6 gap-6 pb-12">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1"><div className="w-1 h-4 bg-purple-600 rounded-full"></div><h3 className="text-[14px] font-medium text-gray-800 dark:text-gray-200">Personal Information</h3></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/[0.08] overflow-hidden shadow-sm">
          <EditField icon={User} label="Name" value={MOCK_USER.name} />
          <EditField icon={User} label="Username" value={MOCK_USER.username} />
          <EditField icon={Info} label="Bio" value="Not Set" />
          <EditField icon={Edit3} label="Tagline" value="Not Set" />
          <EditField icon={Calendar} label="Date of Birth" value="Not Set" />
          <EditField icon={Phone} label="Phone number" value="Not Set" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1"><div className="w-1 h-4 bg-purple-600 rounded-full"></div><h3 className="text-[14px] font-medium text-gray-800 dark:text-gray-200">Location</h3></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/[0.08] overflow-hidden shadow-sm">
          <EditField icon={MapPin} label="Location" value="" />
        </div>
      </div>
    </div>
  </div>
);

const SwitchAccountView = ({ onBack }) => (
  <div className="flex flex-col h-full bg-gray-50 dark:bg-[#05070A] overflow-y-auto [&::-webkit-scrollbar]:hidden">
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
          <div className="mt-1 flex-shrink-0"><User size={24} className="text-[#00D1FF]" /></div>
          <div className="flex flex-col flex-1 pr-6">
            <div className="flex items-center gap-2"><span className="text-[15px] font-bold text-gray-900 dark:text-white">Normal User</span><span className="bg-[#00D1FF]/20 text-[#00D1FF] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">Current</span></div>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 font-medium mt-1 leading-snug">Standard account for personal use with all basic features</p>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#00D1FF] flex items-center justify-center shadow-md"><CheckCircle2 size={16} className="text-white" /></div>
        </div>
        <div className="relative p-5 rounded-2xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] flex items-start gap-4 cursor-pointer hover:border-black/20 transition-colors shadow-sm">
          <div className="mt-1 flex-shrink-0"><Star size={24} className="text-gray-500" /></div>
          <div className="flex flex-col flex-1 pr-6">
            <span className="text-[15px] font-bold text-gray-900 dark:text-white">Creator</span>
            <p className="text-[13px] text-gray-500 font-medium mt-1 leading-snug">For content creators with access to monetization and analytics tools</p>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative p-5 rounded-2xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] flex items-start gap-4 cursor-pointer hover:border-black/20 transition-colors shadow-sm">
          <div className="mt-1 flex-shrink-0"><Tag size={24} className="text-gray-500" /></div>
          <div className="flex flex-col flex-1 pr-6">
            <span className="text-[15px] font-bold text-gray-900 dark:text-white">Business</span>
            <p className="text-[13px] text-gray-500 font-medium mt-1 leading-snug">For businesses and brands to promote products and services</p>
          </div>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
        </div>
      </div>
      <div className="mt-4 p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400"><Info size={18} /><span className="text-[14px] font-bold">Important Information</span></div>
        <p className="text-[13px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed">You can switch between account types at any time from settings. Some features may vary based on your account type.</p>
      </div>
    </div>
  </div>
);

const AccountSettingsView = ({ onBack }) => (
  <div className="flex flex-col h-full bg-gray-50 dark:bg-[#05070A] overflow-y-auto [&::-webkit-scrollbar]:hidden">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-gray-50/90 dark:bg-[#05070A]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight ml-2 flex-1 text-center pr-6">Account</h1>
    </div>
    <div className="flex flex-col px-4 py-6 gap-2">
      <div className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-sm border border-black/5 dark:border-white/[0.08]">
        <SettingsItem icon={UserX} label="Blocked User" onClick={() => { }} iconBg="bg-blue-100 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400" />
      </div>
    </div>
  </div>
);

const LanguageSettingsView = ({ onBack }) => {
  const languages = ['English', 'Hindi', 'Telugu', 'Bengali', 'Marathi', 'Tamil', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'];
  const [selected, setSelected] = useState('English');
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-[#05070A] overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center px-4 py-4 sticky top-0 bg-gray-50/90 dark:bg-[#05070A]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
        <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight ml-2 flex-1 text-center pr-6">Change Language</h1>
      </div>
      <div className="flex flex-col px-4 py-4 gap-1">
        <div className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-sm border border-black/5 dark:border-white/[0.08] flex flex-col">
          {languages.map(lang => (
            <button key={lang} onClick={() => setSelected(lang)} className="w-full flex items-center justify-between p-4 border-b border-black/5 dark:border-white/[0.04] last:border-0 active:bg-gray-50 dark:active:bg-[#1A2235] transition-colors">
              <span className="text-[15px] font-medium text-gray-900 dark:text-white">{lang}</span>
              {selected === lang && <CheckCircle2 size={20} className="text-[#00D1FF]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const SettingsView = ({ onBack, isDarkMode, toggleDarkMode, onSwitchAccountClick, onAccountClick, onLanguageClick }) => (
  <div className="flex flex-col h-full bg-white dark:bg-[#0B0F14] overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight ml-2 flex-1 text-center pr-6">Settings</h1>
    </div>
    <div className="flex flex-col px-4 py-6 gap-6">
      <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#111827] px-4 py-3 rounded-xl border border-black/5 shadow-inner">
        <Search className="text-gray-500" size={18} />
        <input type="text" placeholder="Search" className="bg-transparent border-none text-gray-900 dark:text-white outline-none w-full placeholder-gray-500 text-[14px]" />
      </div>
      <SettingsGroup title="Your account">
        <SettingsItem icon={User} label="Account" onClick={onAccountClick} />
        <SettingsItem icon={MoreHorizontal} label="Switch Account Type" onClick={onSwitchAccountClick} />
      </SettingsGroup>
      <SettingsGroup title="How you use Soosial">
        <SettingsItem icon={Settings} label="Notification Settings" />
        <SettingsItem icon={Globe} label="Change Language" onClick={onLanguageClick} />
        <SettingsItem icon={Bookmark} label="Saved Posts" />
        <SettingsItem icon={Moon} label="Dark mode" toggle={isDarkMode} onClick={toggleDarkMode} />
      </SettingsGroup>
      <SettingsGroup title="More info and support">
        <SettingsItem icon={Shield} label="Privacy" />
        <SettingsItem icon={Info} label="FAQ" />
        <SettingsItem icon={HelpCircle} label="Help" />
      </SettingsGroup>
    </div>
  </div>
);

const HomeView = ({ onNotificationClick, onCommentClick }) => {
  const [feedTab, setFeedTab] = useState('forYou');
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-32 bg-gray-50 dark:bg-[#05070A] [&::-webkit-scrollbar]:hidden">
      <div className="flex-none sticky top-0 z-20 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl flex flex-col pt-1 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
        <div className="flex justify-between items-center px-4 pt-2 pb-4">
          <h1 className="text-[22px] font-extrabold text-gray-900 dark:text-white tracking-tight">Soosial<span className="text-[#6C5CE7]">.</span></h1>
          <div className="flex-1 mx-4 flex items-center h-[38px] rounded-full border-[1.5px] border-black/10 dark:border-white/[0.15] pl-4 pr-1 bg-gray-100 dark:bg-[#0B0F14] focus-within:border-black/20 transition-colors shadow-inner">
            <input type="text" placeholder="Search..." className="w-full bg-transparent text-[13px] text-gray-900 dark:text-white outline-none placeholder-gray-500 font-medium" />
            <button className="bg-gray-900 dark:bg-white h-[30px] w-[42px] rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-90 shadow-sm"><Search size={16} className="text-white dark:text-[#0B0F14]" strokeWidth={2.5} /></button>
          </div>
          <div className="flex items-center gap-2"><IconButton icon={Bell} notification={true} className="!p-2 bg-gray-50 dark:bg-[#111827] rounded-full border border-black/5" onClick={onNotificationClick} /></div>
        </div>
        
        {/* Hide stories in Democracy tab */}
        {feedTab === 'forYou' && (
          <div className="flex gap-5 overflow-x-auto px-5 pt-1 pb-5 [&::-webkit-scrollbar]:hidden">
            {MOCK_USERS.map(story => (
              <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0">
                <div className="relative mt-0.5 mb-0.5">
                  <img src={story.avatar} className={`w-[64px] h-[64px] rounded-full object-cover transition-transform duration-300 group-hover:scale-95 ${story.hasStory ? 'ring-[2px] ring-offset-[3px] ring-offset-white dark:ring-offset-[#0B0F14] ring-[#6C5CE7] shadow-sm' : 'border-[1.5px] border-black/10 dark:border-white/[0.15]'}`} />
                  {story.hasStory && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#00D1FF] rounded-full border-[2.5px] border-white dark:border-[#0B0F14] shadow-sm z-10"></div>}
                  {story.isMe && <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full"><Plus className="text-white drop-shadow-md" size={24} /></div>}
                </div>
                <span className="text-[12px] text-gray-600 dark:text-gray-400 font-medium truncate w-[72px] text-center mt-0.5">{story.user}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex px-5 gap-6">
          <button onClick={() => setFeedTab('forYou')} className={`py-3 text-[14px] font-bold transition-all relative ${feedTab === 'forYou' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'}`}>For you{feedTab === 'forYou' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6C5CE7] rounded-t-full"></div>}</button>
          <button onClick={() => setFeedTab('pulse')} className={`py-3 text-[14px] font-bold transition-all relative ${feedTab === 'pulse' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'}`}>Pulse{feedTab === 'pulse' && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6C5CE7] rounded-t-full"></div>}</button>
        </div>
      </div>
      <div className="flex-none flex flex-col pt-5">
        {feedTab === 'forYou' ? MOCK_POSTS.map(post => (
          <div key={post.id} className="mx-4 mb-6 bg-white dark:bg-[#0B0F14] border border-black/5 dark:border-white/[0.08] rounded-[28px] p-2.5 shadow-xl">
            <div className="flex justify-between items-center px-3 pt-2 pb-3">
              <div className="flex items-center gap-3">
                <StoryRing hasStory={true} className="w-10 h-10 flex-shrink-0"><img src={post.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" /></StoryRing>
                <div className="flex flex-col"><span className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight tracking-tight">{post.user}</span><span className="text-[12px] font-medium text-gray-500 mt-0.5">{post.time}</span></div>
              </div>
              <button className="text-gray-400 p-2 hover:bg-black/5 rounded-full"><MoreVertical size={20} /></button>
            </div>
            <div className="relative group"><img src={post.image} alt="Post" className="w-full aspect-[4/5] object-cover rounded-[20px] border border-black/5 dark:border-white/[0.04]" /></div>
            <div className="flex justify-between items-center px-3 pt-4 pb-2">
              <div className="flex items-center gap-5">
                <button className="flex items-center gap-1.5 text-gray-900 dark:text-white active:scale-90"><Heart size={24} className={post.likes > 100 ? 'fill-rose-500 text-rose-500' : ''} /> <span className="text-[15px] font-bold">{post.likes}</span></button>
                <button onClick={() => onCommentClick()} className="flex items-center gap-1.5 text-gray-900 dark:text-white active:scale-90"><MessageSquare size={24} /><span className="text-[15px] font-bold">12</span></button>
                <button className="flex items-center text-gray-900 dark:text-white active:scale-90 hover:text-[#00D1FF]"><Send size={24} /></button>
              </div>
              <button className="text-gray-900 dark:text-white active:scale-90"><Bookmark size={24} /></button>
            </div>
            <div className="px-3 pt-2 pb-2">
              <p className="text-[14px] text-gray-700 dark:text-gray-200 leading-relaxed font-medium"><span className="font-bold text-gray-900 dark:text-white mr-2">{post.user}</span>{post.caption}</p>
            </div>
          </div>
        )) : MOCK_PULSE_POSTS.map(post => (
          <div key={post.id} className="mx-4 mb-6 bg-white dark:bg-[#0B0F14] border border-black/5 dark:border-white/[0.08] rounded-[28px] p-2.5 shadow-xl">
            <div className="flex justify-between items-center px-3 pt-2 pb-3">
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-black/5" />
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-gray-900 dark:text-white leading-tight tracking-tight">{post.name}</span>
                  <span className="text-[12px] font-medium text-gray-500 mt-0.5">{post.time}</span>
                </div>
              </div>
              <button className="text-gray-400 p-2 hover:bg-black/5 rounded-full"><MoreVertical size={20} /></button>
            </div>
            
            <div className="px-3 pb-3">
              <p className="text-[14px] text-gray-800 dark:text-gray-200 leading-relaxed">{post.content}</p>
            </div>

            {post.image && (
              <div className="relative group px-1 pb-1">
                <img src={post.image} alt="Post" className="w-full aspect-video object-cover rounded-[20px] border border-black/5" />
              </div>
            )}

            {post.isVideo && (
              <div className="relative group px-1 pb-1">
                <img src={post.videoThumb} alt="Video" className="w-full aspect-video object-cover rounded-[20px] border border-black/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                    <Play size={24} fill="white" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-bold border border-white/10 uppercase">{post.videoDuration}</div>
              </div>
            )}

            <div className="flex justify-between items-center px-3 pt-4 pb-2">
              <div className="flex items-center gap-5">
                <button className="flex items-center gap-1.5 text-gray-900 dark:text-white active:scale-90"><Heart size={24} /> <span className="text-[15px] font-bold">{post.likes}</span></button>
                <button className="flex items-center gap-1.5 text-gray-900 dark:text-white active:scale-90"><MessageSquare size={24} /><span className="text-[15px] font-bold">{post.comments}</span></button>
                <button className="flex items-center text-gray-900 dark:text-white active:scale-90 hover:text-[#00D1FF]"><Send size={24} /></button>
              </div>
              <button className="text-gray-900 dark:text-white active:scale-90"><Bookmark size={24} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileView = ({ onSettingsClick, isPartnership, setIsPartnership, profileColor, setProfileColor, onFollowersClick, onFollowingClick, onEditProfileClick }) => (
  <div className="flex flex-col h-full bg-gray-50 dark:bg-[#05070A] overflow-y-auto pb-32 relative [&::-webkit-scrollbar]:hidden">
    <div className="absolute top-0 left-0 right-0 h-64 opacity-20 pointer-events-none" style={{ background: isPartnership ? `radial-gradient(circle at top right, ${profileColor}, transparent 70%)` : 'transparent' }} />
    <div className="flex justify-between items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 shadow-sm border-b border-black/5 dark:border-white/[0.08]">
      <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white tracking-tight">Profile</div>
      <div className="flex items-center gap-4"><IconButton icon={Plus} /><IconButton icon={Settings} onClick={onSettingsClick} /></div>
    </div>
    <div className="flex flex-col px-4 pt-6 pb-4 gap-6 relative z-10">
      <div className="flex justify-between items-start">
        <div className="flex flex-col flex-1 pr-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{MOCK_USER.name}</h1>
            {isPartnership && <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white uppercase" style={{ backgroundColor: profileColor }}>Partner</span>}
          </div>
          <p className="text-[14px] font-bold mt-1 mb-2" style={{ color: isPartnership ? profileColor : '#6C5CE7' }}>@{MOCK_USER.username}</p>
          <p className="text-[14px] text-gray-600 dark:text-gray-300 font-medium">{MOCK_USER.bio}</p>
        </div>
        <div className="relative w-[84px] h-[84px] rounded-full p-[3px] shadow-lg" style={{ background: isPartnership ? `linear-gradient(to bottom right, ${profileColor}, ${profileColor}30)` : 'linear-gradient(to top right, #6C5CE7, #00D1FF)' }}>
          <div className="w-full h-full rounded-full border-4 border-gray-50 dark:border-[#05070A] overflow-hidden"><img src={MOCK_USER.avatar} alt="Profile" className="w-full h-full object-cover" /></div>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-2 pt-1 [&::-webkit-scrollbar]:hidden">
        {MOCK_USER.personas.map((persona, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0">
            <div className="relative w-[48px] h-[48px] rounded-full p-[2px] bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-[#111827] shadow-sm">
              <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0F14] flex items-center justify-center"><span className="text-[20px]">{persona.split(' ')[0]}</span></div>
            </div>
            <span className="text-[9px] font-bold text-gray-500 uppercase">{persona.split(' ').slice(1).join(' ')}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between bg-white dark:bg-[#111827] rounded-2xl px-6 py-4 shadow-lg border border-black/5 dark:border-white/[0.08]">
        <div className="flex flex-col items-center"><span className="font-bold text-[18px] text-gray-900 dark:text-white">{MOCK_USER.posts}</span><span className="text-[12px] text-gray-500 font-bold uppercase">Posts</span></div>
        <div className="w-[1px] h-8 bg-black/10 dark:bg-white/[0.1]"></div>
        <div className="flex flex-col items-center cursor-pointer" onClick={onFollowersClick}><span className="font-bold text-[18px] text-gray-900 dark:text-white">{MOCK_USER.followers}</span><span className="text-[12px] text-gray-500 font-bold uppercase">Followers</span></div>
        <div className="w-[1px] h-8 bg-black/10 dark:bg-white/[0.1]"></div>
        <div className="flex flex-col items-center cursor-pointer" onClick={onFollowingClick}><span className="font-bold text-[18px] text-gray-900 dark:text-white">{MOCK_USER.following}</span><span className="text-[12px] text-gray-500 font-bold uppercase">Following</span></div>
      </div>
      <div className="flex gap-3">
        <button onClick={onEditProfileClick} className="flex-1 rounded-xl font-bold py-2.5 text-[14px] shadow-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 active:scale-95 transition-transform">Edit profile</button>
        <button className="flex-1 bg-white dark:bg-[#111827] rounded-xl font-bold text-gray-900 dark:text-white py-2.5 text-[14px] border border-black/10 shadow-sm active:scale-95 transition-transform">Share profile</button>
      </div>
    </div>
  </div>
);

const SoosView = () => (
  <div className="h-full bg-white dark:bg-[#0B0F14] flex flex-col">
    <div className="flex-1 relative overflow-hidden rounded-b-[2.5rem] shadow-lg z-10 border-b border-black/5 dark:border-white/[0.08]">
      <img src="https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?w=800&h=1600&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Video" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <div className="absolute right-4 bottom-10 flex flex-col items-center gap-7 z-10">
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-90 drop-shadow-md">
          <Heart size={30} fill="white" />
          <span className="text-[13px] font-bold">45.2k</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-90 drop-shadow-md">
          <MessageCircle size={30} fill="white" />
          <span className="text-[13px] font-bold">1.5k</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-90 drop-shadow-md">
          <Send size={30} />
          <span className="text-[13px] font-bold">Share</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 active:scale-90 drop-shadow-md">
          <MoreVertical size={30} />
        </button>
      </div>

      <div className="absolute left-6 bottom-10 right-24 z-10 text-white flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-white/80 p-0.5 overflow-hidden shadow-md">
            <img src={MOCK_USER.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[16px] drop-shadow-lg tracking-tight">Ganesh KGP</span>
            <span className="text-[13px] font-bold opacity-90 drop-shadow-md">@ganeshkgp</span>
          </div>
          <button className="ml-2 bg-white/25 backdrop-blur-md border border-white/40 px-4 py-1.5 rounded-xl text-[12px] font-bold hover:bg-white/40 transition-colors shadow-sm active:scale-95">Follow</button>
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="text-[15px] leading-relaxed drop-shadow-md font-bold line-clamp-2">Neon aesthetics checking in! 🎨✨ Building something amazing for the community. #Design #UIUX #Soosial</p>
          <div className="flex items-center gap-2 text-[12px] font-extrabold text-[#00D1FF] bg-black/30 backdrop-blur-sm w-max px-3 py-1.5 rounded-full border border-white/10 drop-shadow-lg">
            <Compass size={14} className="animate-spin-slow" />
            <span>Original Audio - ganeshkgp</span>
          </div>
        </div>
      </div>
    </div>
    <div className="h-[96px] w-full flex-none bg-white dark:bg-[#0B0F14]"></div>
  </div>
);

const ChatsListView = ({ onChatSelect }) => {
  const [chatTab, setChatTab] = useState('private');

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-32 bg-white dark:bg-[#05070A] [&::-webkit-scrollbar]:hidden transition-colors duration-300">
      {/* Header */}
      <div className="px-6 py-6 sticky top-0 bg-white/90 dark:bg-[#05070A]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] transition-colors duration-300">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Chats</h1>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white/10 flex items-center justify-center text-white border border-black/10 dark:border-white/20 active:scale-95 transition-all">
              <Edit3 size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#111A2C] px-5 py-3.5 rounded-2xl border border-black/5 dark:border-white/5 mb-6 shadow-sm dark:shadow-2xl transition-colors duration-300">
          <Search className="text-gray-400 dark:text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search messages" 
            className="bg-transparent text-gray-900 dark:text-white w-full outline-none text-[15px] placeholder-gray-400 dark:placeholder-gray-500 font-medium" 
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-[#111A2C]/50 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 gap-1 shadow-inner overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden transition-colors duration-300">
          <button 
            onClick={() => setChatTab('private')} 
            className={`flex-1 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-300 ${chatTab === 'private' ? 'bg-white dark:bg-[#1D283A] text-gray-900 dark:text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Private
          </button>
          <button 
            onClick={() => setChatTab('public')} 
            className={`flex-1 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-300 ${chatTab === 'public' ? 'bg-white dark:bg-[#1D283A] text-gray-900 dark:text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Public
          </button>
          <button 
            onClick={() => setChatTab('request')} 
            className={`flex-1 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-300 flex items-center justify-center gap-2 ${chatTab === 'request' ? 'bg-white dark:bg-[#1D283A] text-gray-900 dark:text-white shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
          >
            Request
            {MOCK_REQUESTS.length > 0 && (
              <span className="bg-[#6C5CE7] text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {MOCK_REQUESTS.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col px-6 pt-2">
        {chatTab === 'private' && (
          <>
            {/* Active Now Section */}
            <div className="mb-8">
              <h2 className="text-[12px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Active Now</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
                <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                  <div className="w-16 h-16 rounded-[24px] bg-gray-50 dark:bg-white/5 border border-dashed border-black/10 dark:border-white/20 flex items-center justify-center text-gray-400 dark:text-white group-hover:bg-gray-100 dark:group-hover:bg-white/10 transition-colors">
                    <Plus size={24} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400">New</span>
                </div>
                {MOCK_ACTIVE_USERS.map((u) => (
                  <div key={u.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-[24px] border border-black/5 dark:border-white/10 p-0.5 overflow-hidden bg-gray-100 dark:bg-gray-900">
                        <img src={u.avatar} className="w-full h-full rounded-[22px] object-cover" alt={u.name} />
                      </div>
                      <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#05070A]"></div>
                    </div>
                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 truncate w-14 text-center">{u.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat List */}
            <div className="flex flex-col gap-6">
              {MOCK_CHATS.map((chat) => (
                <div key={chat.id} onClick={() => onChatSelect(chat)} className="flex items-center gap-4 cursor-pointer group hover:bg-gray-50 dark:hover:bg-white/[0.02] -mx-2 px-2 py-2 rounded-2xl transition-colors">
                  <div className="relative">
                    <div className={`w-14 h-14 rounded-full p-[2px] ${chat.hasStory ? 'bg-[#6C5CE7]' : 'border border-black/5 dark:border-white/10'}`}>
                      <img src={chat.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-[#05070A]" />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-[16px] font-bold text-gray-900 dark:text-white truncate pr-2 tracking-tight">{chat.name}</h3>
                      <span className="text-[12px] text-gray-400 dark:text-gray-500 font-medium">{chat.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {chat.unread > 0 && <div className="w-2 h-2 bg-[#6C5CE7] rounded-full flex-shrink-0"></div>}
                      <p className={`text-[14px] truncate pr-4 ${chat.unread > 0 ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500 font-medium'}`}>{chat.msg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {chatTab === 'public' && (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-600">
              <Globe size={40} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Public Chats</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">No public conversations yet.</p>
            </div>
          </div>
        )}

        {chatTab === 'request' && (
          <div className="flex flex-col gap-6 pt-2 pb-10">
            {MOCK_REQUESTS.map((req) => (
              <div key={req.id} className="bg-white dark:bg-[#111A2C]/60 border border-black/5 dark:border-white/5 rounded-3xl p-5 shadow-sm dark:shadow-xl flex flex-col gap-5 transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <img src={req.avatar} className="w-14 h-14 rounded-2xl object-cover border border-black/5 dark:border-white/10 shadow-sm" alt={req.name} />
                  <div className="flex flex-col flex-1 min-w-0">
                    <h3 className="text-[16px] font-bold text-gray-900 dark:text-white truncate tracking-tight">{req.name}</h3>
                    <span className="text-[12px] text-gray-400 dark:text-gray-500 font-medium">{req.time}</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5">
                  <p className="text-[14px] text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic">"{req.msg}"</p>
                </div>
                <div className="flex gap-3 pt-1">
                  <button className="flex-1 py-3.5 rounded-2xl bg-gray-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white font-bold text-[14px] active:scale-95 transition-all hover:bg-gray-200 dark:hover:bg-white/10">
                    Reject
                  </button>
                  <button className="flex-1 py-3.5 rounded-2xl bg-[#6C5CE7] hover:bg-[#5b4dbd] text-white font-bold text-[14px] shadow-lg active:scale-95 transition-all">
                    Accept
                  </button>
                </div>
              </div>
            ))}
            {MOCK_REQUESTS.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-600">
                  <User size={40} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Requests</h3>
                  <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">You don't have any chat requests yet.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatDetailView = ({ chat, onBack }) => (
  <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0B0F14]">
    <div className="flex items-center justify-between px-4 py-4 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl border-b z-20 shadow-sm">
      <div className="flex items-center gap-3">
        <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
        <img src={chat.avatar} alt="Avatar" className="w-10 h-10 rounded-[14px] object-cover" />
        <div className="flex flex-col">
          <span className="text-gray-900 dark:text-white font-bold text-[15px] leading-tight">{chat.name}</span>
          <div className="flex items-center gap-1.5 mt-0.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span><span className="text-gray-500 text-[12px] font-semibold">Active now</span></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton icon={PhoneCall} className="text-gray-900 dark:text-white" />
        <IconButton icon={Video} className="text-gray-900 dark:text-white" />
      </div>
    </div>
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 [&::-webkit-scrollbar]:hidden">
      <div className="flex justify-center my-4">
        <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest bg-white dark:bg-[#111827] px-4 py-1 rounded-full border border-black/5 shadow-sm">Today, 10:42 AM</span>
      </div>

      {/* Shared Image Bubble */}
      <div className="flex justify-start">
        <div className="max-w-[75%] bg-white dark:bg-[#111827] border border-black/5 rounded-[24px] rounded-bl-sm p-1.5 shadow-sm">
          <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop" className="w-full rounded-[20px] object-cover aspect-video mb-2" alt="Shared content" />
          <div className="px-3 pb-1.5">
            <p className="text-[14px] font-medium text-gray-800 dark:text-gray-200">Look at this new UI kit I found! 🎨</p>
            <span className="text-[10px] text-gray-400 mt-1 block">Seen 10:43 AM</span>
          </div>
        </div>
      </div>

      {/* Audio Call Log */}
      <div className="flex justify-center my-2">
        <div className="flex items-center gap-3 bg-gray-200/50 dark:bg-white/5 backdrop-blur-md px-5 py-3 rounded-[20px] border border-black/5 dark:border-white/5 shadow-inner">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
            <PhoneIncoming size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-gray-900 dark:text-white">Audio Call</span>
            <span className="text-[11px] font-medium text-gray-500">Duration: 12 min 30 sec</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="max-w-[75%] bg-gradient-to-tr from-[#6C5CE7] to-[#8c7df0] text-white rounded-[24px] rounded-br-sm px-5 py-3 shadow-md">
          <p className="text-[14px] font-bold leading-relaxed">{chat.msg}</p>
          <span className="text-[10px] text-white/70 mt-1 block text-right">Delivered</span>
        </div>
      </div>

      {/* Video Call Log (Missed) */}
      <div className="flex justify-center my-2">
        <div className="flex items-center gap-3 bg-rose-500/5 dark:bg-rose-500/10 backdrop-blur-md px-5 py-3 rounded-[20px] border border-rose-500/10 shadow-inner">
          <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500">
            <VideoOff size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-rose-500 uppercase tracking-wide">Missed Video Call</span>
            <span className="text-[11px] font-medium text-gray-500">12:30 PM • Friday</span>
          </div>
        </div>
      </div>
    </div>

    <div className="px-4 py-4 bg-white dark:bg-[#0B0F14] border-t border-black/5 pb-8 shadow-2xl">
      <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#111827] rounded-2xl p-1.5 border border-black/5 shadow-inner">
        <button className="p-2.5 bg-gray-200 dark:bg-white/5 rounded-xl text-gray-500"><Plus size={18} /></button>
        <input type="text" placeholder="Message..." className="w-full bg-transparent text-gray-900 dark:text-white text-[14px] outline-none px-2 font-medium" />
        <button className="p-2.5 bg-[#6C5CE7] rounded-xl text-white shadow-lg"><Send size={18} /></button>
      </div>
    </div>
  </div>
);

const NotificationsView = ({ onBack }) => (
  <div className="flex flex-col h-full bg-white dark:bg-[#0B0F14] overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08]">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight ml-2">Notifications</h1>
    </div>
    <div className="flex flex-col px-4 py-5 gap-4">
      {MOCK_NOTIFICATIONS.map(notif => (
        <div key={notif.id} className="flex items-center gap-4 bg-gray-50 dark:bg-[#111827]/40 p-3 rounded-2xl border border-black/5 dark:border-white/[0.04]">
          {notif.isTextAvatar ? (
            <div className="w-11 h-11 rounded-full border border-blue-500/50 flex items-center justify-center text-gray-900 dark:text-white text-[16px] font-semibold bg-white dark:bg-[#0B0F14] flex-shrink-0">{notif.initial}</div>
          ) : <img src={notif.avatar} alt="Avatar" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />}
          <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-snug"><span className="font-bold text-gray-900 dark:text-white">{notif.user}</span> {notif.action} <span className="text-gray-500 font-medium">{notif.time}</span></p>
        </div>
      ))}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    console.log('Dark mode changed:', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const [activeChat, setActiveChat] = useState(null);
  const [activePostComments, setActivePostComments] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showLanguageSettings, setShowLanguageSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [isPartnership, setIsPartnership] = useState(false);
  const [profileColor, setProfileColor] = useState('#00D1FF');

  const renderContent = () => {
    // 1. Modals & Sub-Pages
    if (showCreatePost) return <CreatePostView onBack={() => setShowCreatePost(false)} />;
    if (showAccountSettings) return <AccountSettingsView onBack={() => setShowAccountSettings(false)} />;
    if (showLanguageSettings) return <LanguageSettingsView onBack={() => setShowLanguageSettings(false)} />;
    if (showSwitchAccount) return <SwitchAccountView onBack={() => setShowSwitchAccount(false)} />;
    if (showFollowers) return <UserListView title="Followers" users={MOCK_FOLLOWERS} onBack={() => setShowFollowers(false)} />;
    if (showFollowing) return <UserListView title="Following" users={MOCK_FOLLOWING} onBack={() => setShowFollowing(false)} />;
    if (showEditProfile) return <EditProfileView onBack={() => setShowEditProfile(false)} />;
    if (showSettings) return <SettingsView onBack={() => setShowSettings(false)} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(prev => !prev)} onSwitchAccountClick={() => setShowSwitchAccount(true)} onAccountClick={() => setShowAccountSettings(true)} onLanguageClick={() => setShowLanguageSettings(true)} />;
    if (showNotifications) return <NotificationsView onBack={() => setShowNotifications(false)} />;
    if (activeChat) return <ChatDetailView chat={activeChat} onBack={() => setActiveChat(null)} />;

    // 2. Base Navigation Tabs
    switch (activeTab) {
      case 'home': return <HomeView onNotificationClick={() => setShowNotifications(true)} onCommentClick={() => setActivePostComments(true)} onCreatePostClick={() => setShowCreatePost(true)} />;
      case 'soos': return <SoosView />;
      case 'chats': return <ChatsListView onChatSelect={setActiveChat} />;
      case 'profile': return <ProfileView onSettingsClick={() => setShowSettings(true)} isPartnership={isPartnership} setIsPartnership={setIsPartnership} profileColor={profileColor} setProfileColor={setProfileColor} onFollowersClick={() => setShowFollowers(true)} onFollowingClick={() => setShowFollowing(true)} onEditProfileClick={() => setShowEditProfile(true)} />;
      default: return <HomeView onNotificationClick={() => setShowNotifications(true)} onCommentClick={() => setActivePostComments(true)} onCreatePostClick={() => setShowCreatePost(true)} />;
    }
  };

  const navItems = [
    { id: 'home', icon: Home },
    { id: 'soos', icon: Clapperboard },
    { id: 'create', icon: Plus, isAction: true },
    { id: 'chats', icon: MessageCircleMore },
    { id: 'profile', isAvatar: true },
  ];

  const isModalOpen = showSettings || activePostComments || showCreatePost || showEditProfile || showFollowers || showFollowing || showSwitchAccount || showAccountSettings || showLanguageSettings || showNotifications;

  return (
    <div className={`${isDarkMode ? 'dark' : ''} bg-gray-200 dark:bg-black w-full min-h-screen flex justify-center items-center font-sans tracking-tight selection:bg-[#6C5CE7]/30 antialiased transition-colors duration-300`}>
      <div className="w-full max-w-[430px] h-[100dvh] sm:h-[932px] sm:rounded-[3rem] sm:border-[8px] border-gray-300 dark:border-[#111827] overflow-hidden relative shadow-2xl bg-gray-50 dark:bg-[#05070A] flex flex-col transition-colors duration-300">

        <div className="flex-1 overflow-hidden relative z-0 flex flex-col">
          {renderContent()}
        </div>

        {/* Fixed: Centered Action Button Navigation Bar */}
        {!isModalOpen && !activeChat && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none px-6">
            <nav className="pointer-events-auto bg-white/30 dark:bg-[#111827]/30 border border-white/50 dark:border-white/[0.15] rounded-full flex justify-between items-center px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] w-full max-w-[320px] gap-2 backdrop-blur-xl">
              <button onClick={() => setActiveTab('home')} className="p-2 flex items-center justify-center active:scale-90 transition-transform"><Home size={24} className={activeTab === 'home' ? 'text-gray-900 dark:text-white' : 'text-gray-500'} strokeWidth={activeTab === 'home' ? 2.5 : 2} /></button>
              <button onClick={() => setActiveTab('soos')} className="p-2 flex items-center justify-center active:scale-90 transition-transform"><Clapperboard size={24} className={activeTab === 'soos' ? 'text-gray-900 dark:text-white' : 'text-gray-500'} strokeWidth={activeTab === 'soos' ? 2.5 : 2} /></button>

              <button onClick={() => setShowCreatePost(true)} className="flex items-center justify-center active:scale-90 transition-transform mx-2">
                <div className="w-11 h-11 rounded-full bg-white/30 dark:bg-white/10 border border-black/10 dark:border-white/[0.15] shadow-sm flex items-center justify-center text-gray-900 dark:text-white backdrop-blur-md">
                  <Plus size={22} strokeWidth={2.5} />
                </div>
              </button>

              <button onClick={() => setActiveTab('chats')} className="p-2 flex items-center justify-center active:scale-90 transition-transform"><MessageCircleMore size={24} className={activeTab === 'chats' ? 'text-gray-900 dark:text-white' : 'text-gray-500'} strokeWidth={activeTab === 'chats' ? 2.5 : 2} /></button>
              <button onClick={() => setActiveTab('profile')} className="p-2 flex items-center justify-center active:scale-90 transition-transform"><div className={`w-6 h-6 rounded-full border-2 overflow-hidden ${activeTab === 'profile' ? 'border-gray-900 dark:border-white' : 'border-transparent opacity-60'}`}><img src={MOCK_USER.avatar} alt="Profile" className="w-full h-full object-cover" /></div></button>
            </nav>
          </div>
        )}

        {/* Comments Modal Overlay */}
        {activePostComments && (
          <div className="absolute inset-0 z-[200] flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-opacity" onClick={() => setActivePostComments(false)}></div>
            <div className="relative bg-white/40 dark:bg-[#05070A]/50 w-full h-[75%] rounded-t-[2.5rem] border-t border-black/10 dark:border-white/[0.1] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="flex justify-center pt-3 pb-2 w-full absolute top-0 z-10 cursor-pointer" onClick={() => setActivePostComments(false)}><div className="w-12 h-1.5 bg-gray-400 dark:bg-white/30 rounded-full shadow-sm"></div></div>
              <div className="flex justify-between items-center px-6 pt-8 pb-4 border-b border-black/10 dark:border-white/[0.08]">
                <h2 className="text-[16px] font-bold text-gray-900 dark:text-white tracking-tight drop-shadow-sm">Comments</h2>
                <IconButton icon={X} onClick={() => setActivePostComments(false)} className="!p-1.5 bg-white/30 dark:bg-white/10 rounded-full hover:bg-white/50" />
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6 [&::-webkit-scrollbar]:hidden">
                {MOCK_COMMENTS.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img src={comment.avatar} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-black/5 flex-shrink-0 shadow-sm" />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2"><span className="text-[13px] font-bold text-gray-900 dark:text-white">{comment.user}</span><span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">{comment.time}</span></div>
                      <p className="text-[14px] text-gray-800 dark:text-gray-100 mt-0.5 leading-snug font-medium">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}