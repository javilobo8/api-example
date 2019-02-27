const models = require('../models');

const ProductService = require('./product.service');
const UserService = require('./user.service');

module.exports = {
  productService: new ProductService({ models }),
  userService: new UserService({ models }),
};
