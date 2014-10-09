'use strict';

// The Package is past automatically as first parameter
module.exports = function(Lyrics, app, auth, database) {

    app.get('/lyrics/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/lyrics/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/lyrics/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/lyrics/example/render', function(req, res, next) {
        Lyrics.render('index', {
            package: 'lyrics'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
