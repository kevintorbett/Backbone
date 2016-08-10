window.Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize:function () {
     },

    render:function () {
         var items = this.model.models[0].attributes.items;
        var len = items.length;
        var pageCount = Math.ceil(len / 20);

        $(this.el).html('<ul />');
        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#users/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }
});