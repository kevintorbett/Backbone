window.GroupList2View = Backbone.View.extend({
    events: {
        'submit': 'submit',
        'click': 'submit'
    },
    initialize: function() {
        this.render();
    },

    render: function() {
        var groups = this.model.models[0].attributes.items;
        var len = groups.length;
        var xx = '';
        for (var i = 0; i < len; i++) {
            var good = 'y';
            $('input[name="grp1"]:checked').each(function() {
                if (groups[i].id === parseInt($(this).attr('grpid'))) {
                    good = 'n';
                }
            });
            if (good === 'y') {
                $('.rows2').append(new GroupListItem2View({
                    model: groups[i]
                }).render().el);
            }
        }
    },
    submit: function() {
        alert('ddd')
        var status = this.$el.find('input[name="grp1"]:checked').val();
        window.location.replace('#users/groups/' + status);
        return false;
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