module.exports = Backbone.Model.extend({
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
