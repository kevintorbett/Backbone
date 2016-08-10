window.AppListView = Backbone.View.extend({
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
    var appObj=window.parent.controller.validateApplication(location);
    var su=appObj[0].superUser;
    var apps = this.model.models;
    var len = apps.length;
        $(this.el).html('<div id="usern" class="label" ></div><div id="wrapper" style="display:table; "><div id="row" style="display:table-row;">	<div id="application-selection" style="display:table-cell;" ><div class="control-group"><legend>Applications</legend><table class="rows1"></table></div></div><div id="group-selection" style="display:table-cell; vertical-align: top; width:300px ;"><div class="control-group"><legend>Groups</legend><table class="rows2"></table></div></div><div id="role-selection" style="display:table-cell; vertical-align: top; width:500px ;"><div class="control-group"><legend>Users/Roles</legend><table class="rows3"></table></div></div></div>');
        $('.rows1').append('<tr><td><br>authorized</td></tr>');
        for (var i = 0; i < len; i++) {
          if (isUserRoleValid(this.model.models[i].attributes.applicationName)){
            if (this.model.models[i].attributes.taggedYN ===1){
                $('.rows1', this.el).append(new AppListItemView({
                    model: this.model.models[i].attributes
                }).render().el);
                } else {
                $('.rows1', this.el).append(new AppListItem2View({
                    model: this.model.models[i].attributes
                }).render().el);
                }
          }
        }
         function isUserRoleValid(p_val) {
            if (appObj[0].superUser) {
              return true;
            }
            var p_bool = false;
            $.each(appObj[1], function(id, val) {
                 if (p_val.includes(val)) {
                    p_bool = true;
                }
            });
            return p_bool;
        }
    },
    submit: function(event) {
        var status = this.$el.find('input[name="app1"]:checked').val()
        $('.rows3').empty();
        if (status != undefined) { 
            window.location.replace('#users/groups/' + status);
            return true;
        }
        status = this.$el.find('input[name="grp1"]:checked').val()
         return true;
    },
    submit2: function(e) {
        var lname = $("#usern").val();
        var lid = e.currentTarget.value;
        
        var lgrpid = this.$el.find('input[name="grpid"]:checked').val();
        var lch = e.currentTarget.checked
        status = this.$el.find('input[name="grp1"]:checked').val()
        if (status==='undefined'){
         $("#"+appid).replaceWith('<img id="'+appid+'" class="appClass" src="./pics/blank.png" name="app1" alt="Groups" appid="'+appid+'" title="Groups using this application">');
        }
        else{
               $("#"+appid).replaceWith('<img id="'+appid+'" class="appClass" src="./pics/check.png" name="app1" alt="Groups" appid="'+appid+'" title="Groups using this application">');
  
        }
          var lappid = $('#appid').val();
          if (lch) {
            var ATYPE = 'POST'
            var text1 = '[{"group": {"id":' + lid + '},"user": {"id":"' + userid + '"}}]'
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
    
                if (data.error) { // If there is an error, show the error messages
                    $('.alert-error').text(data.error.text).show();
                } else { // If not, send them back to the home page
                }
            },
            error: function(msg) {
                console.log(msg.status)
                localStorage.setItem('logged', '1');
                window.location.replace('#users/page/');
            }

        });

  


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
window.AppListItemView = Backbone.View.extend({

    tagName: "tr",


    initialize: function() {},

    render: function() {
        $(this.el).html(this.template(this.model));
        return this;
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