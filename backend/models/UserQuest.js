const Sequelize = require('sequelize');
const db = require("../config/db");

const UserQuest = db.define('user_quests', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    quest_text: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    xp: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    source_template_id: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.STRING(20),
    },
    accepted_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    }
});

module.exports = UserQuest;