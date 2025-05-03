const Sequelize = require('sequelize');
const db = require("../config/db");

const UserPreference = db.define('user_preferences', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    goal_focus: {
        type: Sequelize.STRING(50),
    },
    spending_habits: {
        type: Sequelize.STRING(50),
    },
    spending_categories: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    eats_out_frequency: {
        type: Sequelize.STRING(20),
    },
    makes_own_coffee: {
        type: Sequelize.STRING(20),
    },
    transport_mode: {
        type: Sequelize.STRING(50),
    },
});