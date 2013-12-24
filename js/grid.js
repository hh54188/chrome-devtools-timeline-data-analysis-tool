function Grid(columns, data, container_selector) {

    var Data = Backbone.Model.extend({});

    var Set = Backbone.Collection.extend({
        model: Data
    });

    var set = new Set(data);

    var grid = new Backgrid.Grid({
        columns: columns,
        collection: set
    });

    $(container_selector).append(grid.render().$el);
}