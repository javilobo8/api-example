const models = require('../models');

const ProductService = require('./product.service');

module.exports = {
  productService: new ProductService({ models }),
};
