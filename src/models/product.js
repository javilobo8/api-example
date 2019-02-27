const mongoose = require('mongoose');

const Product = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
}, { collectionName: 'products' });

module.exports = mongoose.model('products', Product);
