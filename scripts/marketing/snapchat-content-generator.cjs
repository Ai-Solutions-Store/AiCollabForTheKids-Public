/**
 * Snapchat Content Generator - Smartphone Zombies Merch Marketing
 * Targets younger demographics (Gen Z/Alpha) with platform-native content
 * 60% of profits go to Kids DAO (Verified Medical Pediatrics)
 * FOR THE KIDS - 60/30/10
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs\\snapchat-content';
const LOG_FILE = path.join(LOGS_DIR, 'snapchat-generator.log');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

// ============================================================================
// STORY IDEAS - Ephemeral content that drives urgency
// ============================================================================
const STORY_IDEAS = [
    {
        title: "Zombie Check Challenge",
        type: "interactive_poll",
        slides: [
            "Slide 1: 'Be honest... how long since you looked at your phone?' with timer graphic",
            "Slide 2: Poll - 'Are you a Smartphone Zombie?' Yes/No/I'm literally on my phone rn",
            "Slide 3: 'Same. That's why we made this merch' - show hoodie",
            "Slide 4: Swipe up - '60% goes to help kids'"
        ],
        duration: "4 slides, 5 sec each",
        cta: "Swipe up for merch",
        hashtags: "#SmartphoneZombies #UnplugForKids #MerchDrop"
    },
    {
        title: "POV: You're Walking Home",
        type: "relatable_comedy",
        slides: [
            "Slide 1: POV walking, looking at phone",
            "Slide 2: Almost bumps into pole",
            "Slide 3: Text overlay: 'wait... am I a smartphone zombie?'",
            "Slide 4: Show Smartphone Zombies tee - 'at least look cute doing it'",
            "Slide 5: '60% to kids medical care btw'"
        ],
        duration: "5 slides, 4 sec each",
        cta: "Tap for link",
        hashtags: "#POV #SmartphoneZombies #GenZ"
    },
    {
        title: "Fit Check But Make It Charitable",
        type: "fashion_forward",
        slides: [
            "Slide 1: GRWM vibes - getting ready",
            "Slide 2: 'Today's fit has a purpose'",
            "Slide 3: Show Smartphone Zombies hoodie styling",
            "Slide 4: 'Every purchase helps a kid get medical care'",
            "Slide 5: Price points overlay - swipe up"
        ],
        duration: "5 slides, 5 sec each",
        cta: "Swipe up to cop",
        hashtags: "#FitCheck #GRWM #CharityFashion"
    },
    {
        title: "This or That: Zombie Edition",
        type: "interactive_game",
        slides: [
            "Slide 1: 'This or That: Zombie Edition'",
            "Slide 2: 'Hoodie or Tee?' - side by side products",
            "Slide 3: 'Phone case or Stickers?' - side by side",
            "Slide 4: 'Plot twist: they all help kids'",
            "Slide 5: Link to shop"
        ],
        duration: "5 slides, 4 sec each",
        cta: "Tap to choose",
        hashtags: "#ThisOrThat #SmartphoneZombies #MerchDrop"
    },
    {
        title: "24 Hours Being Self-Aware",
        type: "day_in_life",
        slides: [
            "Slide 1: Morning - checking phone first thing 'yep, zombie'",
            "Slide 2: Commute - scrolling (wearing the merch)",
            "Slide 3: Lunch - 'at least I'm helping kids'",
            "Slide 4: Night - 'one more TikTok' in Zombie hoodie",
            "Slide 5: '60% of this hoodie goes to medical care'"
        ],
        duration: "5 slides, 5 sec each",
        cta: "Link in bio",
        hashtags: "#DayInMyLife #SmartphoneZombies #SelfAware"
    },
    {
        title: "The Algorithm Sent You Here",
        type: "meta_humor",
        slides: [
            "Slide 1: 'the algorithm really said: you need this'",
            "Slide 2: Show Smartphone Zombies design close-up",
            "Slide 3: 'it's giving... self-aware king/queen energy'",
            "Slide 4: 'also 60% goes to help sick kids so'",
            "Slide 5: 'might as well'"
        ],
        duration: "5 slides, 4 sec each",
        cta: "Swipe up bestie",
        hashtags: "#TheAlgorithm #ForYou #SmartphoneZombies"
    }
];

// ============================================================================
// SPOTLIGHT VIDEO CONCEPTS - Vertical video for discovery
// ============================================================================
const SPOTLIGHT_CONCEPTS = [
    {
        title: "The Zombie Walk Trend",
        concept: "Start a trend where people do the 'zombie walk' (shuffling while looking at phone) then reveal they're wearing the merch",
        hook: "POV: They finally made merch for our behavior",
        duration: "15-30 seconds",
        script: `
SCENE 1 (0-5s): Person zombie-walking through public space, phone in face
SCENE 2 (5-10s): Almost bumps into something/someone
SCENE 3 (10-15s): Looks up, camera reveals Smartphone Zombies tee
TEXT: "At least I'm self-aware AND helping kids"
SCENE 4 (15-20s): Show merch details, price
CTA: "60% to Kids DAO - link in bio"
        `,
        sound: "Trending audio or 'Thriller' remix",
        hashtags: "#SmartphoneZombies #ZombieWalk #ForTheKids #MerchDrop"
    },
    {
        title: "Unboxing But Make It Gen Z",
        concept: "Chaotic unboxing energy - hype up the merch while acknowledging the irony",
        hook: "unboxing the most self-aware merch ever created",
        duration: "30-60 seconds",
        script: `
SCENE 1 (0-5s): "okay so I ordered something unhinged"
SCENE 2 (5-15s): Unbox package, reveal items one by one
SCENE 3 (15-25s): Try on the hoodie, model it
SCENE 4 (25-35s): "the best part? 60% goes to help kids"
SCENE 5 (35-45s): Show all items together
CTA: "link in bio - do it for the kids fr"
        `,
        sound: "Hype music / trending unboxing audio",
        hashtags: "#Unboxing #SmartphoneZombies #HaulTok #Charity"
    },
    {
        title: "Calling Out Friends Challenge",
        concept: "Film friend being a smartphone zombie, surprise them with the merch as a 'gift'",
        hook: "Caught my friend being a smartphone zombie so I got them this",
        duration: "20-40 seconds",
        script: `
SCENE 1 (0-8s): Film friend scrolling, oblivious to world
SCENE 2 (8-15s): "bro... you need this"
SCENE 3 (15-25s): Hand them the Smartphone Zombies tee/hoodie
SCENE 4 (25-35s): Their reaction, trying it on
TEXT: "60% helps kids + they're self-aware now"
CTA: "Get one for your zombie friend"
        `,
        sound: "Comedic revelation audio",
        hashtags: "#CallingOutFriends #SmartphoneZombies #GiftIdeas"
    },
    {
        title: "The Screen Time Reveal",
        concept: "Show screen time stats, then reveal the merch as 'acceptance'",
        hook: "My screen time hit 8 hours so I did this",
        duration: "15-30 seconds",
        script: `
SCENE 1 (0-5s): Show phone screen time stats (high number)
SCENE 2 (5-10s): Shocked face reaction
SCENE 3 (10-20s): "So I decided to embrace it"
SCENE 4 (20-30s): Reveal wearing Smartphone Zombies merch
TEXT: "At least 60% goes to help kids"
        `,
        sound: "Dramatic reveal audio",
        hashtags: "#ScreenTime #SmartphoneZombies #SelfAwareness"
    },
    {
        title: "Rate My Fit: Charity Edition",
        concept: "Fashion-focused content showcasing different ways to style the merch",
        hook: "Fits that help kids? Rate them 1-10",
        duration: "30-45 seconds",
        script: `
SCENE 1: Casual fit with Zombie tee - streetwear vibes
SCENE 2: Hoodie oversized with leggings - cozy era
SCENE 3: Phone case flex - aesthetic setup
SCENE 4: Full merch stack - all items
TEXT PER SCENE: Price + "60% to kids medical care"
CTA: "Which fit goes hardest? Link in bio"
        `,
        sound: "Trending fashion audio",
        hashtags: "#OOTD #RateMyFit #CharityFashion #SmartphoneZombies"
    },
    {
        title: "Evolution of a Zombie",
        concept: "Quick cuts showing progression from normal person to smartphone zombie",
        hook: "The evolution of a smartphone zombie (2015-2024)",
        duration: "15-30 seconds",
        script: `
2015: Flip phone, touching grass
2018: First iPhone, starting to look down
2020: Pandemic, permanently attached
2024: Full zombie mode, wearing the merch proudly
FINAL: "Might as well help kids while we're at it"
        `,
        sound: "Evolution/transformation trending audio",
        hashtags: "#Evolution #SmartphoneZombies #Relatable"
    }
];

// ============================================================================
// AR LENS SUGGESTIONS - Interactive camera experiences
// ============================================================================
const AR_LENS_IDEAS = [
    {
        name: "Zombie-O-Meter Lens",
        type: "face_tracking",
        description: "Scans your face and gives you a 'Zombie Level' based on how tired/screen-fatigued you look",
        features: [
            "Face scan animation with green zombie tint",
            "Percentage meter that fills up",
            "End screen shows Smartphone Zombies merch",
            "Share button with 'I'm __% zombie' text"
        ],
        virality: "High - people love sharing quiz/rating results",
        cta: "Tap to shop the look"
    },
    {
        name: "Try-On: Zombie Tee",
        type: "body_tracking",
        description: "Virtual try-on lens that overlays the Smartphone Zombies t-shirt design on user",
        features: [
            "Realistic fabric simulation",
            "Multiple color options to swipe through",
            "Price overlay in corner",
            "Direct link to purchase"
        ],
        virality: "Medium-High - shopping lenses drive conversion",
        cta: "Swipe up to buy"
    },
    {
        name: "Zombie Filter",
        type: "face_filter",
        description: "Turns user into a smartphone zombie with glowing screen-lit face, glazed eyes",
        features: [
            "Zombie skin texture overlay",
            "Blue light glow effect on face",
            "Phone reflection in eyes",
            "Smartphone Zombies logo watermark",
            "'60% to kids' text appears"
        ],
        virality: "Very High - shareable transformation content",
        cta: "Link to merch in lens info"
    },
    {
        name: "Walking Zombie World Lens",
        type: "world_tracking",
        description: "AR world lens that shows zombie warning signs popping up around you",
        features: [
            "3D warning signs appear in environment",
            "'Beware of Smartphone Zombies' signs spawn",
            "Mini zombie characters walking and scrolling",
            "Merch items floating in AR space to tap"
        ],
        virality: "High - immersive AR experiences get shares",
        cta: "Tap floating merch to shop"
    },
    {
        name: "Screen Time Roast Lens",
        type: "interactive",
        description: "Lens that 'roasts' users about their phone addiction with funny text overlays",
        features: [
            "Random roast text appears: 'You've been scrolling for HOW long?'",
            "Timer showing 'time since last phone break'",
            "Zombie transformation happens gradually",
            "End card shows merch with 'Embrace it' message"
        ],
        virality: "Very High - humor + relatability",
        cta: "Might as well look cute - shop now"
    },
    {
        name: "Charity Impact Lens",
        type: "educational",
        description: "Shows the real impact - for every hoodie, shows a kid helped animation",
        features: [
            "Heart animation when product shown",
            "'60% to Kids DAO' prominently displayed",
            "Counter showing 'Kids helped today'",
            "Warm, positive aesthetic",
            "QR code to learn more"
        ],
        virality: "Medium - emotional connection drives shares",
        cta: "Every purchase helps - tap to shop"
    }
];

// ============================================================================
// QUICK PROMOTIONAL CONTENT - Snappy, scroll-stopping content
// ============================================================================
const QUICK_PROMOS = [
    {
        type: "text_overlay",
        duration: "3-5 sec",
        content: "your screen time is embarrassing but at least this hoodie helps kids",
        visual: "Hoodie product shot with glitch effect",
        price: "$44.99",
        cta: "swipe up bestie"
    },
    {
        type: "meme_format",
        duration: "5 sec",
        content: "nobody:\nme at 3am: *adds Smartphone Zombies merch to cart*\nalso me: 'it's for the kids'",
        visual: "Product carousel with late-night aesthetic",
        price: "From $4.99",
        cta: "link in bio"
    },
    {
        type: "quick_flex",
        duration: "3 sec",
        content: "fit check + charity work in one purchase",
        visual: "Quick outfit transition wearing merch",
        price: "Tees from $24.99",
        cta: "tap for details"
    },
    {
        type: "fomo_alert",
        duration: "4 sec",
        content: "pov: you could've helped a kid AND looked fire but you didn't swipe up",
        visual: "Merch showcase with urgency countdown aesthetic",
        price: "60% to charity",
        cta: "don't be that person"
    },
    {
        type: "comparison",
        duration: "5 sec",
        content: "regular merch: $40, helps no one | this merch: $44.99, helps sick kids",
        visual: "Split screen comparison",
        price: "Hoodies $44.99",
        cta: "easy choice tbh"
    },
    {
        type: "aesthetic_drop",
        duration: "4 sec",
        content: "new phone case just dropped and it's actually doing good",
        visual: "Phone case product shot, aesthetic lighting",
        price: "$29.99",
        cta: "60% to Kids DAO"
    },
    {
        type: "real_talk",
        duration: "5 sec",
        content: "not to be that person but your sticker collection could literally help a kid",
        visual: "Sticker designs showcase",
        price: "From $4.99",
        cta: "just saying"
    },
    {
        type: "trend_hijack",
        duration: "3 sec",
        content: "the 'I'm chronically online' starter pack that actually does good",
        visual: "Starter pack meme format with products",
        price: "Bundle available",
        cta: "dm to order"
    },
    {
        type: "self_aware_king",
        duration: "4 sec",
        content: "being a smartphone zombie but making it philanthropic",
        visual: "Someone in full merch outfit, scrolling phone",
        price: "Full fit under $100",
        cta: "swipe for link"
    },
    {
        type: "late_night_vibes",
        duration: "4 sec",
        content: "2am purchases that won't give you buyer's remorse",
        visual: "Cozy night aesthetic, merch laid out",
        price: "Worth it for the kids",
        cta: "you know you want to"
    }
];

// ============================================================================
// CONTENT GENERATION FUNCTIONS
// ============================================================================

function generateStoryContent() {
    const story = STORY_IDEAS[Math.floor(Math.random() * STORY_IDEAS.length)];
    return {
        ...story,
        generated: new Date().toISOString(),
        readyForUpload: true
    };
}

function generateSpotlightConcept() {
    const spotlight = SPOTLIGHT_CONCEPTS[Math.floor(Math.random() * SPOTLIGHT_CONCEPTS.length)];
    return {
        ...spotlight,
        generated: new Date().toISOString(),
        readyForProduction: true
    };
}

function generateARLensIdea() {
    const lens = AR_LENS_IDEAS[Math.floor(Math.random() * AR_LENS_IDEAS.length)];
    return {
        ...lens,
        generated: new Date().toISOString(),
        developmentPriority: lens.virality === "Very High" ? "HIGH" : "MEDIUM"
    };
}

function generateQuickPromo() {
    const promo = QUICK_PROMOS[Math.floor(Math.random() * QUICK_PROMOS.length)];
    return {
        ...promo,
        generated: new Date().toISOString(),
        platform: "Snapchat"
    };
}

function generateFullContentPack() {
    return {
        story: generateStoryContent(),
        spotlight: generateSpotlightConcept(),
        arLens: generateARLensIdea(),
        quickPromo: generateQuickPromo(),
        allStories: STORY_IDEAS,
        allSpotlights: SPOTLIGHT_CONCEPTS,
        allARLenses: AR_LENS_IDEAS,
        allQuickPromos: QUICK_PROMOS,
        generatedAt: new Date().toISOString(),
        campaign: "Smartphone Zombies Merch",
        targetDemographic: "Gen Z / Gen Alpha (13-25)",
        charityInfo: "60% of profits to Kids DAO (Verified Medical Pediatrics)"
    };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
    log('================================================================');
    log('SNAPCHAT CONTENT GENERATOR - SMARTPHONE ZOMBIES MERCH');
    log('FOR THE KIDS - 60/30/10');
    log('================================================================');

    const contentPack = generateFullContentPack();

    // Log featured content
    log('\n--- FEATURED STORY IDEA ---');
    log(`Title: ${contentPack.story.title}`);
    log(`Type: ${contentPack.story.type}`);
    log(`Duration: ${contentPack.story.duration}`);
    log(`CTA: ${contentPack.story.cta}`);
    log(`Hashtags: ${contentPack.story.hashtags}`);

    log('\n--- FEATURED SPOTLIGHT CONCEPT ---');
    log(`Title: ${contentPack.spotlight.title}`);
    log(`Hook: ${contentPack.spotlight.hook}`);
    log(`Duration: ${contentPack.spotlight.duration}`);
    log(`Hashtags: ${contentPack.spotlight.hashtags}`);

    log('\n--- FEATURED AR LENS IDEA ---');
    log(`Name: ${contentPack.arLens.name}`);
    log(`Type: ${contentPack.arLens.type}`);
    log(`Virality Potential: ${contentPack.arLens.virality}`);
    log(`CTA: ${contentPack.arLens.cta}`);

    log('\n--- FEATURED QUICK PROMO ---');
    log(`Type: ${contentPack.quickPromo.type}`);
    log(`Content: ${contentPack.quickPromo.content}`);
    log(`Price: ${contentPack.quickPromo.price}`);
    log(`CTA: ${contentPack.quickPromo.cta}`);

    // Save full content pack
    const outputFile = path.join(LOGS_DIR, 'snapchat-content-pack.json');
    fs.writeFileSync(outputFile, JSON.stringify(contentPack, null, 2));
    log(`\nFull content pack saved to: ${outputFile}`);

    // Save ready-to-post content
    const readyContent = `# Snapchat Content Pack - Smartphone Zombies Merch
## Generated: ${new Date().toISOString()}

---

## FEATURED STORY: ${contentPack.story.title}
**Type:** ${contentPack.story.type}
**Duration:** ${contentPack.story.duration}

### Slides:
${contentPack.story.slides.map((s, i) => `${i + 1}. ${s}`).join('\n')}

**CTA:** ${contentPack.story.cta}
**Hashtags:** ${contentPack.story.hashtags}

---

## FEATURED SPOTLIGHT: ${contentPack.spotlight.title}
**Hook:** "${contentPack.spotlight.hook}"
**Duration:** ${contentPack.spotlight.duration}

### Script:
${contentPack.spotlight.script}

**Sound:** ${contentPack.spotlight.sound}
**Hashtags:** ${contentPack.spotlight.hashtags}

---

## FEATURED AR LENS: ${contentPack.arLens.name}
**Type:** ${contentPack.arLens.type}
**Description:** ${contentPack.arLens.description}

### Features:
${contentPack.arLens.features.map(f => `- ${f}`).join('\n')}

**Virality Potential:** ${contentPack.arLens.virality}
**CTA:** ${contentPack.arLens.cta}

---

## FEATURED QUICK PROMO
**Type:** ${contentPack.quickPromo.type}
**Duration:** ${contentPack.quickPromo.duration}

**Content:** "${contentPack.quickPromo.content}"
**Visual:** ${contentPack.quickPromo.visual}
**Price:** ${contentPack.quickPromo.price}
**CTA:** ${contentPack.quickPromo.cta}

---

## ALL CONTENT AVAILABLE

### Story Ideas (${STORY_IDEAS.length} total):
${STORY_IDEAS.map((s, i) => `${i + 1}. ${s.title} (${s.type})`).join('\n')}

### Spotlight Concepts (${SPOTLIGHT_CONCEPTS.length} total):
${SPOTLIGHT_CONCEPTS.map((s, i) => `${i + 1}. ${s.title}`).join('\n')}

### AR Lens Ideas (${AR_LENS_IDEAS.length} total):
${AR_LENS_IDEAS.map((l, i) => `${i + 1}. ${l.name} (${l.type}) - ${l.virality} virality`).join('\n')}

### Quick Promos (${QUICK_PROMOS.length} total):
${QUICK_PROMOS.map((p, i) => `${i + 1}. ${p.type}: "${p.content.substring(0, 50)}..."`).join('\n')}

---

## CAMPAIGN INFO
- **Target:** Gen Z / Gen Alpha (13-25)
- **Product:** Smartphone Zombies Merch
- **Charity:** 60% to Kids DAO (Verified Medical Pediatrics)
- **Message:** Self-aware tech humor + charitable giving

---
*FOR THE KIDS - Generated by Snapchat Content Generator*
`;

    const readyFile = path.join(LOGS_DIR, 'snapchat-ready-to-post.md');
    fs.writeFileSync(readyFile, readyContent);
    log(`Ready-to-post content saved to: ${readyFile}`);

    // Save state
    const stateFile = path.join(LOGS_DIR, 'snapchat-state.json');
    fs.writeFileSync(stateFile, JSON.stringify({
        lastRun: new Date().toISOString(),
        featuredStory: contentPack.story.title,
        featuredSpotlight: contentPack.spotlight.title,
        featuredLens: contentPack.arLens.name,
        totalContent: {
            stories: STORY_IDEAS.length,
            spotlights: SPOTLIGHT_CONCEPTS.length,
            arLenses: AR_LENS_IDEAS.length,
            quickPromos: QUICK_PROMOS.length
        }
    }, null, 2));
    log(`State saved to: ${stateFile}`);

    log('\n================================================================');
    log('CONTENT GENERATION COMPLETE');
    log(`Total Story Ideas: ${STORY_IDEAS.length}`);
    log(`Total Spotlight Concepts: ${SPOTLIGHT_CONCEPTS.length}`);
    log(`Total AR Lens Ideas: ${AR_LENS_IDEAS.length}`);
    log(`Total Quick Promos: ${QUICK_PROMOS.length}`);
    log('FOR THE KIDS!');
    log('================================================================');

    return contentPack;
}

// Export for use as module
module.exports = {
    generateStoryContent,
    generateSpotlightConcept,
    generateARLensIdea,
    generateQuickPromo,
    generateFullContentPack,
    STORY_IDEAS,
    SPOTLIGHT_CONCEPTS,
    AR_LENS_IDEAS,
    QUICK_PROMOS
};

// Run if called directly
if (require.main === module) {
    main().catch(err => {
        log(`ERROR: ${err.message}`);
        console.error(err);
        process.exit(1);
    });
}
