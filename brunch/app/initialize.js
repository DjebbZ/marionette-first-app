var App = require('application'),
    Cats = require('collections/cats'),
    Cat = require('models/cat'),
    CatsView = require('views/cats-view');

App.addInitializer(function(options) {
    var catsView = new CatsView({
        collection: options.cats
    });
    App.mainRegion.show(catsView);
});


$(function() {
    var cats = new Cats([
        { name: 'Wet Cat', image_path: "http://lorempixel.com/100/100/cats/1" },
        { name: 'Bitey Cat', image_path: "http://lorempixel.com/100/100/cats/2" },
        { name: 'Surprised Cat', image_path: "http://lorempixel.com/100/100/cats/3" }
    ]);

    App.start({ cats: cats });

    cats.add(new Cat({
        name: 'Other Cat',
        image_path: "http://lorempixel.com/100/100/cats/4",
        rank: cats.size() + 1
    }));
});