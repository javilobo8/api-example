const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const models = {
  Product: require('./product'),
  User: require('./user'),
};

const defaultMongooseOptions = {
  useNewUrlParser: true,
};

class Models {
  constructor() {
    this.mongoose = mongoose;
    Object.assign(this, models);
  }

  connect(uri, options = {}) {
    return this.mongoose.connect(uri, Object.assign({}, defaultMongooseOptions, options));
  }

  disconnect() {
    this.mongoose.disconnect();
  }
}

module.exports = new Models();
