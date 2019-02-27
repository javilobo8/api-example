const { Router } = require('express');

const ProductController = require('./product.controller');

function buildController(app, container, Controller) {
  const controller = new Controller(container);
  const router = new Router();

  Controller.routes.forEach((route) => {
    router[route.method](route.path, controller[route.handler].bind(controller));
  });

  app.use(Controller.domain, router);
}

module.exports = (app, container) => {
  buildController(app, container, ProductController);
};
