window.AppList2View = Backbone.View.extend({
    events: {
        'click [type="radio"]': 'submit',
        'click [type="checkbox"]': 'submit2',
        'click .rules': 'highlight',
        'click .users': 'highlight2',
        'click .appClass': 'highlight3'

    },
    initialize: function() {
        this.render();
    },

    render: function() {
        var apps = this.model.models[0].attributes.items;

        var groups = this.model.models[0].attributes.items;
        var len = groups.length;
     //   $('.rows1').append('<tr id="notauth"><td><br><b>Not authorized</b></td></tr>');
        for (var i = 0; i < len; i++) {
            var good = 'y';
            $('img[name="app1"]').each(function() {
                if (groups[i].id === parseInt($(this).attr('appid'))) {
                    good = 'n';
                }
            });
            if (good === 'y') {

                $('.rows1').append(new AppListItem2View({
                    model: apps[i]
                }).render().el);
                $("tr:even").css("background-color", "#dddddd");
            }

        }
    },
    submit: function(event) {
        console.log($(event.currentTarget))
        var status = this.$el.find('input[name="app2"]:checked').val()
        alert(status)
        if (status != undefined) {
            window.location.replace('#users/groups/' + status);
            return true;
        }
        status = this.$el.find('input[name="grp1"]:checked').val()
        console.log(status)
        return true;


    },
    submit2: function(e) {
        var lname = $("#usern").val();
        var lid = e.currentTarget.value
        var lgrpid = e.currentTarget.grpid
        var lch = e.currentTarget.checked
        var luser = e.currentTarget.userid
        var lappid = $( e.currentTarget ).find('appid')
        var status = this.$el.find('input[name="app1"]:checked').val()
        if (lch) {
            var ATYPE = 'POST'
            var text1 = '[{"group": {"id":' + lgrpid + '},"user": {"id":"' + userid + '"}}]'
        } else {
            var ATYPE = 'DELETE'
            var text1 = '[{"id":"' + lid + '"}]'
        }
        $.ajax({
            url: location.protocol+'//'+location.host+'/IMDBMiddlewareService/api/system/users/groups',
            contentType: "application/json",
            type: ATYPE,
            beforeSend: function(p_req) {
                p_req.setRequestHeader('Authorization-Application', 1);
            },
            dataType: "json",
            data: text1,
            success: function(data) {
                console.log(["Login request details: ", data]);

                if (data.error) { // If there is an error, show the error messages
                    $('.alert-error').text(data.error.text).show();
                } else { // If not, send them back to the home page
                    window.location.replace('#users/groups/' + lappid);
                }
            },
            error: function(msg) {
                console.log(msg.status)
                localStorage.setItem('logged', '1');
                window.location.replace('#users/page/');
            }
        });
        window.location.replace("#users/groups/ " + status);
        return false;

    },
    highlight: function(event) {
        $("table.rows2").find("img").removeClass('selected').addClass('rules');
        event.currentTarget.className = 'selected'
        return true;
    },
    highlight2: function(event) {
        $("table.rows2").find("img").removeClass('selected').addClass('users');
        event.currentTarget.className = 'selected'
        return true;
    },
     highlight3: function(event) {
        $("table.rows1").find("td").removeClass('selected').addClass('appClass');
        $("table.rows1").find("img").removeClass('selected').addClass('appClass');
        event.currentTarget.className = 'selected'
        return true;
    }
});
window.AppListItem2View = Backbone.View.extend({

    tagName: "tr",

    initialize: function() {},

    render: function() {
        $(this.el).html(this.template(this.model));
        return this;
    }

});