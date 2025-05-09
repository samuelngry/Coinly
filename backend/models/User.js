const Sequelize = require('sequelize');
const db = require("../config/db");

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    avatar_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    last_generated_at: {
        type: Sequelize.DATE,
        allowNull: true,
    },
});

module.exports = User;