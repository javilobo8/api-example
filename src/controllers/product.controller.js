const ErrorHandler = require('../utils/error-handler');

class ProductController {
  constructor({ services }) {
    this.productService = services.productService;

    this.errorHandler = new ErrorHandler(this.constructor.name);
  }

  listProducts(req, res) {
    this.productService.get()
      .then((data) => res.send(data))
      .catch(this.errorHandler.sendError(res));
  }

  getProduct(req, res) {
    this.productService.getById(req.params.productId)
      .then((data) => res.send(data))
      .catch(this.errorHandler.sendError(res));
  }

  addProduct(req, res) {
    this.productService.create(req.body)
      .then(() => this.productService.get())
      .then((data) => res.send(data))
      .catch(this.errorHandler.sendError(res));
  }

  deleteProduct(req, res) {
    this.productService.deleteById(req.params.productId)
      .then(() => this.productService.get())
      .then((data) => res.send(data))
      .catch(this.errorHandler.sendError(res));
  }
}

ProductController.domain = '/product';
ProductController.routes = [
  {
    method: 'get',
    path: '/',
    handler: 'listProducts',
    skipAuth: true,
  },
  {
    method: 'get',
    path: '/:productId',
    handler: 'getProduct',
    skipAuth: true,
  },
  {
    method: 'post',
    path: '/',
    handler: 'addProduct',
  },
  {
    method: 'delete',
    path: '/:productId',
    handler: 'deleteProduct',
  },
];

module.exports = ProductController;
