import React, { useState } from 'react';
import {
  Home, Search, Play, MessageSquare, User,
  Heart, MessageCircle, Send, Bookmark, MoreVertical,
  Plus, Bell, Settings, Phone, Video, Edit3, Grid,
  Tag, ChevronLeft, Moon, LogOut, Compass, Mic,
  Repeat, Share, Clapperboard, MessageCircleMore, X
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

const MOCK_COMMENTS = [
  { id: 1, user: 'alex_dev', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', text: 'This looks incredibly clean! 🔥', time: '2h', likes: 12 },
  { id: 2, user: 'omnexia_tech', avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop', isVoice: true, duration: '0:14', time: '1h', likes: 5 },
  { id: 3, user: 'kiara_singh', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', text: 'Love the premium framed cards touch ✨', time: '30m', likes: 2 },
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

const HomeView = ({ onNotificationClick, onCommentClick }) => {
  const [feedTab, setFeedTab] = useState('forYou'); // 'forYou' | 'democracy'

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-32 bg-gray-50 dark:bg-[#05070A] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

      {/* Sticky Top Block: Header + Vertical Stories + X-Tabs */}
      <div className="flex-none sticky top-0 z-20 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl flex flex-col pt-1 border-b border-black/5 dark:border-white/[0.08] shadow-sm">

        {/* Unique Header */}
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
            <IconButton icon={Plus} className="!p-2 bg-gray-50 dark:bg-[#111827] rounded-full border border-black/5 dark:border-white/[0.08]" />
            <IconButton icon={Bell} notification={true} className="!p-2 bg-gray-50 dark:bg-[#111827] rounded-full border border-black/5 dark:border-white/[0.08]" onClick={onNotificationClick} />
          </div>
        </div>

        {/* Stories Section */}
        <div className="flex gap-5 overflow-x-auto px-5 pt-1 pb-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0">
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

        {/* X-Style Feed Select Tabs */}
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

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-5 bg-white/30 dark:bg-[#0B0F14]/30 px-6 py-3 rounded-full border border-white/50 dark:border-white/[0.15] shadow-lg">
                  <button className="flex items-center gap-1.5 text-white hover:text-rose-500 dark:hover:text-rose-500 transition-colors active:scale-90 drop-shadow-md">
                    <Heart size={20} className={post.likes > 100 ? 'fill-rose-500 text-rose-500' : ''} />
                    <span className="text-[14px] font-bold">{post.likes}</span>
                  </button>
                  <div className="w-[1px] h-4 bg-white/40 dark:bg-white/20"></div>
                  <button
                    onClick={() => onCommentClick(post)}
                    className="flex items-center gap-1.5 text-white hover:text-gray-200 dark:hover:text-gray-300 transition-colors active:scale-90 drop-shadow-md"
                  >
                    <MessageSquare size={20} />
                    <span className="text-[14px] font-bold">12</span>
                  </button>
                  <div className="w-[1px] h-4 bg-white/40 dark:bg-white/20"></div>
                  <button className="flex items-center text-white hover:text-[#00D1FF] transition-colors active:scale-90 drop-shadow-md">
                    <Send size={20} />
                  </button>
                </div>

                <div className="absolute bottom-4 right-4">
                  <button className="bg-white/30 dark:bg-[#0B0F14]/30 p-3 rounded-full border border-white/50 dark:border-white/[0.15] text-white hover:text-gray-200 dark:hover:text-gray-300 transition-colors shadow-lg active:scale-90 drop-shadow-md">
                    <Bookmark size={20} />
                  </button>
                </div>
              </div>

              <div className="px-3 pt-4 pb-2">
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

const NotificationsView = ({ onBack }) => (
  <div className="flex flex-col h-full bg-white dark:bg-[#0B0F14] overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08]">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight ml-2">Notifications</h1>
    </div>

    <div className="flex flex-col px-4 py-5">
      <h2 className="text-[13px] font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
        This week
      </h2>
      <div className="flex flex-col gap-4 mb-8">
        {MOCK_NOTIFICATIONS.thisWeek.map(notif => (
          <div key={notif.id} className="flex items-center gap-4 bg-gray-50 dark:bg-[#111827]/40 p-3 rounded-2xl border border-black/5 dark:border-white/[0.04]">
            {notif.isTextAvatar ? (
              <div className="w-11 h-11 rounded-full border border-blue-500/50 flex items-center justify-center text-gray-900 dark:text-white text-[16px] font-semibold bg-white dark:bg-[#0B0F14] flex-shrink-0">
                {notif.initial}
              </div>
            ) : (
              <img src={notif.avatar} className="w-11 h-11 rounded-full object-cover flex-shrink-0" alt={notif.user} />
            )}
            <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-snug">
              <span className="font-bold text-gray-900 dark:text-white">{notif.user}</span> {notif.action} <span className="text-gray-500 font-medium">{notif.time}</span>
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-[13px] font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">This month</h2>
      <div className="flex flex-col gap-4">
        {MOCK_NOTIFICATIONS.thisMonth.map(notif => (
          <div key={notif.id} className="flex items-center gap-4 bg-gray-50 dark:bg-[#111827]/40 p-3 rounded-2xl border border-black/5 dark:border-white/[0.04]">
            {notif.isTextAvatar ? (
              <div className="w-11 h-11 rounded-full border border-[#00D1FF]/50 flex items-center justify-center text-gray-900 dark:text-white text-[15px] font-bold bg-white dark:bg-[#0B0F14] flex-shrink-0 shadow-sm">
                {notif.initial}
              </div>
            ) : (
              <img src={notif.avatar} className="w-11 h-11 rounded-full object-cover flex-shrink-0" alt={notif.user} />
            )}
            <p className="text-[14px] text-gray-700 dark:text-gray-300 leading-snug">
              <span className="font-bold text-gray-900 dark:text-white">{notif.user}</span> {notif.action} <span className="text-gray-500 font-medium">{notif.time}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SoosView = () => (
  <div className="h-full bg-white dark:bg-[#0B0F14] flex flex-col">
    <div className="flex-1 relative overflow-hidden rounded-b-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-10 border-b border-black/5 dark:border-white/[0.08]">
      <img
        src="https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?w=800&h=1600&fit=crop"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Video"
      />
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/80 dark:from-black/90 via-black/20 to-transparent"></div>

      {/* Elements overlaying video MUST stay white even in light mode */}
      <div className="absolute right-4 bottom-6 flex flex-col items-center gap-6 z-10">
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform active:scale-90">
          <Heart size={28} fill="white" className="drop-shadow-lg" />
          <span className="text-[13px] font-bold drop-shadow-md">45k</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform active:scale-90">
          <MessageCircle size={28} className="drop-shadow-lg" />
          <span className="text-[13px] font-bold drop-shadow-md">1k</span>
        </button>
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform active:scale-90">
          <Send size={28} className="drop-shadow-lg" />
        </button>
        <button className="flex flex-col items-center gap-2 text-white hover:scale-110 transition-transform active:scale-90">
          <MoreVertical size={28} className="drop-shadow-lg" />
        </button>
      </div>

      <div className="absolute left-4 bottom-6 right-20 z-10 text-white flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <StoryRing hasStory={true} className="w-11 h-11 flex-shrink-0">
            <img src={MOCK_USER.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          </StoryRing>
          <span className="font-bold text-[15px] drop-shadow-md tracking-tight">ganeshkgp</span>
          <button className="bg-white/20 backdrop-blur-md border border-white/30 px-3.5 py-1.5 rounded-lg text-[12px] font-bold hover:bg-white/30 transition-colors shadow-sm active:scale-95">Follow</button>
        </div>
        <p className="text-[14px] leading-relaxed drop-shadow-md font-medium">Neon aesthetics checking in 🎨✨</p>
        <div className="flex items-center gap-2 text-[12px] font-semibold text-white/90 drop-shadow-md">
          <Compass size={14} />
          <span>Original Audio - ganeshkgp</span>
        </div>
      </div>
    </div>

    <div className="h-[96px] w-full flex-none bg-white dark:bg-[#0B0F14]"></div>
  </div>
);

const ChatsListView = ({ onChatSelect }) => (
  <div className="flex flex-col h-full overflow-y-auto pb-32 bg-gray-50 dark:bg-[#05070A] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Chats</h1>
        <div className="flex items-center gap-3">
          <IconButton icon={Phone} />
          <IconButton icon={Video} />
          <IconButton icon={Edit3} />
        </div>
      </div>

      <div className="flex items-center gap-3 bg-gray-100 dark:bg-[#111827] px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/[0.08] mb-4 shadow-inner">
        <Search className="text-gray-500 dark:text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search messages"
          className="bg-transparent text-gray-900 dark:text-white w-full outline-none text-[14px] placeholder-gray-500 font-medium"
        />
      </div>

      <div className="flex bg-gray-100 dark:bg-[#111827] p-1 rounded-xl border border-black/5 dark:border-white/[0.08] shadow-sm">
        <button className="flex-1 py-1.5 flex justify-center items-center bg-white dark:bg-[#1A2235] rounded-lg shadow-sm text-gray-900 dark:text-white text-[13px] font-bold transition-all">
          Private
        </button>
        <button className="flex-1 py-1.5 flex justify-center items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-[13px] font-bold transition-all">
          Public
        </button>
      </div>
    </div>

    <div className="flex flex-col mt-5 mb-3">
      <h2 className="px-4 text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-3">Active Now</h2>
      <div className="flex gap-3 overflow-x-auto px-4 pb-4 border-b border-black/5 dark:border-white/[0.06] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex flex-col items-center justify-center min-w-[68px] h-[86px] rounded-2xl bg-white dark:bg-[#111827] border border-black/10 dark:border-white/[0.1] border-dashed cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors active:scale-95">
          <Plus size={20} className="text-gray-400" />
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold mt-2">New</span>
        </div>

        {MOCK_USERS.filter(u => !u.isMe && u.hasStory).map(user => (
          <div key={user.id} className="relative flex flex-col items-center justify-center min-w-[68px] h-[86px] rounded-2xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] overflow-hidden cursor-pointer group hover:border-[#6C5CE7]/50 transition-colors active:scale-95 shadow-sm">
            <img src={user.avatar} className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-30 group-hover:opacity-20 dark:group-hover:opacity-50 transition-opacity blur-[2px]" alt="bg" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-[#0B0F14]/90 via-white/40 dark:via-[#0B0F14]/40 to-transparent"></div>

            <img src={user.avatar} className="w-9 h-9 rounded-full border border-white/50 dark:border-white/20 z-10 mb-1 shadow-md" alt="avatar" />
            <span className="text-[11px] text-gray-900 dark:text-white font-bold z-10 truncate w-[80%] text-center tracking-tight">{user.user.split(' ')[0]}</span>
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-[#0B0F14] shadow-sm"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-1.5 px-3 pt-2">
      {MOCK_CHATS.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat)}
          className={`flex items-center gap-3 px-3 py-3 rounded-2xl cursor-pointer transition-colors active:scale-[0.98] ${chat.unread > 0
              ? 'bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] shadow-sm'
              : 'bg-transparent hover:bg-gray-100 dark:hover:bg-[#111827]/50 border border-transparent'
            }`}
        >
          <div className="relative flex-shrink-0">
            <img src={chat.avatar} alt={chat.name} className="w-[50px] h-[50px] rounded-[16px] object-cover border border-black/5 dark:border-white/[0.04]" />
            {chat.hasStory && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#6C5CE7] border-[2.5px] border-white dark:border-[#0B0F14] rounded-full shadow-[0_0_6px_rgba(108,92,231,0.5)]"></span>
            )}
          </div>

          <div className="flex flex-col flex-1 min-w-0 justify-center">
            <div className="flex justify-between items-center mb-0.5">
              <h3 className={`text-[15px] tracking-tight truncate pr-2 ${chat.unread > 0 ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-700 dark:text-gray-300 font-bold'}`}>{chat.name}</h3>
              <span className={`text-[12px] whitespace-nowrap ${chat.unread > 0 ? 'text-[#6C5CE7] dark:text-[#00D1FF] font-bold' : 'text-gray-500 font-medium'}`}>{chat.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className={`text-[13px] leading-snug truncate pr-4 ${chat.unread > 0 ? 'text-gray-800 dark:text-gray-200 font-semibold' : 'text-gray-500 font-medium'}`}>{chat.msg}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChatDetailView = ({ chat, onBack }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0B0F14]">
      <div className="flex items-center justify-between px-4 py-4 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/[0.08] z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
          <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-[14px] object-cover border border-black/5 dark:border-white/[0.06]" />
          <div className="flex flex-col">
            <span className="text-gray-900 dark:text-white font-bold text-[15px] tracking-tight leading-tight">{chat.name}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_4px_rgba(34,197,94,0.6)]"></span>
              <span className="text-gray-500 dark:text-gray-400 text-[12px] font-semibold">Active now</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <IconButton icon={Phone} className="active:scale-90" />
          <IconButton icon={Video} className="active:scale-90" />
          <IconButton icon={MoreVertical} className="active:scale-90" onClick={() => setShowMenu(!showMenu)} />

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)}></div>
              <div className="absolute right-0 top-full mt-4 w-40 bg-white dark:bg-[#111827] border border-black/10 dark:border-white/[0.08] rounded-2xl shadow-xl z-20 overflow-hidden flex flex-col py-2">
                {['test 1', 'test 2', 'test 3', 'test 4', 'test 5'].map((item, idx) => (
                  <button key={idx} className="w-full text-left px-4 py-2.5 text-[14px] text-gray-900 dark:text-white font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors active:bg-black/10 dark:active:bg-white/10">
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex justify-center my-4">
          <span className="text-[12px] font-bold text-gray-500 dark:text-gray-400 bg-white dark:bg-[#111827] px-3 py-1 rounded-full border border-black/5 dark:border-white/[0.08] shadow-sm uppercase tracking-wider">18 Mar 2026, 10:42 AM</span>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[75%] bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] text-gray-900 dark:text-white rounded-[20px] rounded-bl-sm px-4 py-3 shadow-sm">
            <p className="text-[14px] leading-relaxed font-medium">Hey, are we still meeting later?</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[75%] bg-gradient-to-tr from-[#6C5CE7] to-[#8c7df0] text-white rounded-[20px] rounded-br-sm px-4 py-3 shadow-md">
            <p className="text-[14px] leading-relaxed font-medium">{chat.msg}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 bg-white dark:bg-[#0B0F14] border-t border-black/5 dark:border-white/[0.08] pb-8 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#111827] rounded-2xl p-1.5 border border-black/5 dark:border-white/[0.08] focus-within:border-black/20 dark:focus-within:border-white/[0.2] transition-colors shadow-inner">
          <button className="p-2.5 bg-gray-200 dark:bg-[#1A2235] rounded-xl flex-shrink-0 hover:bg-gray-300 dark:hover:bg-white/10 transition-colors active:scale-90 shadow-sm">
            <Plus size={18} className="text-gray-600 dark:text-gray-300" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-transparent text-gray-900 dark:text-white text-[14px] outline-none placeholder-gray-500 font-medium px-2"
          />
          <button className="p-2.5 bg-transparent rounded-xl flex-shrink-0 text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#00D1FF] hover:bg-black/5 dark:hover:bg-white/5 transition-colors active:scale-90">
            <Mic size={18} />
          </button>
          <button className="p-2.5 bg-[#6C5CE7] rounded-xl flex-shrink-0 text-white hover:bg-[#5a4cdb] transition-colors shadow-md active:scale-90">
            <Send size={18} className="-ml-0.5 mt-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileView = ({ onSettingsClick }) => (
  <div className="flex flex-col h-full bg-gray-50 dark:bg-[#05070A] overflow-y-auto pb-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="flex justify-between items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
      <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white tracking-tight">
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
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">{MOCK_USER.name}</h1>
          <p className="text-[14px] font-bold text-[#6C5CE7] mt-1 mb-3">@{MOCK_USER.username}</p>
          <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{MOCK_USER.bio}</p>
        </div>

        <StoryRing hasStory={true} className="w-[84px] h-[84px] flex-shrink-0 shadow-lg">
          <img src={MOCK_USER.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
        </StoryRing>
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] rounded-2xl px-6 py-4 shadow-lg">
        <div className="flex flex-col items-center">
          <span className="font-bold text-[18px] text-gray-900 dark:text-white tracking-tight">{MOCK_USER.posts}</span>
          <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Posts</span>
        </div>
        <div className="w-[1px] h-8 bg-black/10 dark:bg-white/[0.1]"></div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[18px] text-gray-900 dark:text-white tracking-tight">{MOCK_USER.followers}</span>
          <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Followers</span>
        </div>
        <div className="w-[1px] h-8 bg-black/10 dark:bg-white/[0.1]"></div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[18px] text-gray-900 dark:text-white tracking-tight">{MOCK_USER.following}</span>
          <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">Following</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-[#0B0F14] rounded-xl font-bold py-2.5 text-[14px] active:scale-[0.98] transition-transform shadow-md">
          Edit profile
        </button>
        <button className="flex-1 bg-white dark:bg-[#111827] rounded-xl font-bold text-gray-900 dark:text-white py-2.5 text-[14px] border border-black/10 dark:border-white/[0.08] hover:bg-gray-50 dark:active:bg-[#1A2235] transition-colors shadow-sm">
          Share profile
        </button>
      </div>
    </div>

    <div className="px-4 pb-3">
      <div className="flex bg-white dark:bg-[#111827] p-1 rounded-xl border border-black/5 dark:border-white/[0.08] shadow-inner">
        <button className="flex-1 py-2 flex justify-center items-center gap-2 bg-gray-100 dark:bg-[#1A2235] rounded-lg shadow-sm text-gray-900 dark:text-white transition-all">
          <Grid size={18} />
          <span className="text-[13px] font-bold">Posts</span>
        </button>
        <button className="flex-1 py-2 flex justify-center items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all font-bold">
          <Tag size={18} />
          <span className="text-[13px]">Tagged</span>
        </button>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center pt-10 text-gray-500">
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/[0.08] mb-4 shadow-sm">
        <Grid size={28} className="text-gray-400" />
      </div>
      <p className="font-bold text-[15px] text-gray-900 dark:text-white">No posts yet</p>
      <p className="text-[13px] mt-1 text-gray-500 font-medium">Content you share will appear here</p>
    </div>
  </div>
);

const SettingsView = ({ onBack, isDarkMode, toggleDarkMode }) => (
  <div className="flex flex-col h-full bg-white dark:bg-[#0B0F14] overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
    <div className="flex items-center px-4 py-4 sticky top-0 bg-white/90 dark:bg-[#0B0F14]/90 backdrop-blur-xl z-20 border-b border-black/5 dark:border-white/[0.08] shadow-sm">
      <IconButton icon={ChevronLeft} onClick={onBack} className="-ml-2" />
      <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight ml-2">Settings</h1>
    </div>

    <div className="flex flex-col px-4 py-6 gap-6">
      <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#111827] px-4 py-3 rounded-xl border border-black/5 dark:border-white/[0.08] shadow-inner">
        <Search className="text-gray-400" size={18} />
        <input type="text" placeholder="Search settings" className="bg-transparent border-none text-gray-900 dark:text-white outline-none w-full placeholder-gray-500 text-[14px] font-medium" />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">Your account</h2>
        <div className="bg-gray-50 dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/[0.08] overflow-hidden shadow-sm">
          <button className="w-full flex items-center justify-between p-4 active:bg-gray-200 dark:active:bg-[#1A2235] transition-colors">
            <div className="flex items-center gap-3"><User size={20} className="text-gray-900 dark:text-white" /><span className="text-gray-900 dark:text-white text-[15px] font-bold">Account center</span></div>
            <ChevronLeft size={20} className="text-gray-500 rotate-180" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider ml-1">App settings</h2>
        <div className="bg-gray-50 dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/[0.08] overflow-hidden shadow-sm">
          <button className="w-full flex items-center justify-between p-4 border-b border-black/5 dark:border-white/[0.06] active:bg-gray-200 dark:active:bg-[#1A2235] transition-colors">
            <div className="flex items-center gap-3"><Bell size={20} className="text-gray-900 dark:text-white" /><span className="text-gray-900 dark:text-white text-[15px] font-bold">Notifications</span></div>
            <ChevronLeft size={20} className="text-gray-500 rotate-180" />
          </button>

          <div
            className="w-full flex items-center justify-between p-4 cursor-pointer active:bg-gray-200 dark:active:bg-[#1A2235] transition-colors"
            onClick={toggleDarkMode}
          >
            <div className="flex items-center gap-3"><Moon size={20} className="text-gray-900 dark:text-white" /><span className="text-gray-900 dark:text-white text-[15px] font-bold">Dark mode</span></div>
            <div className={`w-11 h-6 rounded-full p-0.5 flex transition-colors duration-300 shadow-inner ${isDarkMode ? 'bg-[#6C5CE7]' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="bg-gray-50 dark:bg-[#111827] rounded-2xl border border-black/5 dark:border-white/[0.08] overflow-hidden shadow-sm">
          <button className="w-full flex items-center justify-between p-4 active:bg-gray-200 dark:active:bg-[#1A2235] transition-colors">
            <div className="flex items-center gap-3 text-rose-500"><LogOut size={20} /><span className="text-[15px] font-bold">Log out</span></div>
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
  const [activePostComments, setActivePostComments] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const renderContent = () => {
    if (showNotifications) return <NotificationsView onBack={() => setShowNotifications(false)} />;
    if (showSettings) return <SettingsView onBack={() => setShowSettings(false)} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
    if (activeChat) return <ChatDetailView chat={activeChat} onBack={() => setActiveChat(null)} />;

    switch (activeTab) {
      case 'home': return <HomeView onNotificationClick={() => setShowNotifications(true)} onCommentClick={setActivePostComments} />;
      case 'soos': return <SoosView />;
      case 'chats': return <ChatsListView onChatSelect={setActiveChat} />;
      case 'profile': return <ProfileView onSettingsClick={() => setShowSettings(true)} />;
      default: return <HomeView onNotificationClick={() => setShowNotifications(true)} onCommentClick={setActivePostComments} />;
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
        {!activeChat && !showSettings && !showNotifications && !activePostComments && (
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