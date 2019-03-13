const auth = require('basic-auth');

const config = require('../../config');
const errorHandlers = require('../error-handlers');

function authMiddleware(req, res, next) {
  const authentication = auth(req);

  const isAuthenticated = (
    authentication
    && authentication.name === config.authentication.user
    && authentication.pass === config.authentication.pass
  );

  if (!isAuthenticated) {
    return errorHandlers.sendUnauthorized('Bad authentication, basic auth needed')(res);
  }

  return next();
}

module.exports = authMiddleware;
