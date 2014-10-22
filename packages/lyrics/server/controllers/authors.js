'use strict';

var mongoose = require('mongoose'),
  Author = mongoose.model('Author'),
  _ = require('lodash');

/**
 * Find lyric by id
 */
exports.author = function(req, res, next, id) {
  Author.load(id, function(err, author) {
    if (err) return next(err);
    if (!author) return next(new Error('Failed to load author ' + id));
    req.author = author;
    next();
  });
};

exports.create = function(req, res) {
  var author = new Author(req.body);
  if (res.user) {
    author.user = res.user;
  } else {
    author.user = res.req.user;
  }

  author.save(function(err) {
    if (err) {
      return res.status(401).json({error: 'Cannot save the author'});
    }
    res.status(200).json(author);
  });
};

exports.findAuthor = function(req, res) {
  var query = req.query.q;
  query = query.allTrim().toUtf8Standard();

  Author.find({
    name_utf8: query
  }, function(err, data) {
    if (err) return res.json(200, []);
    res.json(200, data);
  });
};

exports.search = function(req, res) {
  Author.find(
    {
      name_utf8: new RegExp(_.escape(req.query.q.toUtf8Standard()), 'i')
    }, 
    function(err, data) {
      if(err) return res.json(200, {authors:[]});
      res.json(200, {
        authors: _.map(data, function(item) {
          return {
            name: unescape(item.name).titleCase(),
            id: item._id
          };
        })
      });
    }
  );
};
