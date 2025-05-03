const Sequelize = require('sequelize');
const db = require("../config/db");

const QuestTemplates = db.define('quest_templates', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING, // 'daily', 'weekly'
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    goal_focus: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    trigger_condition: {
        type: Sequelize.JSONB,
        allowNull: false,
    },
    xp_reward: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = QuestTemplates;