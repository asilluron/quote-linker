'use strict';

var Confidence = require('confidence');

var manifest = {
  connections: [{
    port: Number(process.env.PORT || 8400),
    labels: ['api'],
    routes: {
      cors: {
        origin: ['*']
      }
    }
  }],
  plugins: []
};

manifest.plugins = [
  {
    'vision': {}
  }, {
    'inert': {}
  }, {
    'inert': {}
  }, {
    'hapi-mongoose': {
      async: true,
      uri: process.env.MONGOLAB_URI
    }
  }, {
    './server/web/public': {}
  }, {
    './server/web/home': {}
  }, {
    './server/web/quote': {}
  }, {
    './server/web/errors': {}
  }];

module.exports = new Confidence.Store(manifest);
