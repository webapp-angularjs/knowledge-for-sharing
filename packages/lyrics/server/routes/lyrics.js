'use strict';

var lyrics = require('../controllers/lyrics');

module.exports = function(Lyrics, app, auth, database) {
  app.route('/lyric')
    .post(lyrics.create);

  app.route('/lyrics/search')
    .get(lyrics.search);

  app.route('/lyrics/all')
    .get(lyrics.all);

  app.param('lyricId', lyrics.lyric);
};
