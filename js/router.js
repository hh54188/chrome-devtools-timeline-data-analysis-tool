var AppRouter = Backbone.Router.extend({
    routes: {
        "category/:category_name": "getCategoryDetail"
    }
});

var app_router = new AppRouter;

app_router.on('route:getCategoryDetail', function (name) {
    var data = Filter.getByCategory();
    console.log(data[name]);
});


Backbone.history.start();