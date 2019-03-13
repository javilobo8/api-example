const Boom = require('boom');

// TODO: develop all errors

function sendUnauthorized(message) {
  return (res) => {
    const boom = Boom.unauthorized(message);
    res.status(boom.output.statusCode).send(boom.output.payload);
  };
}

exports.sendUnauthorized = sendUnauthorized;
