const sequelize = require('../config/connection');
const { Coach, Client,} = require('../models');

const coachSeedData = require('./coachSeedData.json');
const clientSeedData = require('./clientSeedData.json')


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Coach.bulkCreate(coachSeedData, {
    individualHooks: true,
    returning: true,
  });
  await Client.bulkCreate(clientSeedData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedDatabase();