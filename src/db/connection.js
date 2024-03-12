const { Sequelize } = require('sequelize');
const { Company, Subscription, SubscrptionTier, } = require('./models');
const config = require('./config')


const connection = new Sequelize(
  config.name,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres',
  }
);


(async () => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

Company.init(connection);
Subscription.init(connection);
SubscrptionTier.init(connection);



(async () => {

  const syncPromises = [
    Company.sync({ force: false }).catch((e) => console.error('company', e)),
    Subscription.sync({ force: false }).catch((e) => console.error('subscribtion', e)),
    SubscrptionTier.sync({ force: false }).catch((e) => console.error('subscribtiontier', e)),
  ];

  await Promise.all(syncPromises);
})()

module.exports = connection;