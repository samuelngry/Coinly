module.exports = {
    actions: [
        "Skip", "Make your own", "Find a cheaper alternative to", "Reduce spending on", "Go one day without",
        "Try a free alternative to", "Borrow instead of buying"
    ],

    items: [
        "coffee", "lunch", "dinner", "snacks", "rideshare", "subscription", "entertainment", "shopping", "takeout food", "drinks"
    ],

    timeframes: [
        "today", "this week", "for two days", "for the weekend", "for three days"
    ],

    locations: [
        "at work", "while commuting", "at home", "when going out", "on weekends"
    ],

    baseCosts: {
        "coffee": 5,
        "lunch": 5,
        "dinner": 6,
        "snacks": 4,
        "rideshare": 20,
        "subscription": 15,
        "entertainment": 20,
        "shopping": 60,
        "takeout food": 12,
        "drinks": 8 
    },

    timeMultipliers: {
        "today": 1,
        "this week": 7,
        "for two days": 2,
        "for the weekend": 2,
        "for three days": 3
    }
};