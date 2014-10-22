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
  // req.body.song_name = req.body.song_name.allTrim();
  // req.body.song_content = req.body.song_content.allTrim();
  
  // req.body.song_name_utf8 = req.body.song_name.toUtf8Standard();
  // req.body.song_content_utf8 = req.body.song_content.toUtf8Standard();

  var lyric = new Lyric(req.body);
  lyric.user = req.user;

  lyric.save(function(err) {
    if(err) {
      return res.json(500, {
        error: 'Cannot save the song lyric'
      });
    }
    res.json(lyric);
  });
};
