class ProductService {
  constructor({ models }) {
    this.ProductModel = models.Product;
  }

  create(product) {
    return new this.ProductModel(product).save();
  }

  get(filter = {}) {
    return this.ProductModel.find(filter);
  }

  getById(productId) {
    return this.ProductModel.findById(productId).exec()
      .tap(maybeThrowProductNotFound);
  }

  deleteById(productId) {
    return this.getById(productId)
      .then((product) => product.remove());
  }
}

function maybeThrowProductNotFound(product) {
  if (!product) {
    throw new Error('Product not found');
  }
}

module.exports = ProductService;
