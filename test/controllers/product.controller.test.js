const { expect } = require('chai');
const supertest = require('supertest');

const models = require('../../src/models');
const testDB = require('../test-db')(models);

const app = require('../../src/app');

describe('ProductController', () => {
  before(() => testDB.connect());

  after(() => testDB.disconnect());

  describe('GET /product', () => {
    describe('when it runs', () => {
      const baseProduct = {
        name: 'product name',
        description: 'product description',
      };

      let response;

      before(async () => {
        await models.Product.create(baseProduct);

        response = await supertest(app)
          .get('/product');
      });

      after(() => models.Product.deleteMany());

      it('should response 200', () => {
        expect(response).to.have.property('status', 200);
      });

      it('should send all products', () => {
        expect(response.body).to.have.lengthOf(1);

        const [product] = response.body;
        expect(product.name).to.be.equal(baseProduct.name);
        expect(product.description).to.be.equal(baseProduct.description);
      });
    });
  });

  describe('GET /product/:productId', () => {
    describe('when it runs', () => {
      const productId = new models.mongoose.Types.ObjectId();
      const baseProduct = {
        _id: productId,
        name: 'product name',
        description: 'product description',
      };

      let response;

      before(async () => {
        await models.Product.create(baseProduct);

        response = await supertest(app)
          .get(`/product/${productId}`);
      });

      after(() => models.Product.deleteMany());

      it('should response 200', () => {
        expect(response).to.have.property('status', 200);
      });

      it('should send one product', () => {
        const product = response.body;
        expect(product._id).to.be.equal(String(productId));
        expect(product.name).to.be.equal(baseProduct.name);
        expect(product.description).to.be.equal(baseProduct.description);
      });
    });

    describe('when it fails', () => {
      let response;

      before(async () => {
        response = await supertest(app)
          .get(`/product/${new models.mongoose.Types.ObjectId()}`);
      });

      it('should response 500', () => {
        expect(response).to.have.property('status', 500);
      });
    });
  });

  describe('POST /product', () => {
    describe('when it runs', () => {
      const baseProduct = {
        name: 'product name',
        description: 'product description',
      };

      let response;

      before(async () => {
        response = await supertest(app)
          .post('/product')
          .send(baseProduct);
      });

      after(() => models.Product.deleteMany());

      it('should response 200', () => {
        expect(response).to.have.property('status', 200);
      });

      it('should send all products', () => {
        expect(response.body).to.have.lengthOf(1);

        const [product] = response.body;
        expect(product.name).to.be.equal(baseProduct.name);
        expect(product.description).to.be.equal(baseProduct.description);
      });
    });

    describe('when it fails', () => {
      const baseProduct = {
        description: 'product description',
      };

      let response;

      before(async () => {
        response = await supertest(app)
          .post('/product')
          .send(baseProduct);
      });

      it('should response 500', () => {
        expect(response).to.have.property('status', 500);
      });
    });
  });

  describe('DELETE /product/:productId', () => {
    describe('when it runs', () => {
      const productId = new models.mongoose.Types.ObjectId();
      const baseProduct = {
        _id: productId,
        name: 'product name',
        description: 'product description',
      };

      let response;

      before(async () => {
        await models.Product.create(baseProduct);

        response = await supertest(app)
          .delete(`/product/${productId}`);
      });

      it('should response 200', () => {
        expect(response).to.have.property('status', 200);
      });

      it('should response products left', () => {
        const products = response.body;
        expect(products).to.have.lengthOf(0);
      });
    });

    describe('when it fails', () => {
      let response;

      before(async () => {
        response = await supertest(app)
          .delete(`/product/${new models.mongoose.Types.ObjectId()}`);
      });

      it('should response 500', () => {
        expect(response).to.have.property('status', 500);
      });
    });
  });
});
