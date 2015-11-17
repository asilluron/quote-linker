'use strict';

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/404',
    config: {
      handler: function (request, reply) {
        reply.view('errors/404', {});
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'web/errors'
};
