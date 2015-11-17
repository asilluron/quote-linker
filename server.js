var Glue = require('glue');
var manifest = require('./manifest');

var options = {
  relativeTo: __dirname
};

Glue.compose(manifest.get('/', {}), options, function (err, server) {
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'server/web',
    partialsPath: 'server/partials'
  });

  if (err) {
    throw err;
  }
  server.start(() => {
    console.log('Server started at:', server.info.uri);
  });
});
