const Sequelize = require('sequelize');
const db = require("../config/db");

const UserBadge = db.define('userbadges', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    month: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    badge_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
    }
    }, {
        tableName: 'userbadges',
        timestamps: true,
        underscored: true,
});

module.exports = UserBadge;