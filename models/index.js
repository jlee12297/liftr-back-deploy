const Client = require('./Client');
const Coach = require('./Coach');
const Exercise = require('./Exercise');

Coach.hasMany(Client, {
    foreignKey: 'coach_id',
    onDelete: 'CASCADE'
});


Client.belongsTo(Coach, {
    foreignKey: 'user_id'
  });

  Client.hasMany(Exercise, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});


Exercise.belongsTo(Client, {
    foreignKey: 'client_id'
  });


module.exports = { Client, Coach, Exercise, };