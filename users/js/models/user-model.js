define(
['jquery', 'lodash', 'backbone'],

function($, _, Backbone) {

    var Part = Backbone.Model.extend({
        urlRoot: "users/",
        defaults: {
            "id": null,
            "name": "",
            "manufacturer": "USA",
            "year": "",
            "description": "",
            "picture": ""
        }
    });

    return User;
});