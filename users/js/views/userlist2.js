window.UserList2View = Backbone.View.extend({

    events: {
        'submit': 'submit',
        'click [type="button"]': 'submit',
    },
    initialize: function() {
        this.render();
    },

    render: function() {

        var users = this.model.models[0].attributes.items;
        var id = this.id;
        var len = users.length;
        var l_str =
            '<div id="application-selection">' +
            '<select id="user_to">';
        for (var i = 0; i < len + 1; i++) {
            if (i === len) {
                l_str += '</select></div>';
                l_str += '<div id="application-copy" align="right">' +
                    '<br><button id="ds_copy" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" title="Copy Applications">Copy</button></div>';

                $('.rows2').append(l_str);
                break;
            }
            l_str += '<option  value="' + users[i].id + '" >' + users[i].domain + '/' + users[i].username + '</option>';

        }
        $('#ds_copy').unbind('click')
            .click(function() {
                var l_user_to = jQuery('#user_to option:selected').val()

                var l_appArray = [];
                var l_i = 0;
                $('input:checkbox[name=grp1]').each(function() {
                    if ($(this).is(':checked')) {
                        l_appArray[l_i] = $(this).val();
                        l_i = l_i + 1;
                    }
                });

                var ATYPE = 'PUT'
                var text1 = '[{"userIdFrom":"' + id + '","userIdTo":"' + l_user_to + '","applications":"' + l_appArray + '"}]'
                $.ajax({
                    url: location.protocol+'//'+location.host+'/IMDBMiddlewareService/api/imr/userMaint/copy',
                    contentType: "application/json",
                    type: ATYPE,
                    beforeSend: function(p_req) {
                        p_req.setRequestHeader('Authorization-Application', 1);
                    },
                    dataType: "json",
                    data: text1,
                    success: function(data) {
                        console.log(data)
                        console.log(["Login request details: ", data]);

                        if (data[0].dbReturnCode > 0) { // If there is an error, show the error messages
                            utils.showAlert('Error', data[0].dbReturnMessage, 'alert-error');
                        } else { // If not, send them back to the home page
                            utils.showAlert('', data[0].dbReturnMessage, 'alert-error');
                        }
                    },
                    error: function(msg) {
                        localStorage.setItem('logged', '1');
                        window.location.replace('#users/page/');
                    }

                });
                return true;


            });
    },
    submit: function() {
        var status = this.$el.find('input[name="role1"]:checked').val();
        window.location.replace('#users/roles/' + status);
        return false;
    }
});
window.UserListItem2View = Backbone.View.extend({

    tagName: "tr",

    initialize: function() {},

    render: function() {
        $(this.el).html(this.template(this.model));
        return this;
    }

});