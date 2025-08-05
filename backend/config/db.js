const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        connectTimeout: 60000,
        socketTimeout: 60000,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 60000, 
        idle: 10000
    }
});

module.exports = sequelize;