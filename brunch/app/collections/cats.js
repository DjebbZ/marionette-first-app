var Cat = require('models/cat'),
    App = require('application');

module.exports = Backbone.Collection.extend({
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

            self.trigger("reset");
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
