const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = (models) => {
  const mongod = new MongoMemoryServer();

  return {
    connect: async function () {
      await models.connect(await mongod.getConnectionString('test'));
    },
    disconnect: async function () {
      await models.disconnect();
      await mongod.stop();
    },
  };
};
