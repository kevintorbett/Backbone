// The in-memory Store. Encapsulates logic to access parts data.
window.store = {

    parts: {},

    populate: function () {

        this.parts[1] = {
            id: 1,
            name: "Engine Valve",
            year: "2009",
            manufacturer: "France",
            description: "Nissan engine valve",
            picture: "valve.jpg"
        };
        this.parts[2] = {
            id: 2,
             name: "Engine carburetor",
            year: "2009",
            manufacturer: "France",
            description: "Nissan engine carburetor",
            picture: "carb.jpg"
        };
     

        this.lastId = 2;
    },

    find: function (model) {
        return this.parts[model.id];
    },

    findAll: function () {
        return _.values(this.parts);
    },

    create: function (model) {
        this.lastId++;
        model.set('id', this.lastId);
        this.parts[this.lastId] = model;
        return model;
    },

    update: function (model) {
        this.parts[model.id] = model;
        return model;
    },

    destroy: function (model) {
        delete this.parts[model.id];
        return model;
    }

};

store.populate();

// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple in-memory approach.
Backbone.sync = function (method, model, options) {

    var resp;

    switch (method) {
        case "read":
            resp = model.id ? store.find(model) : store.findAll();
            break;
        case "create":
            resp = store.create(model);
            break;
        case "update":
            resp = store.update(model);
            break;
        case "delete":
            resp = store.destroy(model);
            break;
    }

    if (resp) {
        options.success(resp);
    } else {
        options.error("Record not found");
    }
};