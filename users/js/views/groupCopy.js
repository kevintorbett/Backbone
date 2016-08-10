window.GroupCopyView = Backbone.View.extend({
    events: {

    },
    initialize: function() {
        this.render();
    },

    render: function() {
        var groups = [];
        var groups = this.model.models[0].attributes.items;
        var index1;
        var x = 0;
        $(this.el).html('<div id="wrapper" style="display:table; "><div id="row" style="display:table-row;">	<div id="application-selection" style="display:table-cell;" ><div class="control-group"><legend>Applications</legend><table class="rows1"></table></div></div><div id="group-selection" style="display:table-cell; vertical-align: top; width:300px ;"><div class="control-group"><legend>Please select the User to copy <b>TO</b></legend><row class="rows2"></row></div></div></div><div class="row status-bar"><div class="alert alert-success" style="display: none"><b>Success!</b> </div></div>');
        var len = groups.length;
        $('.rows1').html('');
        for (var i = 0; i < len; i++) {
            $('.rows1', this.el).append(new GroupCopyItemView({
                model: groups[i]
            }).render().el);
        }
    },
    submit: function() {
        var status = this.$el.find('input[name="grp1"]:checked').val();
        window.location.replace('#users/groups/' + status);
        return false;
    },
    highlight: function() {
        alert('fff')
        return false;
    }

});
window.GroupCopyItemView = Backbone.View.extend({

    tagName: "tr",

    initialize: function() {},

    render: function() {
        $(this.el).html(this.template(this.model));
        return this;
    }

});