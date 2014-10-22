'use strict';

var lyrics = require('../controllers/lyrics');

module.exports = function(Lyrics, app, auth, database) {
  app.route('/lyric')
    .post(lyrics.create);

  app.param('lyricId', lyrics.lyric);
};
