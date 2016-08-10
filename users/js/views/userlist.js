window.UserListView = Backbone.View.extend({
    events: {
        'submit': 'submit',
        'click': 'submit'
    },
    initialize: function() {
        this.render();
    },

    render: function() {
        var users = this.model.models[0].attributes.items;
        var len = users.length;
        $('.rows3').html('');
        for (var i = 0; i < len; i++) {
           $('.rows3').append(new UserListItemView({
                model: users[i]
            }).render().el);
        }
    },
    submit: function() {
        var status = this.$el.find('input[name="role1"]:checked').val();
        window.location.replace('#users/roles/' + status);
        return false;
    }
});
window.UserListItemView = Backbone.View.extend({

    tagName: "tr",
    initialize: function() {},

    render: function() {
        $(this.el).html(this.template(this.model));
        return this;
    }

});