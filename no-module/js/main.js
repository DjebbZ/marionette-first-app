var App = new Backbone.Marionette.Application();

App.addRegions({
    mainRegion: "#content"
});

var Cat = Backbone.Model.extend({
    defaults: {
        rank: 0,
        votes: 0
    },

    rankUp: function () {
        this.set("rank", this.get("rank") - 1);
    },

    rankDown: function () {
        this.set("rank", this.get("rank") + 1);
    },

    addVote: function() {
        this.set("votes", this.get("votes") + 1);
    }
});

var Cats = Backbone.Collection.extend({
    model: Cat,

    initialize: function (cats) {
        var rank = 1, self = this;

        _.each(cats, function (cat) {
            cat.rank = rank;
            rank = rank + 1;
        });

        App.on("rank:up", function (cat) {
            if (cat.get("rank") === 1) {
                // can't increase rank of top-ranked cat
                return true;
            }
            self
                .rankUp(cat)
                .sort()
                .trigger("reset");
        });

        App.on("rank:down", function (cat) {
            if (cat.get("rank") === self.size()) {
                // can't decrease rank of lowest ranked cat
                return true;
            }
            self
                .rankDown(cat)
                .sort()
                .trigger("reset");
        });

        App.on('cat:disqualify', function (cat) {
            var disqualifiedRank = cat.get("rank"),
                catsToUpRank = self.filter(function (cat) {
                    return cat.get("rank") > disqualifiedRank;
                });

            catsToUpRank.forEach(function (cat) {
                cat.rankUp();
            });

            // self.trigger("reset");
        });
    },

    comparator: function (cat) {
        return cat.get("rank");
    },

    rankUp: function (cat) {
        // find the cat we're going to swap ranks with
        var rankToSwap = cat.get("rank") - 1,
            otherCat = this.at(rankToSwap - 1);

        // swap ranks
        cat.rankUp();
        otherCat.rankDown();

        return this;
    },

    rankDown: function (cat) {
        // find the cat we're going to swap ranks with
        var rankToSwap = cat.get("rank") + 1,
            otherCat = this.at(rankToSwap - 1);

        // swap ranks
        cat.rankDown();
        otherCat.rankUp();

        return this;
    }
});

var CatView = Backbone.Marionette.ItemView.extend({
    template: "#cat-tpl",
    tagName: "tr",
    className: "cat",

    events: {
        "click .js-btn-up": "rankUp",
        "click .js-btn-down": "rankDown",
        "click .js-btn-disqualify": "disqualify"
    },

    initialize: function () {
        this.listenTo(this.model, "change:votes", this.render);
    },

    rankUp: function () {
        this.model.addVote();
        App.trigger("rank:up", this.model);
    },

    rankDown: function () {
        this.model.addVote();
        App.trigger("rank:down", this.model);
    },

    disqualify: function () {
        App.trigger('cat:disqualify', this.model);
        this.model.destroy();
    }
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

    cats.add(new Cat({
        name: 'Other Cat',
        image_path: "http://lorempixel.com/100/100/cats/4",
        rank: cats.size() + 1
    }));
});