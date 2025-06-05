module.exports = {
    categoriesMap: {
        "Food/Delivery": ["coffee", "bubble tea", "food delivery", "brunch", "late night food", "grocery impulse", "snack"],
        "Transport": ["ride"],
        "Entertainment": ["streaming", "loot box", "game skin"],
        "Shopping": ["sale item", "shopping"],
        "Health & Wellness": ["fitness class"]
    },
    actions: [
        "Skip", "DIY instead of buying", "Find a budget hack for", "Go cold turkey on", "Try the free version of",
        "Swap with a friend instead of buying", "Meal prep instead of buying", "Walk/bike instead of", 
        "Make at home instead of ordering", "Split the cost of", "Cancel your", "Wait a week before buying", 
        "Set a spending limit for", "Find a dupe for", "Use what you already have instead of buying",
        "Have a no-spend day on", "Challenge yourself to avoid", "Get creative with alternatives to"
    ],

    items: [
         // Food & Drink
        "morning coffee run", "bubble tea addiction", "late night snacks", "weekend brunch", 
        "food delivery apps", "energy drinks", "fancy smoothies", "impulse grocery buys",
        "campus food court meals", "convenience store runs", "expensive coffee beans",

        // Transport
        "Grab rides", "late night ride home", "convenience rides",

        // Entertainment
        "streaming subscriptions", "YouTube Premium", "Spotify Premium", "Netflix", "Disney+",
        "mobile game purchases", "Genshin Impact pulls", "League of Legends skins", 
        "Steam game sales", "movie theater trips", "karaoke sessions",
        "escape room sessions", "bowling nights", "arcade games",

        // Shopping
        "fast fashion hauls", "skincare splurges", "makeup impulse buys", "phone accessories",
        "aesthetic stationery", "plant purchases", "home decor", "trendy gadgets",
        "thrift finds", "vintage clothing", "sneaker drops", "jewelry purchases",

        // Digital
        "premium app subscriptions", "cloud storage upgrades", "online courses", 
        "digital art tools", "productivity apps", "photo editing apps", "VPN services",

        // Health & Wellness
        "gym memberships", "yoga classes", "meditation apps", "protein supplements",
        "wellness products", "self-care items", "mental health apps", "fitness gear"
    ],

    timeframes: [
        "today"
    ],

    situations: [
        "when you're stressed", "during late night study sessions", "while scrolling TikTok",
        "when hanging with friends", "during work breaks", "on your commute",
        "when you're bored", "during exam season", "on weekends", "after a bad day"
    ],

    baseCosts: {
        // Food & Drink
        "morning coffee run": 6, "bubble tea addiction": 7, "late night snacks": 8, 
        "brunch": 10, "food delivery apps": 12, "energy drinks": 4,
        "fancy smoothies": 8, "impulse grocery buys": 14, "campus food court meals": 8,
        "convenience store runs": 10,

        // Transport
        "Grab rides": 10, "late night ride home": 15, "convenience rides": 15,

        // Entertainment
        "streaming subscriptions": 12, "YouTube Premium": 12, "Spotify Premium": 10,
        "Netflix": 15, "Disney+": 8, "mobile game purchases": 10, "Genshin Impact pulls": 15,
        "League of Legends skins": 20, "Steam game sales": 25,
        "movie theater trips": 15, "karaoke sessions": 20, "escape room sessions": 25,
        "bowling nights": 18, "arcade games": 12,

        // Shopping
        "fast fashion hauls": 10, "skincare splurges": 15, "makeup impulse buys": 10,
        "phone accessories": 10, "aesthetic stationery": 15, "plant purchases": 12,
        "home decor": 20, "trendy gadgets": 30, "thrift finds": 8, "vintage clothing": 20,
        "sneaker drops": 15, "jewelry purchases": 10,

        // Digital
        "premium app subscriptions": 8, "cloud storage upgrades": 3, "online courses": 20,
        "digital art tools": 20, "productivity apps": 6, "photo editing apps": 10, "VPN services": 5,

        // Health & Wellness
        "gym memberships": 25, "yoga classes": 20, "meditation apps": 8, "protein supplements": 20,
        "wellness products": 25, "self-care items": 18, "mental health apps": 15, "fitness gear": 15
    },

    timeMultipliers: {
        "today": 1
    },

    actionItemMap: {
        "Skip": ["morning coffee run", "bubble tea addiction", "late night snacks", "convenience rides", "impulse grocery buys", "mobile game purchases"],
    
        "DIY instead of buying": ["morning coffee run", "fancy smoothies", "expensive coffee beans", "skincare splurges", "self-care items"],
        
        "Find a budget hack for": ["streaming subscriptions", "gym memberships", "online courses", "food delivery apps"],
        
        "Go cold turkey on": ["bubble tea addiction", "energy drinks", "fast fashion hauls", "mobile game purchases", "impulse grocery buys"],
        
        "Try the free version of": ["Spotify Premium", "YouTube Premium", "premium app subscriptions", "meditation apps", "productivity apps"],
        
        "Swap with a friend instead of buying": ["Netflix", "Disney+", "streaming subscriptions", "online courses", "vintage clothing"],
        
        "Meal prep instead of buying": ["campus food court meals", "food delivery apps", "convenience store runs", "late night snacks"],
        
        "Walk/bike instead of": ["Grab rides", "convenience rides"],
        
        "Make at home instead of ordering": ["weekend brunch", "fancy smoothies", "food delivery apps"],
        
        "Split the cost of": ["streaming subscriptions", "concert tickets", "escape room sessions", "karaoke sessions"],
        
        "Cancel your": ["streaming subscriptions", "gym memberships", "premium app subscriptions"],
        
        "Wait a week before buying": ["sneaker drops", "trendy gadgets", "makeup impulse buys", "fast fashion hauls"],
        
        "Set a spending limit for": ["Steam game sales", "thrift finds", "aesthetic stationery", "plant purchases"],
        
        "Find a dupe for": ["skincare splurges", "makeup impulse buys", "trendy gadgets", "sneaker drops"],
        
        "Use what you already have instead of buying": ["home decor", "aesthetic stationery", "phone accessories", "jewelry purchases"],
        
        "Have a no-spend day on": ["convenience store runs", "impulse grocery buys", "mobile game purchases"],
        
        "Challenge yourself to avoid": ["late night ride home", "energy drinks", "League of Legends skins", "arcade games"],
        
        "Get creative with alternatives to": ["movie theater trips", "bowling nights", "expensive coffee beans", "wellness products"]
    },

    goals: [
        "save money", "build discipline", "boost mental health", "reduce screen time", "eat healthier"
    ],

    itemToCategoryMap: {
        // Food
        "morning coffee run": 'Food', "bubble tea addiction": 'Food', "late night snacks": 'Food',
        "weekend brunch": 'Food', "food delivery apps": 'Food', "energy drinks": 'Food',
        "fancy smoothies": 'Food', "impulse grocery buys": 'Food', "campus food court meals": 'Food',
        "convenience store runs": 'Food', "expensive coffee beans": 'Food',

        // Transport
        "Grab rides": 'Transport', "late night ride home": 'Transport', "convenience rides": 'Transport',

        // Entertainment
        "streaming subscriptions": 'Entertainment', "YouTube Premium": 'Entertainment', 
        "Spotify Premium": 'Entertainment', "Netflix": 'Entertainment', "Disney+": 'Entertainment',
        "mobile game purchases": 'Entertainment', "Genshin Impact pulls": 'Entertainment',
        "League of Legends skins": 'Entertainment', "Steam game sales": 'Entertainment',
        "concert tickets": 'Entertainment', "movie theater trips": 'Entertainment',
        "karaoke sessions": 'Entertainment', "escape room sessions": 'Entertainment',
        "bowling nights": 'Entertainment', "arcade games": 'Entertainment',

        // Shopping
        "fast fashion hauls": 'Shopping', "skincare splurges": 'Shopping', "makeup impulse buys": 'Shopping',
        "phone accessories": 'Shopping', "aesthetic stationery": 'Shopping', "plant purchases": 'Shopping',
        "home decor": 'Shopping', "trendy gadgets": 'Shopping', "thrift finds": 'Shopping',
        "vintage clothing": 'Shopping', "sneaker drops": 'Shopping', "jewelry purchases": 'Shopping',

        // Digital
        "premium app subscriptions": 'Digital', "cloud storage upgrades": 'Digital', 
        "online courses": 'Digital', "digital art tools": 'Digital', "productivity apps": 'Digital',
        "photo editing apps": 'Digital', "VPN services": 'Digital',

        // Health
        "gym memberships": 'Health', "yoga classes": 'Health', "meditation apps": 'Health',
        "protein supplements": 'Health', "wellness products": 'Health', "self-care items": 'Health',
        "mental health apps": 'Health', "fitness gear": 'Health'
    },

    questTextTemplates: {
        "Skip": (item, timeframe) => `Skip your ${item} ${timeframe}`,
        "DIY instead of buying": (item, timeframe) => `DIY your ${item} ${timeframe}`,
        "Find a budget hack for": (item, timeframe) => `Find a budget hack for ${item} ${timeframe}`,
        "Go cold turkey on": (item, timeframe) => `Go cold turkey on ${item} ${timeframe}`,
        "Try the free version of": (item, timeframe) => `Try the free version of ${item} ${timeframe}`,
        "Swap with a friend instead of buying": (item, timeframe) => `Swap ${item} with a friend ${timeframe}`,
        "Meal prep instead of buying": (item, timeframe) => `Meal prep instead of ${item} ${timeframe}`,
        "Walk/bike instead of": (item, timeframe) => `Walk or bike instead of ${item} ${timeframe}`,
        "Make at home instead of ordering": (item, timeframe) => `Make your own instead of ${item} ${timeframe}`,
        "Split the cost of": (item, timeframe) => `Split the cost of ${item} with friends ${timeframe}`,
        "Cancel your": (item, timeframe) => `Cancel your ${item} ${timeframe}`,
        "Wait a week before buying": (item, timeframe) => `Wait a week before buying ${item} ${timeframe}`,
        "Set a spending limit for": (item, timeframe) => `Set a spending limit for ${item} ${timeframe}`,
        "Find a dupe for": (item, timeframe) => `Find a cheaper dupe for ${item} ${timeframe}`,
        "Use what you already have instead of buying": (item, timeframe) => `Use what you have instead of buying ${item} ${timeframe}`,
        "Have a no-spend day on": (item, timeframe) => `Have a no-spend day on ${item} ${timeframe}`,
        "Challenge yourself to avoid": (item, timeframe) => `Challenge yourself to avoid ${item} ${timeframe}`,
        "Get creative with alternatives to": (item, timeframe) => `Get creative with alternatives to ${item} ${timeframe}`
    }
};