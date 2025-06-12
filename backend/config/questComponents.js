module.exports = {
    mandatoryDaily: [
        { text: "Log your spending at least once today", xp: 15, type: "daily" },
        { text: "Avoid buying something you don’t really need today", xp: 20, type: "daily" },
        { text: "Pause before each purchase today. Ask: 'Do I need this?'", xp: 20, type: "daily" },
        { text: "Review your spending summary or wallet for 2 mins", xp: 10, type: "daily" },
        { text: "Try not to spend on anything non-essential today", xp: 25, type: "daily" },
        { text: "Open your budgeting app or money tracker once today", xp: 15, type: "daily" },
        { text: "Write down or think about one thing you spent well on", xp: 20, type: "daily" },
        { text: "Take 60 seconds to check your bank or wallet balance", xp: 10, type: "daily" },
        { text: "Skip a small treat or habit purchase today", xp: 15, type: "daily" },
        { text: "Do one small action to care about your finances today", xp: 25, type: "daily" }
    ],

    categoriesMap: {
        "Food/Delivery": [
            { text: "Cook at home instead of ordering out 🍳", xp: 15, type: "bonus" },
            { text: "Pack a meal instead of eating out 🍱", xp: 20, type: "bonus" },
            { text: "Make your own drink instead of buying one ☕️", xp: 10, type: "bonus" },
            { text: "Avoid delivery apps for today 🚫📱", xp: 15, type: "bonus" }
        ],
        "Transport": [
            { text: "Walk instead of taking a ride-hailing app 🚶‍♂️", xp: 20, type: "bonus" },
            { text: "Try using public transport today 🚌", xp: 10, type: "bonus" },
            { text: "Bike to your destination 🚲", xp: 20, type: "bonus" },
            { text: "Carpool or share a ride if possible 🚗➡️👫", xp: 15, type: "bonus" }
        ],
        "Entertainment": [
            { text: "Skip streaming for a day 🎬🚫", xp: 15, type: "bonus" },
            { text: "Play a free offline game today 🎮", xp: 10, type: "bonus" },
            { text: "Do an offline activity for 30 mins 📵", xp: 20, type: "bonus" },
            { text: "Avoid in-game purchases for the day 🧃🎮", xp: 15, type: "bonus" }
        ],
        "Shopping": [
            { text: "Don’t browse any shopping apps today 🛍️", xp: 15, type: "bonus" },
            { text: "Remove 1 item from your wishlist 👟", xp: 10, type: "bonus" },
            { text: "Do a one-day no-spend challenge 💪", xp: 25, type: "bonus" }
        ],
        "Health & Wellness": [
            { text: "Stretch or walk for 10 minutes 🧘‍♀️", xp: 10, type: "bonus" },
            { text: "Replace one sugary snack with water 💧", xp: 10, type: "bonus" },
            { text: "Do a 5-minute home workout 🏃‍♂️", xp: 20, type: "bonus" },
            { text: "Do one free self-care activity 💆‍♀️", xp: 15, type: "bonus" }
        ]
    },

    struggleMap: {
        "Don't track spendings": [
            { text: "Use a tracker to record at least one expense today 🕵️‍♂️", xp: 20, type: "bonus" },
            { text: "Pause for 5 seconds before any purchase today", xp: 15, type: "bonus" },
            { text: "End your day with a short review of your purchases", xp: 15, type: "bonus" }
        ],
        "Want better habits": [
            { text: "Do one small thing today Future You would be proud of 💪", xp: 20, type: "bonus" },
            { text: "Say no to one temptation and record your win 🌟", xp: 15, type: "bonus" },
            { text: "Create a 1-day no-spend streak", xp: 25, type: "bonus" }
        ],
        "Impulse spending": [
            { text: "Leave something in your cart for 24 hours", xp: 10, type: "bonus" },
            { text: "Resist one 'Treat Yourself' urge today 🧠", xp: 20, type: "bonus" },
            { text: "Open your favorite shopping app and close it immediately 😂", xp: 10, type: "bonus" }
        ],
        "Feel out of control": [
            { text: "Look at your past 3 purchases without judging", xp: 10, type: "bonus" },
            { text: "Declutter one subscription or wallet item", xp: 15, type: "bonus" },
            { text: "Write down a small financial win today 🎉", xp: 15, type: "bonus" }
        ]
    },

    goalMap: {
        "Save monthly": [
            { text: "Set a spending cap for the day 🕹️", xp: 15, type: "bonus" },
            { text: "Skip a small indulgence and move the money to savings 💸", xp: 20, type: "bonus" },
            { text: "DIY one thing you would normally buy", xp: 15, type: "bonus" }
        ],
        "Emergency fund": [
            { text: "Transfer $2 to your emergency savings 💰", xp: 15, type: "bonus" },
            { text: "Cook instead of ordering to save money 🧂➡️💰", xp: 10, type: "bonus" },
            { text: "Pause or cancel one unused subscription", xp: 20, type: "bonus" }
        ],
        "Pay off debts": [
            { text: "Make a small debt payment today 🧮", xp: 20, type: "bonus" },
            { text: "Avoid a small expense and put it toward your debt 🔁", xp: 15, type: "bonus" },
            { text: "Unsubscribe from a marketing email", xp: 10, type: "bonus" }
        ],
        "Travel or big purchase": [
            { text: "Plan your dream trip instead of shopping 🌍", xp: 10, type: "bonus" },
            { text: "Screenshot something you want and wait 3 days 📸", xp: 10, type: "bonus" },
            { text: "Say no to a small impulse. Your goal > instant reward!", xp: 20, type: "bonus" }
        ]
    },

    lifestyleMap: {
        "Eat out often": [
            { text: "Make a meal at home today 👨‍🍳", xp: 15, type: "bonus" },
            { text: "Meal prep tomorrow’s lunch 🍱", xp: 20, type: "bonus" },
            { text: "Don’t open any food delivery apps today", xp: 15, type: "bonus" }
        ],
        "Shop when bored": [
            { text: "Do 5 jumping jacks when bored instead of opening Shopee 🛍️", xp: 10, type: "bonus" },
            { text: "Delete 1 shopping app from your phone", xp: 20, type: "bonus" },
            { text: "Do a free hobby for 15 mins instead of shopping", xp: 15, type: "bonus" }
        ],
        "Mostly just cover bills": [
            { text: "See if any bill can be reduced today 💡", xp: 15, type: "bonus" },
            { text: "Spend 5 mins doing a quick budget check-in", xp: 15, type: "bonus" },
            { text: "Celebrate a bill paid on time ✅", xp: 10, type: "bonus" }
        ],
        "Too many subscriptions": [
            { text: "Review your active subscriptions 📋", xp: 10, type: "bonus" },
            { text: "Try a free alternative to a paid service today", xp: 15, type: "bonus" },
            { text: "Check if you still use one paid service honestly 👀", xp: 15, type: "bonus" }
        ],
        "Easily tempted by sales": [
            { text: "Mute brand alerts for the day 🛑", xp: 10, type: "bonus" },
            { text: "Window-shop only — don’t check out!", xp: 15, type: "bonus" },
            { text: "Postpone a sale item for 1 week", xp: 15, type: "bonus" }
        ]
    }
    },
};