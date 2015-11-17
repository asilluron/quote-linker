'use strict';

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'web/public'
};
