const { expect } = require('chai');

const models = require('../../src/models');
const testDB = require('../test-db')(models);

const ProductService = require('../../src/services/product.service');

describe('ProductService', () => {
  it('should be defined', () => {
    expect(ProductService).to.exist;
  });

  const productService = new ProductService({ models });

  before(() => testDB.connect());

  after(() => testDB.disconnect());

  describe('create', () => {
    const baseProduct = {
      name: 'product 1',
      description: 'some product description',
    };

    after(() => models.Product.deleteMany());

    it('should create a product', async () => {
      await productService.create(baseProduct);

      const [product] = await models.Product.find();
      expect(product.name).to.be.equal(baseProduct.name);
      expect(product.description).to.be.equal(baseProduct.description);
    });
  });

  describe('get', () => {
    const baseProduct = {
      name: 'product 1',
      description: 'some product description',
    };

    before(() => models.Product.create(baseProduct));

    after(() => models.Product.deleteMany());

    it('should return all products', async () => {
      const products = await productService.get();
      expect(products).to.have.lengthOf(1);

      const [product] = products;
      expect(product.name).to.be.equal(baseProduct.name);
      expect(product.description).to.be.equal(baseProduct.description);
    });
  });

  describe('getById', () => {
    const productId = new models.mongoose.Types.ObjectId();
    const baseProduct = {
      _id: productId,
      name: 'product 1',
      description: 'some product description',
    };

    before(async () => {
      await models.Product.create(baseProduct);
      await models.Product.create({ name: 'name', description: 'description' });
    });

    after(() => models.Product.deleteMany());

    it('should return one product', async () => {
      const product = await productService.getById(productId);
      expect(product._id).to.be.eql(baseProduct._id);
      expect(product.name).to.be.equal(baseProduct.name);
      expect(product.description).to.be.equal(baseProduct.description);
    });

    it('should throw an error if product not found', async () => {
      let error;
      try {
        await productService.getById(new models.mongoose.Types.ObjectId());
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('Product not found');
    });
  });

  describe('deleteById', () => {
    const productId = new models.mongoose.Types.ObjectId();
    const baseProduct = {
      _id: productId,
      name: 'product 1',
      description: 'some product description',
    };

    before(async () => {
      await models.Product.create(baseProduct);
    });

    after(() => models.Product.deleteMany());

    it('should delete a product', async () => {
      await productService.deleteById(productId);

      const products = await models.Product.find();
      expect(products).to.have.lengthOf(0);
    });

    it('should throw an error if product not found', async () => {
      let error;
      try {
        await productService.deleteById(new models.mongoose.Types.ObjectId());
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('Product not found');
    });
  });
});
