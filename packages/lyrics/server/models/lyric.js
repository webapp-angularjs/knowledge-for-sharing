'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Lyric Schema
 */
var LyricSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },  
  author: {
    type: Schema.ObjectId,
    ref: 'Author'
  },
  song_name: {
    type: String,
    required: true,
    trim: true
  },
  song_name_utf8: {
    type: String,
    required: false,
    trim: true
  },
  song_content: {
    type: String,
    required: true,
    trim: true
  },
  song_content_utf8: {
    type: String,
    required: false,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
LyricSchema.path('song_name').validate(function(title) {
  return !!title;
}, 'Song name cannot be blank');

LyricSchema.path('song_content').validate(function(lyric){
  return !!lyric;
}, 'Content song cannot be blank');

LyricSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

/**
 * after-save hook
 */
LyricSchema.pre('save', function(next) {
  this.song_name = this.song_name.allTrim().titleCase();
  this.song_name_utf8 = this.song_name.toUtf8Standard();
  this.song_content_utf8 = this.song_content.toUtf8Standard();
  next();
});

mongoose.model('Lyric', LyricSchema);