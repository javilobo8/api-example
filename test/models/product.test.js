const { expect } = require('chai');

const models = require('../../src/models');
const testDB = require('../test-db')(models);

describe('ProductModel', () => {
  before(() => testDB.connect());

  after(() => testDB.disconnect());

  describe('when creating a Product', () => {
    const baseProduct = {
      name: 'product name',
      description: 'product description',
    };

    it('should create the model', () => {
      const product = new models.Product(baseProduct);

      expect(product.name).to.be.equal(baseProduct.name);
      expect(product.description).to.be.equal(baseProduct.description);
    });
  });
});
