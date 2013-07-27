var App = new Backbone.Marionette.Application();

App.addRegions({
    mainRegion: "#content"
});

var Cat = Backbone.Model.extend({
    defaults: {
        rank: 0
    }
});

var Cats = Backbone.Collection.extend({
    model: Cat
});

var CatView = Backbone.Marionette.ItemView.extend({
    template: "#cat-tpl",
    tagName: "tr",
    className: "cat"
});

var CatsView = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    id: "cats",
    className: "pure-table pure-table-striped",
    template: "#cats-tpl",
    itemView: CatView,
    itemViewContainer: "tbody"
});

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
});