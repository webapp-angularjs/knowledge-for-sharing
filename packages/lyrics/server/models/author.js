'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Song author Schema
 */
var AuthorSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },  
  name: {
    type: String,
    required: true,
    trim: true
  },
  name_utf8: {
    type: String,
    unique: true,
    required: false,
    trim: true
  },
  biography: {
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
AuthorSchema.path('name').validate(function(name) {
  return !!name;
}, 'Author cannot be blank');

/**
 * after-save hook
 */
AuthorSchema.pre('save', function(next) {
  console.log ('[' + this.name + ']=' + this.name.length);
  this.name = this.name.titleCase().allTrim();
  console.log ('[' + this.name + ']=' + this.name.length);
  this.name_utf8 = this.name.toUtf8Standard();
  next();
});

/**
 * define some method for model
 */
AuthorSchema.static({
  findAuthor: function(author, cb) {
    return this.find({
      name_utf8: author.allTrim().toUtf8Standard()
    }, cb)
  }
});

mongoose.model('Author', AuthorSchema);