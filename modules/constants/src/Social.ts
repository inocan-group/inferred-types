interface SocialMediaCompany {
  name: string;
  description: string;
  baseUrls: string[];
  profileUrl: string;
  approximateUserSize?: number;
  tickerSymbol?: string;
}

export const SOCIAL_MEDIA = [
  {
    name: "Facebook",
    description: "Connect with friends, family, and communities worldwide on one of the largest social networks.",
    baseUrls: ["https://www.facebook.com"],
    profileUrl: "https://www.facebook.com/:user_id",
    approximateUserSize: 3000000000, // 3 billion
    tickerSymbol: "META",
  },
  {
    name: "YouTube",
    description: "A platform for sharing and watching videos, connecting creators with audiences globally.",
    baseUrls: ["https://www.youtube.com"],
    profileUrl: "https://www.youtube.com/user/:user_id",
    approximateUserSize: 2500000000, // 2.5 billion
    tickerSymbol: "GOOGL",
  },
  {
    name: "WhatsApp",
    description: "A secure messaging app for personal and business communication.",
    baseUrls: ["https://www.whatsapp.com", "https://wa.me"],
    profileUrl: "https://wa.me/:user_id",
    approximateUserSize: 2000000000, // 2 billion
    tickerSymbol: "META",
  },
  {
    name: "Instagram",
    description: "Share photos and videos with friends and followers through posts, stories, and reels.",
    baseUrls: ["https://www.instagram.com"],
    profileUrl: "https://www.instagram.com/:user_id",
    approximateUserSize: 2000000000, // 2 billion
    tickerSymbol: "META",
  },
  {
    name: "TikTok",
    description: "A short-form video platform known for its highly engaging content and viral trends.",
    baseUrls: ["https://www.tiktok.com"],
    profileUrl: "https://www.tiktok.com/@:user_id",
    approximateUserSize: 1600000000, // 1.6 billion
  },
  {
    name: "WeChat",
    description: "China's popular messaging and lifestyle app, integrating social media and mobile payments.",
    baseUrls: ["https://www.wechat.com"],
    profileUrl: "https://www.wechat.com/:user_id", // Profile URLs typically restricted in China
    approximateUserSize: 1300000000, // 1.3 billion
  },
  {
    name: "Facebook Messenger",
    description: "A messaging app used for personal and business interactions, seamlessly integrated with Facebook.",
    baseUrls: ["https://www.messenger.com"],
    profileUrl: "https://www.messenger.com/t/:user_id",
    approximateUserSize: 1000000000, // 1 billion
    tickerSymbol: "META",
  },
  {
    name: "Telegram",
    description: "A messaging platform focused on privacy, with channels and group capabilities.",
    baseUrls: ["https://www.telegram.org", "https://t.me"],
    profileUrl: "https://t.me/:user_id",
    approximateUserSize: 900000000, // 900 million
  },
  {
    name: "Snapchat",
    description: "A multimedia app popular for its disappearing messages and creative filters.",
    baseUrls: ["https://www.snapchat.com"],
    profileUrl: "https://www.snapchat.com/add/:user_id",
    approximateUserSize: 800000000, // 800 million
    tickerSymbol: "SNAP",
  },
  {
    name: "Douyin",
    description: "The Chinese version of TikTok, with similar short-form video content tailored for China.",
    baseUrls: ["https://www.douyin.com"],
    profileUrl: "https://www.douyin.com/user/:user_id",
    approximateUserSize: 750000000, // 750 million
  },
  {
    name: "LinkedIn",
    description: "The largest professional networking platform, where users connect for career opportunities, insights, and business networking.",
    baseUrls: ["https://www.linkedin.com"],
    profileUrl: "https://www.linkedin.com/in/:user_id",
    approximateUserSize: 930000000, // 930 million
    tickerSymbol: "MSFT",
  },
  {
    name: "X (formerly Twitter)",
    description: "A platform for real-time updates, news sharing, and public discourse with a focus on brief, impactful posts.",
    baseUrls: ["https://www.twitter.com", "https://x.com"],
    profileUrl: "https://twitter.com/:user_id",
    approximateUserSize: 540000000, // 540 million
  },
  {
    name: "Pinterest",
    description: "A visually-driven platform for sharing ideas, DIY projects, fashion, and more.",
    baseUrls: ["https://www.pinterest.com"],
    profileUrl: "https://www.pinterest.com/:user_id",
    approximateUserSize: 460000000, // 460 million
    tickerSymbol: "PINS",
  },
  {
    name: "Reddit",
    description: "A community-driven platform organized into niche forums or 'subreddits' focused on various topics.",
    baseUrls: ["https://www.reddit.com"],
    profileUrl: "https://www.reddit.com/user/:user_id",
    approximateUserSize: 430000000, // 430 million
  },
  {
    name: "Clubhouse",
    description: "A voice-based social network where users engage in live audio conversations on various topics.",
    baseUrls: ["https://www.clubhouse.com"],
    profileUrl: "https://www.clubhouse.com/:user_id",
    approximateUserSize: 10000000, // 10 million
  },
  {
    name: "Discord",
    description: "Originally aimed at gamers, Discord is now widely used by various communities for group chat, video, and voice calls.",
    baseUrls: ["https://www.discord.com", "https://discord.com"],
    profileUrl: "https://discord.com/users/:user_id",
    approximateUserSize: 300000000, // 300 million
  },
] as const satisfies SocialMediaCompany[];
