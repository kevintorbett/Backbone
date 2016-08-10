window.GroupListView = Backbone.View.extend({
    events: {
        'submit': 'submit',
        'click': 'submit'
    },
    initialize: function() {
        this.render();
    },

    render: function() {
    $('.rows3').empty();
        var groups = [];
        var groups2 = this.model.models;
        var len = groups2.length;
         for (var i = 0; i < len; i++) {
             var id = this.model.models[0].attributes.applicationId;
            if (this.model.models[i].attributes.taggedYN ===1){
            $('.rows2').append(new GroupListItemView({
                model: this.model.models[i].attributes
            }).render().el);
            } else {
            $('.rows2').append(new GroupListItem2View({
                model: this.model.models[i].attributes
            }).render().el);
            }

        }
            $('.rows2').append('<input type="hidden" id="appid" value="'+id+'">')

    },
    submit: function() {
        var status = this.$el.find('input[name="grp1"]:checked').val();
        $('.rows3').empty();
        window.location.replace('#users/groups/' + status);
        return false;
    },
    highlight: function() {
        return false;
    }
});
window.GroupListItemView = Backbone.View.extend({

    tagName: "tr",

    initialize: function() {},

    render: function() {
        $(this.el).html(this.template(this.model));
        return this;
    }

});
window.GroupListItem2View = Backbone.View.extend({

    tagName: "tr",

    initialize: function() {},

    render: function() {
        $(this.el).html(this.template(this.model));
        return this;
    }

});