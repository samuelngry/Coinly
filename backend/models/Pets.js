const Sequelize = require('sequelize');
const db = require("../config/db");

const Pets = db.define('pets', {
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
        },
        onDelete: 'CASCADE'
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    mood: {
        type: Sequelize.ENUM('Happy', 'Neutral', 'Sad', 'Angry', 'Excited'),
        allowNull: false,
        defaultValue: 'Neutral',
    },
    xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    last_fed: {
        type: Sequelize.DATE
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
});

module.exports = Pets;