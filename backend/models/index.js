const User = require('./User');
const Pets = require('./Pets');

User.hasOne(Pets, { foreignKey: 'user_id', as: 'Pet' });
Pets.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Pets };
