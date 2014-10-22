'use strict';

var authors = require('../controllers/authors');

module.exports = function(Lyrics, app, auth, database) {
  app.route('/authors/findAuthor')
    .get(authors.findAuthor);

  app.route('/author')
    .post(authors.create);

  app.route('/authors/search')
    .get(authors.search);

  app.param('authorId', authors.author);
};