'use strict';

var mongoose = require('mongoose'),
    Lyric = mongoose.model('Lyric'),
    authors = require('./authors'),
    Author = mongoose.model('Author'),
    Canvas = require('canvas'),
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
function updateLyric(id, req, res){
  Lyric.update(
    {
      _id: id
    }, 
    {
      song_content: req.body.song_content,
      song_content_utf8: req.body.song_content.toUtf8Standard()
    }, 
    {},
    function(err, numberAffected, rawResponse) {
      if(err) {
        return res.status(400).json({
          errorCode: err.message
        });
      }
      return res.status(200).json({
        status: 'Update lyric successfully'
      });
    }
  );
}

function newLyric(req, res){
  var lyric = new Lyric(req.body);
  lyric.user = req.user;

  lyric.save(function(err) {
    if(err) {
      console.log(err);
      return res.status(400).json({
        errorCode: err.message
      })
    }
    return res.status(200).json({
      status: 'Save lyric successfully.'
    });
  });  
}

function checkLyric(req, res){
  Lyric.findLyric(req.body.song_name, req.body.author, function(err, data) {
    if (data.length !== 0) {
      return updateLyric(data[0]._id, req, res);
    } else {
      return newLyric(req, res)
    }
  })
}

exports.create = function(req, res) {
  if(_.isString(req.body.author)) {
    var author = new Author({
      name: req.body.author,
      biography: '',
      user: req.user
    });
    Author.findAuthor(req.body.author, function(err, data) {
      if(data.length === 0) {
        author.save(function(err) {
          if (!err) {
            req.body.author = author._id;
            return checkLyric(req, res);
          }
        });
      } else {
        req.body.author = data[0]._id;
        return checkLyric(req, res);
      }
    });
  } else {
    req.body.author = req.body.author.id;
    return checkLyric(req, res);
  }
};

exports.search = function(req, res) {
  Lyric.find(
    {
      song_name_utf8: new RegExp(_.escape(req.query.q.toUtf8Standard()), 'i')
    }, 
    function(err, data) {
      if(err) return res.status(200).json({lyrics:[]});
      res.status(200).json({
        lyrics: _.map(data, function(item) {
          return {
            name: unescape(item.song_name).titleCase(),
            id: item._id
          };
        })
      });
    }
  );
};

function calculateCenter (maxWidth, width) {
  var center = (maxWidth - width) / 2;
  return center;
}

function wrapText(canvas, context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';
  var wrap = false

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(line, calculateCenter(maxWidth, line.length), y);
      line = words[n] + ' ';
      y += lineHeight;
      wrap = true
    }
    else {
      line = testLine;
    }
  }
  
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  if (wrap) {
    context.fillText(line, calculateCenter(maxWidth, line.length), y);
  } else {
    context.fillText(line, calculateCenter(maxWidth, line.length), canvas.height/2);
  }
}

function generateAvater(text) {
  var width = 85, height = 85
  var canvas = new Canvas(width, height), 
      ctx = canvas.getContext('2d');

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height - 5);

  ctx.font = 'bold 13pt arial';
  ctx.fillStyle = "#ffffff";

  wrapText(canvas, ctx, text, 2, 18, width, 25);

  return canvas.toDataURL()
}

exports.all = function(req, res) {
  Lyric.getAll(req.query, function(err, data) {
    if(err) return res.status(200).json({
      lyrics: []
    });
    var index = 1;
    res.status(200).json({
      lyrics: _.map(data, function(item) {
        return {
          name: item.song_name.titleCase(),
          content: item.song_content,
          author: {
            id: item.author._id,
            name: item.author.name
          },
          id: item._id,
          index: index++,
          avatar: generateAvater(item.author.name)
        }
      })
    });
  })
};