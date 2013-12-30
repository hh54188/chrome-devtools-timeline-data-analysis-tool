var Grid = (function () {

    var Data = Backbone.Model.extend({});

    var Set = Backbone.PageableCollection.extend({
        model: Data,
        state: {
            pageSize: 10
        },
        mode: "client"
    });

    // var columns = [{
    //     name: "name",
    //     label: "Name",
    //     cell: "string"
    // }, {
    //     name: "age",
    //     label: "Age",
    //     cell: "string"
    // }];

    var create = function (container, columns, data) {

        container.empty();

        var set = new Set(data);

        var pageableGrid = new Backgrid.Grid({
            columns: columns,
            collection: set
        });

        container.append(pageableGrid.render().$el);

        /*pager*/

        var paginator = new Backgrid.Extension.Paginator({

            collection: set
        });

        container.append(paginator.render().$el);

        /*filter*/

        var filter = new Backgrid.Extension.ClientSideFilter({
            collection: set.fullCollection
        });

        container.prepend(filter.render().$el);

        // Add some space to the filter and move it to the right
        filter.$el.css({float: "right", margin: "10px"});   
    }

    return {
        create: create
    }

})()