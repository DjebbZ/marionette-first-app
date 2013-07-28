var App = require('application');

module.exports = Backbone.Marionette.ItemView.extend({
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