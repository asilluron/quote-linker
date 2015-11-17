'use strict';
const shortid = require('shortid');
const Joi = require('joi');

exports.register = (server, options, next) => {
  const mongoose = server.methods.mongoose();
  var quoteSchema = new mongoose.Schema({
    quote: String,
    background: String,
    author: String,
    creatorInfo: Object,
    creatorUA: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    _id: {
      type: String,
      'default': shortid.generate,
      unique: true
    }
  });
  const db = server.methods.mongooseDb();
  const Quote = db.model('Quote', quoteSchema);
  server.route({
    method: 'GET',
    path: '/create',
    config: {
      handler: (request, reply) => {
        reply.view('quote/create', {});
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/quote/{id}',
    config: {
      handler: (request, reply) => {
        Quote.findOne({_id: request.params.id}).then(foundQuote => {
          let baseTextSize = 50;
          let modifier = Math.ceil(foundQuote.quote.length / 50);
          baseTextSize -= modifier;
          reply.view('quote/view', {
            quote: foundQuote.quote,
            background: foundQuote.background,
            author: foundQuote.author,
            textSize1: baseTextSize,
            textSize2: Math.max(baseTextSize * 0.6, 20),
            textSize3: Math.max(baseTextSize * 0.4, 20)
          });
        }, err => {
          server.log(['error'], err);
          reply.view('errors/404', {message: 'Quote Not Found'});
        });
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/create',
    config: {
      validate: {
        payload: {
          quote: Joi.string().min(3).max(1000),
          author: Joi.string().min(3).max(100),
          background: Joi.string().uri({
            scheme: [
              'http',
              'https'
            ]
          })
        }
      },
      handler: (request, reply) => {
        let newQuote = new Quote({
          quote: request.payload.quote,
          background: request.payload.background,
          author: request.payload.author,
          creatorInfo: request.connection.info,
          creatorUA: request.headers['user-agent']
        });

        let saveQuery = newQuote.save();

        saveQuery.then(savedQuote => {
          reply.redirect(`/quote/${savedQuote._id}`);
        }, err => {
          server.log(['error'], err);
          reply.view('quote/create', {error: 'Unable to save to database. Please report issue to https://github.com/asilluron/quote-linker/issues'});
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'web/quote'
};
