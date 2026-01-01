// C:\AiCollabForTheKids\scripts\marketing\tag-bank.js
// OPUS TAG BANK v1.0.0
// STRATEGY: "ALGORITHMIC CAMOUFLAGE" (Founder Defined)
// LOGIC: Don't tag the Mission. Tag the Visual/Vibe.
// FOR THE KIDS. ALWAYS.

const TAG_STRATEGY = {
    // MERCH (The "Fit Check" Strategy)
    // Target: 18-35 Male/Female fashion feeds
    merch: [
        "#Streetwear", "#OOTD", "#FitCheck", "#UrbanStyle",
        "#HoodieSeason", "#TeeOfTheDay", "#StreetFashion",
        "#GraphicTee", "#ClothingBrand", "#Drip",
        "#Fashion", "#Style", "#Apparel", "#NewDrop"
    ],

    // DATING APP (The "Single Life" Strategy)
    // Target: People complaining about Tinder/Bumble
    dating: [
        "#DatingLife", "#Single", "#Relationships", "#DatingApps",
        "#Love", "#Tech", "#FutureOfDating", "#ModernLove",
        "#DatingAdvice", "#Introvert", "#FindLove", "#RealConnections"
    ],

    // TECH/AI (The "Builder" Strategy)
    // Target: Developers and Hustlers
    tech: [
        "#AI", "#BuildInPublic", "#Coding", "#Startup",
        "#Entrepreneur", "#TechNews", "#Innovation",
        "#Web3", "#DevLife", "#Automation", "#SaaS",
        "#NodeJS", "#Python", "#IndieHacker"
    ],

    // PASSIVE INCOME (The "Hustle" Strategy)
    // Target: Side hustle seekers
    income: [
        "#PassiveIncome", "#SideHustle", "#MakeMoneyOnline",
        "#FinancialFreedom", "#Entrepreneur", "#OnlineBusiness",
        "#WorkFromHome", "#DigitalNomad", "#MoneyTips"
    ],

    // MISSION (The "Secret Sauce" - sprinkle only 1 per post)
    // These are subtle, positive vibes - NOT charity begging
    mission: [
        "#GoodVibes", "#Impact", "#ChangeTheGame", "#MakingADifference",
        "#BuildSomethingGreat", "#TechForGood"
    ]
};

// Platform-specific tag limits
const PLATFORM_LIMITS = {
    twitter: 3,      // Twitter: 3-5 tags max for engagement
    instagram: 10,   // Instagram: up to 30, but 10-15 optimal
    tiktok: 5,       // TikTok: 3-5 hashtags
    linkedin: 3,     // LinkedIn: 3-5 professional tags
    discord: 0,      // Discord: No hashtags needed
    threads: 5       // Threads: Similar to Twitter
};

/**
 * Get viral tags for a specific category
 * @param {string} category - merch, dating, tech, income, mission
 * @param {number} count - Number of tags to return (default 3)
 * @returns {string} Space-separated hashtags
 */
function getViralTags(category, count = 3) {
    const pool = TAG_STRATEGY[category] || TAG_STRATEGY.tech;

    // Shuffle and pick 'count' tags
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    // Always add 1 mission tag for the soul, but keep it subtle
    const missionTag = TAG_STRATEGY.mission[Math.floor(Math.random() * TAG_STRATEGY.mission.length)];

    return [...selected, missionTag].join(" ");
}

/**
 * Get platform-optimized tags
 * @param {string} category - Content category
 * @param {string} platform - Target platform
 * @returns {string} Platform-optimized hashtags
 */
function getPlatformTags(category, platform = 'twitter') {
    const limit = PLATFORM_LIMITS[platform] || 3;
    return getViralTags(category, limit);
}

/**
 * Get tags as array (for platforms that need array format)
 * @param {string} category - Content category
 * @param {number} count - Number of tags
 * @returns {string[]} Array of hashtags
 */
function getTagArray(category, count = 3) {
    const pool = TAG_STRATEGY[category] || TAG_STRATEGY.tech;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    const missionTag = TAG_STRATEGY.mission[Math.floor(Math.random() * TAG_STRATEGY.mission.length)];
    return [...selected, missionTag];
}

/**
 * Get all available categories
 * @returns {string[]} List of category names
 */
function getCategories() {
    return Object.keys(TAG_STRATEGY).filter(k => k !== 'mission');
}

module.exports = {
    getViralTags,
    getPlatformTags,
    getTagArray,
    getCategories,
    TAG_STRATEGY,
    PLATFORM_LIMITS
};
