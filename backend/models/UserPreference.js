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
        type: Sequelize.JSON,
    },
    goal: {
        type: Sequelize.JSON,
    },
    lifestyle: {
        type: Sequelize.JSON,
    },
    categories: {
        type: Sequelize.JSON,
    }
});

module.exports = UserPreference;