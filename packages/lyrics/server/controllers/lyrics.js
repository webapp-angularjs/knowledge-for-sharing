'use strict';

var mongoose = require('mongoose'),
  Lyric = mongoose.model('Lyric'),
  _ = require('lodash');

/**
 * Find lyric by id
 */
exports.lyric = function(req, res, next, id) {
  Lyric.load(id, function(err, lyric) {
    if (err) return next(err);
    if (!lyric) return next(new Error('Failed to load lyric ' + id));
    req.lyric = lyric;
    next();
  });
};

/**
 * Create an lyric
 */
exports.create = function(req, res) {
  res.status(200).json({
    errorCode: 'Cannot save the song lyric'
  });  
  // var lyric = new Lyric(req.body);
  // lyric.user = req.user;

  // lyric.save(function(err) {
  //   if(err) {
  //     return res.json(500, {
  //       error: 'Cannot save the song lyric'
  //     });
  //   }
  //   res.json(lyric);
  // });
};
