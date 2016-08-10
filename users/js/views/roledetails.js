window.RoleListView = Backbone.View.extend({
    events: {
        'submit': 'submit',
        'click': 'submit'
    },
    initialize: function() {
        this.render();
    },

    render: function() {
        var roles = this.model.models[0].attributes.items;
        var len = roles.length;
        var index1;
        var x = 0;
        var len = roles.length;
        $('.rows3').html('');
        for (var i = 0; i < len; i++) {
        if(roles[i].role.name.search(/default/i) != -1) 
     //    if (roles[i].role.name ==='DEFAULT' || roles[i].role.name ==='default' )
          {}
        else{
            $('.rows3').append(new RoleListItemView({
                model: roles[i]
            }).render().el);
          }
        }
    },
    submit: function() {
        var status = this.$el.find('input[name="role1"]:checked').val();
        window.location.replace('#users/roles/' + status);
        return false;
    }


});
window.RoleListItemView = Backbone.View.extend({

    tagName: "tr",


    initialize: function() {},

    render: function() {
        $(this.el).html(this.template(this.model));
        return this;
    }

});