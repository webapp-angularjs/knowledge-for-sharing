'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Lyrics = new Module('lyrics');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Lyrics.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Lyrics.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Lyrics.menus.add({
        title: 'Lyrics',
        link: 'lyrics',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Lyrics.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Lyrics.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Lyrics.settings(function(err, settings) {
        //you now have the settings object
    });
    */
    
    Lyrics.aggregateAsset('css', 'lyrics.css');

    return Lyrics;
});
