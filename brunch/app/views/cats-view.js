var CatView = require('views/cat-view');

module.exports = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    id: "cats",
    className: "pure-table pure-table-striped",
    template: "#cats-tpl",
    itemView: CatView,
    itemViewContainer: "tbody"
});
