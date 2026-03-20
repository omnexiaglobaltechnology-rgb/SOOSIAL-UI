import React, { useState } from 'react';
import {
  Home, Search, Play, MessageSquare, User,
  Heart, MessageCircle, Send, Bookmark, MoreVertical,
  Plus, Bell, Settings, Phone, Video, Edit3, Grid,
  Tag, ChevronLeft, Moon, LogOut, Compass, Mic,
  Repeat, Share
} from 'lucide-react';

// --- Production UI Components ---

const StoryRing = ({ children, hasStory, className = '' }) => (
  <div className={`rounded-full ${hasStory ? 'p-[2px] bg-[#6C5CE7]' : 'p-[2px] bg-transparent'} ${className}`}>
    <div className="bg-[#0B0F14] p-[2px] rounded-full h-full w-full flex items-center justify-center">
      {children}
    </div>
  </div>
);

const IconButton = ({ icon: Icon, active, onClick, className = '', notification }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center justify-center transition-colors ${active ? 'text-white' : 'text-gray-400 hover:text-gray-200'} ${className}`}
  >
    <Icon size={24} strokeWidth={active ? 2.5 : 2} className={active ? 'fill-current' : ''} />
    {notification && (
      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#6C5CE7] border-2 border-[#0B0F14] rounded-full"></span>
    )}
  </button>
);

// --- Mock Data ---

const MOCK_USER = {
  username: 'hariomsingh',
  name: 'HARIOM SINGH',
  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
  posts: 0,
  followers: 6,
  following: 6,
  bio: 'Digital Creator • UI/UX',
};

const MOCK_USERS = [
  { id: 1, user: 'Your Story', avatar: MOCK_USER.avatar, isMe: true },
  { id: 2, user: 'gunjan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', hasStory: true },
  { id: 3, user: 'raw_aadiii25', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', hasStory: true },
  { id: 4, user: 'omnexia_tech', avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop', hasStory: false },
  { id: 5, user: 'kiara_singh', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', hasStory: true },
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

const MOCK_TWEETS = [
  {
    id: 1,
    name: 'Alex Developer',
    username: '@alex_dev',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    content: 'Just deployed the new UI. Glassmorphism is out, solid minimal design is back in. What do you guys think? 🚀',
    time: '2h',
    replies: 45,
    reposts: 12,
    likes: 342,
  },
  {
    id: 2,
    name: 'Tech Insider',
    username: '@tech_insider',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop',
    content: 'Breaking: New design systems are prioritizing speed and usability over heavy visual effects. The landscape is shifting rapidly toward clean, native-feeling apps. #TechNews #Design',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
    time: '4h',
    replies: 128,
    reposts: 450,
    likes: 1205,
  }
];

const MOCK_CHATS = [
  { id: 1, name: 'omnexia technology', msg: 'Hey, when are we meeting?', time: 'Wed', unread: 1, avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop', hasStory: true },
  { id: 2, name: 'daphnelahi7757', msg: 'Call me when you are free', time: 'Mar 09', unread: 0, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop', hasStory: false },
  { id: 3, name: 'kiara_singh_1242', msg: 'Sounds good to me.', time: 'Wed', unread: 0, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', hasStory: true },
  { id: 4, name: 'arice', msg: 'Sent an attachment', time: 'Mon', unread: 0, avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop', hasStory: false },
];

const MOCK_NOTIFICATIONS = {
  thisWeek: [
    { id: 1, user: 'raw_aadiii25', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', action: 'started following you', time: '3 hours' }
  ],
  thisMonth: [
    { id: 2, user: 'arice', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop', action: 'started following you', time: '10 days' },
    { id: 3, user: 'jiteshpal1602', isTextAvatar: true, initial: 'J', action: 'started following you', time: '10 days' },
    { id: 4, user: 'rayyankha9087', isTextAvatar: true, initial: 'R', action: 'started following you', time: '22 days' },
    { id: 5, user: 'vishal', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop', action: 'started following you', time: '23 days' },
    { id: 6, user: 'kiara_singh_1242', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', action: 'started following you', time: '25 days' }
  ]
};

// --- Main Views ---

const HomeView = ({ onNotificationClick }) => {
  const [feedTab, setFeedTab] = useState('forYou'); // 'forYou' | 'democracy'

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-32 bg-[#0B0F14] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

      {/* Sticky Top Block: Header + Vertical Stories + X-Tabs */}
      <div className="flex-none sticky top-0 z-20 bg-[#0B0F14]/95 backdrop-blur-xl flex flex-col pt-1 border-b border-white/[0.06]">

        {/* Unique Header with Specific Custom Search Bar */}
        <div className="flex justify-between items-center px-4 pt-2 pb-4">
          <h1 className="text-[22px] font-extrabold text-white tracking-tight">Soosial<span className="text-[#6C5CE7]">.</span></h1>

          {/* Custom Search Pill matching exact request */}
          <div className="flex-1 max-w-[500px] mx-4 flex items-center h-[38px] rounded-full border-[1.5px] border-white/[0.12] pl-4 pr-1 bg-[#0B0F14] focus-within:border-white/[0.25] transition-colors">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-[13px] text-white outline-none placeholder-gray-500 font-medium"
            />
            <button className="bg-white h-[30px] w-[42px] rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95">
              <Search size={16} className="text-[#0B0F14]" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <IconButton icon={Plus} className="!p-2 bg-[#111827] rounded-full border border-white/[0.06]" />
            <IconButton icon={Bell} notification={true} className="!p-2 bg-[#111827] rounded-full border border-white/[0.06]" onClick={onNotificationClick} />
          </div>
        </div>

        {/* Clean, Minimal Circular Stories */}
        <div className="flex gap-4 overflow-x-auto px-4 pt-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {MOCK_USERS.map(story => (
            <div key={story.id} className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group">
              <div className="relative">
                <StoryRing hasStory={story.hasStory || story.isMe} className="group-hover:scale-95 transition-transform duration-200">
                  <img src={story.avatar} alt={story.user} className="w-16 h-16 rounded-full object-cover" />
                </StoryRing>
                {story.isMe && (
                  <div className="absolute bottom-0 right-0 bg-[#6C5CE7] rounded-full p-1 border-2 border-[#0B0F14]">
                    <Plus size={12} className="text-white font-bold" />
                  </div>
                )}
              </div>
              <span className="text-[12px] text-gray-400 font-medium truncate w-[72px] text-center">{story.user}</span>
            </div>
          ))}
        </div>

        {/* X-Style Feed Select Tabs */}
        <div className="flex px-4 gap-6 justify-center sm:justify-start">
          <button
            onClick={() => setFeedTab('forYou')}
            className={`py-3 text-[15px] font-bold transition-all relative ${feedTab === 'forYou' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            For you
            {feedTab === 'forYou' && <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#6C5CE7] rounded-t-full"></div>}
          </button>
          <button
            onClick={() => setFeedTab('democracy')}
            className={`py-3 text-[15px] font-bold transition-all relative ${feedTab === 'democracy' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Democracy
            {feedTab === 'democracy' && <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#6C5CE7] rounded-t-full"></div>}
          </button>
        </div>
      </div>

      {/* Dynamic Feed Content */}
      <div className="flex-none flex flex-col">
        {feedTab === 'forYou' ? (
          // --- Instagram Style Feed ---
          MOCK_POSTS.map(post => (
            <div key={post.id} className="flex flex-col pb-4 pt-2 border-b border-white/[0.06]">
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-3">
                  <StoryRing hasStory={true}>
                    <img src={post.avatar} alt={post.user} className="w-8 h-8 rounded-full object-cover" />
                  </StoryRing>
                  <p className="text-[14px] font-semibold text-white">{post.user}</p>
                </div>
                <button className="text-gray-400"><MoreVertical size={20} /></button>
              </div>

              <img src={post.image} alt="Post" className="w-full aspect-square object-cover bg-[#111827]" />

              <div className="flex flex-col px-4 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <IconButton icon={Heart} />
                    <IconButton icon={MessageCircle} />
                    <IconButton icon={Send} />
                  </div>
                  <IconButton icon={Bookmark} />
                </div>

                <p className="text-[14px] font-semibold text-white mb-2">{post.likes} likes</p>
                <p className="text-[14px] text-gray-200 leading-relaxed mb-2">
                  <span className="font-semibold text-white mr-2">{post.user}</span>
                  {post.caption}
                </p>
                <p className="text-[14px] text-[#6C5CE7] font-medium mb-2">{post.tags.join(' ')}</p>
                <p className="text-[12px] text-gray-500 font-medium">{post.time}</p>
              </div>
            </div>
          ))
        ) : (
          // --- Twitter/X Style Democracy Feed ---
          MOCK_TWEETS.map(tweet => (
            <div key={tweet.id} className="flex gap-3 px-4 py-4 border-b border-white/[0.06] hover:bg-[#111827]/50 transition-colors cursor-pointer">
              <img src={tweet.avatar} alt={tweet.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">

                <div className="flex items-center gap-1.5 text-[14px]">
                  <span className="font-bold text-white truncate">{tweet.name}</span>
                  <span className="text-gray-500 truncate">{tweet.username}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-500 flex-shrink-0">{tweet.time}</span>
                </div>

                <p className="text-[15px] text-gray-200 mt-1 leading-relaxed">{tweet.content}</p>

                {tweet.image && (
                  <img src={tweet.image} alt="Tweet media" className="mt-3 w-full rounded-2xl border border-white/[0.06] object-cover max-h-[300px]" />
                )}

                <div className="flex justify-between items-center mt-3 pr-6 text-gray-500">
                  <button className="flex items-center gap-1.5 hover:text-[#00D1FF] transition-colors group">
                    <div className="p-1.5 -ml-1.5 rounded-full group-hover:bg-[#00D1FF]/10"><MessageCircle size={16} /></div>
                    <span className="text-[13px]">{tweet.replies}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-green-500 transition-colors group">
                    <div className="p-1.5 rounded-full group-hover:bg-green-500/10"><Repeat size={16} /></div>
                    <span className="text-[13px]">{tweet.reposts}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors group">
                    <div className="p-1.5 rounded-full group-hover:bg-rose-500/10"><Heart size={16} /></div>
                    <span className="text-[13px]">{tweet.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-[#6C5CE7] transition-colors group">
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

const NotificationsView = ({ onBack }) => (
  <div className="flex flex-col h-full bg-[#0B0F14] overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-[#0B0F14] z-20 border-b border-white/[0.06]">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-xl font-bold text-white tracking-tight ml-2">Notifications</h1>
    </div>

    <div className="flex flex-col px-4 py-5">
      <h2 className="text-[15px] font-semibold text-white mb-5 flex items-center gap-2">
        <div className="w-0.5 h-4 bg-white rounded-full opacity-60"></div>
        This week
      </h2>
      <div className="flex flex-col gap-5 mb-8">
        {MOCK_NOTIFICATIONS.thisWeek.map(notif => (
          <div key={notif.id} className="flex items-center gap-3">
            {notif.isTextAvatar ? (
              <div className="w-11 h-11 rounded-full border border-blue-500/50 flex items-center justify-center text-white text-[16px] font-semibold bg-[#0B0F14] flex-shrink-0">
                {notif.initial}
              </div>
            ) : (
              <img src={notif.avatar} className="w-11 h-11 rounded-full object-cover flex-shrink-0" alt={notif.user} />
            )}
            <p className="text-[14px] text-gray-300 leading-snug">
              <span className="font-semibold text-white">{notif.user}</span> {notif.action} <span className="text-gray-500">{notif.time}</span>
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-[15px] font-semibold text-white mb-5">This month</h2>
      <div className="flex flex-col gap-5">
        {MOCK_NOTIFICATIONS.thisMonth.map(notif => (
          <div key={notif.id} className="flex items-center gap-3">
            {notif.isTextAvatar ? (
              <div className="w-11 h-11 rounded-full border border-blue-500/50 flex items-center justify-center text-white text-[15px] font-semibold bg-[#0B0F14] flex-shrink-0">
                {notif.initial}
              </div>
            ) : (
              <img src={notif.avatar} className="w-11 h-11 rounded-full object-cover flex-shrink-0" alt={notif.user} />
            )}
            <p className="text-[14px] text-gray-300 leading-snug">
              <span className="font-semibold text-white">{notif.user}</span> {notif.action} <span className="text-gray-500">{notif.time}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SoosView = () => (
  <div className="h-full bg-[#0B0F14] flex flex-col">
    <div className="flex-1 relative overflow-hidden rounded-b-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-10 border-b border-white/[0.06]">
      <img
        src="https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?w=800&h=1600&fit=crop"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Video"
      />
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

      <div className="absolute right-4 bottom-6 flex flex-col items-center gap-6 z-10">
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform">
          <Heart size={28} fill="white" className="drop-shadow-lg" />
          <span className="text-[13px] font-bold drop-shadow-md">45k</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform">
          <MessageCircle size={28} className="drop-shadow-lg" />
          <span className="text-[13px] font-bold drop-shadow-md">1k</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform">
          <Send size={28} className="drop-shadow-lg" />
        </button>
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform">
          <MoreVertical size={28} className="drop-shadow-lg" />
        </button>
      </div>

      <div className="absolute left-4 bottom-6 right-20 z-10 text-white flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <StoryRing hasStory={true} className="w-11 h-11">
            <img src={MOCK_USER.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          </StoryRing>
          <span className="font-bold text-[15px] drop-shadow-md">ganeshkgp</span>
          <button className="bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1.5 rounded-lg text-[12px] font-bold hover:bg-white/30 transition-colors shadow-sm">Follow</button>
        </div>
        <p className="text-[14px] leading-relaxed drop-shadow-md font-medium">Neon aesthetics checking in 🎨✨</p>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-white/90 drop-shadow-md">
          <Compass size={14} />
          <span>Original Audio - ganeshkgp</span>
        </div>
      </div>
    </div>

    <div className="h-[96px] w-full flex-none bg-[#0B0F14]"></div>
  </div>
);

const ChatsListView = ({ onChatSelect }) => (
  <div className="flex flex-col h-full overflow-y-auto pb-32 bg-[#0B0F14] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="px-4 py-4 sticky top-0 bg-[#0B0F14] z-20 border-b border-white/[0.06]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white tracking-tight">Chats</h1>
        <div className="flex items-center gap-4">
          <IconButton icon={Video} />
          <IconButton icon={Edit3} />
        </div>
      </div>

      <div className="flex items-center gap-3 bg-[#111827] px-4 py-2.5 rounded-xl border border-white/[0.06] mb-4">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search messages"
          className="bg-transparent text-white w-full outline-none text-[14px] placeholder-gray-500"
        />
      </div>

      <div className="flex bg-[#111827] p-1 rounded-xl border border-white/[0.06]">
        <button className="flex-1 py-1.5 flex justify-center items-center bg-[#1A2235] rounded-lg shadow-sm text-white text-[13px] font-semibold transition-all">
          Private
        </button>
        <button className="flex-1 py-1.5 flex justify-center items-center text-gray-500 hover:text-gray-300 text-[13px] font-semibold transition-all">
          Public
        </button>
      </div>
    </div>

    <div className="flex flex-col mt-4 mb-2">
      <h2 className="px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Active Now</h2>
      <div className="flex gap-3 overflow-x-auto px-4 pb-4 border-b border-white/[0.06] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex flex-col items-center justify-center min-w-[68px] h-[86px] rounded-2xl bg-[#111827] border border-white/[0.08] border-dashed cursor-pointer hover:bg-white/5 transition-colors">
          <Plus size={20} className="text-gray-400" />
          <span className="text-[10px] text-gray-400 font-medium mt-2">New</span>
        </div>

        {MOCK_USERS.filter(u => !u.isMe && u.hasStory).map(user => (
          <div key={user.id} className="relative flex flex-col items-center justify-center min-w-[68px] h-[86px] rounded-2xl bg-[#111827] border border-white/[0.06] overflow-hidden cursor-pointer group hover:border-[#6C5CE7]/50 transition-colors">
            <img src={user.avatar} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity blur-[2px]" alt="bg" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/90 via-[#0B0F14]/40 to-transparent"></div>

            <img src={user.avatar} className="w-9 h-9 rounded-full border border-white/20 z-10 mb-1" alt="avatar" />
            <span className="text-[11px] text-white font-medium z-10 truncate w-[80%] text-center tracking-tight">{user.user.split(' ')[0]}</span>
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border border-[#0B0F14]"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-1 px-2 pt-2">
      {MOCK_CHATS.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat)}
          className={`flex items-center gap-3 px-3 py-3 rounded-2xl cursor-pointer transition-colors ${chat.unread > 0
            ? 'bg-[#111827] border border-white/[0.06]'
            : 'bg-transparent hover:bg-[#111827]/50 border border-transparent'
            }`}
        >
          <div className="relative flex-shrink-0">
            <img src={chat.avatar} alt={chat.name} className="w-[50px] h-[50px] rounded-[14px] object-cover" />
            {chat.hasStory && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#6C5CE7] border-[2.5px] border-[#0B0F14] rounded-full"></span>
            )}
          </div>

          <div className="flex flex-col flex-1 min-w-0 justify-center">
            <div className="flex justify-between items-center mb-0.5">
              <h3 className={`text-[15px] tracking-tight truncate pr-2 ${chat.unread > 0 ? 'text-white font-bold' : 'text-gray-300 font-semibold'}`}>{chat.name}</h3>
              <span className={`text-[12px] whitespace-nowrap ${chat.unread > 0 ? 'text-[#6C5CE7] font-semibold' : 'text-gray-500'}`}>{chat.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className={`text-[13px] leading-snug truncate pr-4 ${chat.unread > 0 ? 'text-gray-200 font-medium' : 'text-gray-500'}`}>{chat.msg}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChatDetailView = ({ chat, onBack }) => (
  <div className="flex flex-col h-full bg-[#0B0F14]">
    <div className="flex items-center justify-between px-4 py-4 bg-[#0B0F14] border-b border-white/[0.06] z-20">
      <div className="flex items-center gap-3">
        <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
        <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-[12px] object-cover" />
        <div className="flex flex-col">
          <span className="text-white font-semibold text-[15px] tracking-tight leading-tight">{chat.name}</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span className="text-gray-500 text-[12px] font-medium">Active now</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton icon={Phone} />
        <IconButton icon={Video} />
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex justify-center my-4">
        <span className="text-[12px] font-medium text-gray-500 bg-[#111827] px-3 py-1 rounded-full border border-white/[0.06]">18 Mar 2026, 10:42 AM</span>
      </div>

      <div className="flex justify-start">
        <div className="max-w-[75%] bg-[#111827] border border-white/[0.06] text-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
          <p className="text-[14px] leading-relaxed">Hey, are we still meeting later?</p>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="max-w-[75%] bg-[#6C5CE7] text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
          <p className="text-[14px] leading-relaxed">{chat.msg}</p>
        </div>
      </div>
    </div>

    <div className="px-4 py-4 bg-[#0B0F14] border-t border-white/[0.06] pb-8">
      <div className="flex items-center gap-2 bg-[#111827] rounded-2xl p-1.5 border border-white/[0.06] focus-within:border-white/[0.15] transition-colors">
        <button className="p-2.5 bg-[#1A2235] rounded-xl flex-shrink-0 hover:bg-white/10 transition-colors">
          <Plus size={18} className="text-gray-300" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full bg-transparent text-white text-[14px] outline-none placeholder-gray-500 px-2"
        />
        <button className="p-2.5 bg-[#6C5CE7] rounded-xl flex-shrink-0 text-white hover:bg-[#5a4cdb] transition-colors shadow-sm">
          <Send size={18} className="-ml-0.5 mt-0.5" />
        </button>
      </div>
    </div>
  </div>
);

const ProfileView = ({ onSettingsClick }) => (
  <div className="flex flex-col h-full bg-[#0B0F14] overflow-y-auto pb-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="flex justify-between items-center px-4 py-4 sticky top-0 bg-[#0B0F14] z-20 border-b border-white/[0.06]">
      <div className="flex items-center gap-2 text-xl font-bold text-white tracking-tight">
        Profile
      </div>
      <div className="flex items-center gap-4">
        <IconButton icon={Plus} />
        <IconButton icon={Settings} onClick={onSettingsClick} />
      </div>
    </div>

    <div className="flex flex-col px-4 pt-6 pb-4 gap-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col max-w-[65%]">
          <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">{MOCK_USER.name}</h1>
          <p className="text-[14px] font-medium text-[#6C5CE7] mt-1 mb-3">@{MOCK_USER.username}</p>
          <p className="text-[14px] text-gray-300 leading-relaxed">{MOCK_USER.bio}</p>
        </div>

        <StoryRing hasStory={true} className="p-[2px] flex-shrink-0">
          <img src={MOCK_USER.avatar} alt="Profile" className="w-[84px] h-[84px] rounded-full object-cover border-4 border-[#0B0F14]" />
        </StoryRing>
      </div>

      <div className="flex items-center justify-between bg-[#111827] border border-white/[0.06] rounded-2xl px-6 py-4">
        <div className="flex flex-col items-center">
          <span className="font-bold text-[18px] text-white">{MOCK_USER.posts}</span>
          <span className="text-[12px] text-gray-500 font-medium">Posts</span>
        </div>
        <div className="w-[1px] h-8 bg-white/[0.06]"></div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[18px] text-white">{MOCK_USER.followers}</span>
          <span className="text-[12px] text-gray-500 font-medium">Followers</span>
        </div>
        <div className="w-[1px] h-8 bg-white/[0.06]"></div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[18px] text-white">{MOCK_USER.following}</span>
          <span className="text-[12px] text-gray-500 font-medium">Following</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-white text-[#0B0F14] rounded-xl font-bold py-2.5 text-[14px] active:scale-[0.98] transition-transform">
          Edit profile
        </button>
        <button className="flex-1 bg-[#111827] rounded-xl font-bold text-white py-2.5 text-[14px] border border-white/[0.06] active:bg-[#1A2235] transition-colors">
          Share profile
        </button>
      </div>
    </div>

    <div className="px-4 pb-3">
      <div className="flex bg-[#111827] p-1 rounded-xl border border-white/[0.06]">
        <button className="flex-1 py-2 flex justify-center items-center gap-2 bg-[#1A2235] rounded-lg shadow-sm text-white transition-all">
          <Grid size={18} />
          <span className="text-[13px] font-semibold">Posts</span>
        </button>
        <button className="flex-1 py-2 flex justify-center items-center gap-2 text-gray-500 hover:text-gray-300 transition-all">
          <Tag size={18} />
          <span className="text-[13px] font-semibold">Tagged</span>
        </button>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center pt-10 text-gray-500">
      <div className="p-5 rounded-2xl bg-[#111827] border border-white/[0.06] mb-4">
        <Grid size={28} className="text-gray-400" />
      </div>
      <p className="font-semibold text-[15px] text-white">No posts yet</p>
      <p className="text-[13px] mt-1 text-gray-500">Content you share will appear here</p>
    </div>
  </div>
);

const SettingsView = ({ onBack, isDarkMode, toggleDarkMode }) => (
  <div className="flex flex-col h-full bg-[#0B0F14] overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-[#0B0F14] z-20 border-b border-white/[0.06]">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-xl font-bold text-white tracking-tight ml-2">Settings</h1>
    </div>

    <div className="flex flex-col px-4 py-6 gap-6">
      <div className="flex items-center gap-3 bg-[#111827] px-4 py-3 rounded-lg border border-white/[0.06]">
        <Search className="text-gray-400" size={18} />
        <input type="text" placeholder="Search settings" className="bg-transparent border-none text-white outline-none w-full placeholder-gray-500 text-[14px]" />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-1">Your account</h2>
        <div className="bg-[#111827] rounded-xl border border-white/[0.06] overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 active:bg-[#1A2235] transition-colors">
            <div className="flex items-center gap-3"><User size={20} className="text-white" /><span className="text-white text-[14px] font-medium">Account center</span></div>
            <ChevronLeft size={20} className="text-gray-500 rotate-180" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider ml-1">App settings</h2>
        <div className="bg-[#111827] rounded-xl border border-white/[0.06] overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 border-b border-white/[0.06] active:bg-[#1A2235] transition-colors">
            <div className="flex items-center gap-3"><Bell size={20} className="text-white" /><span className="text-white text-[14px] font-medium">Notifications</span></div>
            <ChevronLeft size={20} className="text-gray-500 rotate-180" />
          </button>

          <div
            className="w-full flex items-center justify-between p-4 cursor-pointer active:bg-[#1A2235] transition-colors"
            onClick={toggleDarkMode}
          >
            <div className="flex items-center gap-3"><Moon size={20} className="text-white" /><span className="text-white text-[14px] font-medium">Dark mode</span></div>
            <div className={`w-11 h-6 rounded-full p-0.5 flex transition-colors duration-300 ${isDarkMode ? 'bg-[#6C5CE7]' : 'bg-gray-600'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-[#111827] rounded-xl border border-white/[0.06] overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 active:bg-[#1A2235] transition-colors">
            <div className="flex items-center gap-3 text-red-500"><LogOut size={20} /><span className="text-[14px] font-semibold">Log out</span></div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Layout Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeChat, setActiveChat] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const renderContent = () => {
    if (showNotifications) return <NotificationsView onBack={() => setShowNotifications(false)} />;
    if (showSettings) return <SettingsView onBack={() => setShowSettings(false)} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
    if (activeChat) return <ChatDetailView chat={activeChat} onBack={() => setActiveChat(null)} />;

    switch (activeTab) {
      case 'home': return <HomeView onNotificationClick={() => setShowNotifications(true)} />;
      case 'soos': return <SoosView />;
      case 'chats': return <ChatsListView onChatSelect={setActiveChat} />;
      case 'profile': return <ProfileView onSettingsClick={() => setShowSettings(true)} />;
      default: return <HomeView onNotificationClick={() => setShowNotifications(true)} />;
    }
  };

  const navItems = [
    { id: 'home', icon: Home },
    { id: 'soos', icon: Play },
    { id: 'chats', icon: MessageSquare },
    { id: 'profile', icon: User },
  ];

  return (
    <div className="bg-black w-full min-h-screen flex justify-center items-center font-sans tracking-tight overflow-hidden selection:bg-[#6C5CE7]/30">
      <div className="w-full h-[100dvh] sm:h-[92vh] sm:max-w-[430px] md:max-w-[450px] lg:max-w-[480px] sm:rounded-[3rem] sm:border-[8px] border-[#111827] overflow-hidden relative shadow-2xl bg-[#0B0F14] flex flex-col transition-all duration-500 ease-in-out">

        <div className="flex-1 overflow-hidden relative z-0 flex flex-col">
          {renderContent()}
        </div>

        {/* Floating Blurred Pill Navbar - 30% Opacity Glassmorphism */}
        {!activeChat && !showSettings && !showNotifications && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none px-6">
            <nav className="pointer-events-auto bg-[#111827]/30 backdrop-blur-2xl border border-white/[0.15] rounded-full flex justify-between items-center px-6 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-w-[340px] md:max-w-[380px] gap-4">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="p-2 flex flex-col items-center justify-center transition-transform active:scale-95"
                  >
                    <Icon
                      size={26}
                      className={isActive ? 'text-white fill-white drop-shadow-md' : 'text-gray-400 hover:text-white transition-colors'}
                      strokeWidth={isActive ? 2 : 2}
                    />
                  </button>
                )
              })}
            </nav>
          </div>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-1.5 bg-white/20 rounded-full z-[100] pointer-events-none" />
      </div>
    </div>
  );
}