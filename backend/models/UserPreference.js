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
    struggle: {
        type: Sequelize.TEXT,
    },
    goal: {
        type: Sequelize.TEXT,
    },
    lifestyle: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
    },
    categories: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
    }
});

module.exports = UserPreference;