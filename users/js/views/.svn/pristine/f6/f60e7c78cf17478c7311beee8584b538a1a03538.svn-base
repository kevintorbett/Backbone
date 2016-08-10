window.UsersListView = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        var users = this.model.models[0].attributes.items;
        var len = users.length;
        var startPos = (this.options.page - 1) * 20;
        var endPos = Math.min(startPos + 20, len);
        var endPos = Math.min(startPos + 20, len);
        users.sort(SortByName);
        $(this.el).html('<table width="100%" class="userheader"><tr><th align="left">&nbsp;&nbsp;USER</th><th align="left">SUPERUSER</th><th align="left">DOMAIN</th><th align="left">LOCKED</th><th align="left">RETRY</th><th align="left">MULTI SESSIONS</th><th align="left">LAST LOGIN</th><th align="left">APPLICATIONS</th><th align="left">COPY USER</th></tr>');
        for (var i = startPos; i < endPos; i++) {
            $('.userheader', this.el).append(new UsersListItemView({
                model: users[i]
            }).render().el);
        }
        $(this.el).append(new Paginator({
            model: this.model,
            page: this.options.page
        }).render().el);
        return this;
    }
});

window.UsersListItemView = Backbone.View.extend({

    tagName: "tr",

    initialize: function() {},

    render: function() {
        $(this.el).html(this.template(this.model));
        return this;
    }

});

function SortByName(x, y) {
    return ((x.username == y.username) ? 0 : ((x.username > y.username) ? 1 : -1));
}