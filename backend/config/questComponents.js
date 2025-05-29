module.exports = {
    actions: [
        "Skip", "Make your own", "Find a cheaper alternative to", "Reduce spending on", "Try a free alternative to",
        "Borrow instead of buying", "Pack your own", "Use public transit instead of", "Cook at home instead of",
        "Share with friends instead of individual", "Unsubscribe from", "Postpone buying", "Spend zero on", "Limit your spending on"
    ],

    items: [
         // Food & Drink
        "morning coffee run", "bubble tea addiction", "late night snacks", "weekend brunch", 
        "food delivery apps", "energy drinks", "fancy smoothies", "impulse grocery buys",
        "campus food court meals", "convenience store runs", "expensive coffee beans",

        // Transport
        "Uber rides", "Grab rides", "scooter rentals", "parking fees", "gas money", 
        "late night ride home", "convenience rides", "airport transport",

        // Entertainment
        "streaming subscriptions", "YouTube Premium", "Spotify Premium", "Netflix", "Disney+",
        "mobile game purchases", "Genshin Impact pulls", "League of Legends skins", 
        "Steam game sales", "concert tickets", "movie theater trips", "karaoke sessions",
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

    locations: [
        "at work", "while commuting", "at home", "when going out"
    ],

    baseCosts: {
        // Food & Drink
        "coffee": 5, "lunch": 5, "dinner": 6, "snacks": 4, "takeout food": 12,
        "drinks": 8, "boba": 6, "fast food": 8, "meal delivery": 15, "energy drinks": 5,

        // Transport
        "rideshare": 10, "e-scooter rental": 4, "parking fee": 5, "gas top-up": 10,

        // Subscriptions
        "subscription": 15, "YouTube Premium": 12, "cloud storage": 2, "game pass": 10,

        // Leisure
        "shopping": 10, "entertainment": 10, "Steam sale": 10,
        "mobile game gems": 5,

        // Social Spending
        "club cover fee": 20, "concert tickets": 40, "dating app boost": 5,

        // Lifestyle & Shopping
        "makeup": 25, "phone accessories": 15, "skincare": 20, "impulse buys": 20
    },

    timeMultipliers: {
        "today": 1
    },

    actionItemMap: {
        "Skip": ["coffee", "lunch", "dinner", "snacks", "rideshare", "subscription", "entertainment", "shopping", "takeout food", "drinks"],
        "Make your own": ["coffee", "lunch", "dinner", "snacks", "takeout food", "drinks"],
        "Find a cheaper alternative to": ["coffee", "lunch", "dinner", "rideshare", "subscription", "entertainment", "shopping", "takeout food", "drinks"],
        "Reduce spending on": ["coffee", "lunch", "dinner", "snacks", "rideshare", "subscription", "entertainment", "shopping", "takeout food", "drinks"],
        "Try a free alternative to": ["rideshare", "subscription", "entertainment", "shopping"],
        "Borrow instead of buying": ["shopping", "entertainment"],
        "Pack your own": ["lunch", "snacks"],
        "Use public transit instead of": ["rideshare"],
        "Cook at home instead of": ["takeout food", "dinner"],
        "Share with friends instead of individual": ["subscription", "entertainment"],
    },

    itemToCategoryMap: {
        "coffee": 'Food & Drink',
        "lunch": 'Food & Drink',
        "dinner": 'Food & Drink',
        "snacks": 'Food & Drink',
        "takeout food": 'Food & Drink',
        "drinks": 'Food & Drink',
        "rideshare": 'Transport',
        "subscription": 'Subscriptions',
        "entertainment": 'Leisure',
        "shopping": 'Leisure',
    },

    questTextTemplates: {
        "Skip": (item, timeframe) => `Skip ${item} ${timeframe}`,
        "Make your own": (item, timeframe) => `Make your own ${item} ${timeframe}`,
        "Find a cheaper alternative to": (item, timeframe) => `Find a cheaper alternative to ${item} ${timeframe}`,
        "Reduce spending on": (item, timeframe) => `Reduce spending on ${item} ${timeframe}`,
        "Go one day without": (item) => `Go one day without ${item}`,
        "Try a free alternative to": (item) => `Try a free alternative to ${item}`,
        "Borrow instead of buying": (item) => `Borrow ${item} instead of buying`,
        "Pack your own": (item, timeframe) => `Pack your own ${item} ${timeframe}`,
        "Use public transit instead of": (item, timeframe) => `Use public transit instead of ${item} ${timeframe}`,
        "Cook at home instead of": (item, timeframe) => `Cook at home instead of getting ${item} ${timeframe}`,
        "Share with friends instead of individual": (item, timeframe) => `Share ${item} with friends instead of paying individually ${timeframe}`,
    }
};