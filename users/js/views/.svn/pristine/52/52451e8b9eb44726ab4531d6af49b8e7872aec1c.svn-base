window.UserView = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change": "change",
        "click .save": "beforeSave",
        "click .delete": "deleteUser",
        "drop #picture": "dropHandler"
    },

    change: function(event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },

    beforeSave: function() {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        // Upload picture file if a new file was dropped in the drop area
        if (this.pictureFile) {
            this.model.set("picture", this.pictureFile.name);
            utils.uploadFile(this.pictureFile,
                function() {
                    self.saveUser();
                }
            );
        } else {
            this.saveUser();
        }
        return false;
    },

    saveUser: function() {
        var appObj = window.parent.controller.validateApplication(location);
        var token = appObj[0].token;
        var appId = appObj[0].id;
        var self = this;

        var username = $('#name').val();
        var version = $('#version').val();
        var userId = $('#userId').val();
        var superUser = $('#superUser').val();
        var allowMultipleSessions = $('#allowMultipleSessions').val();
        var domain = 'DEV';
        var locked = $('#locked').val();
        if (userId === 'null' || userId === '') {
            var type = 'POST'
        } else {
            var type = 'PUT'
        };

        //    };
        var text1 = '[{id="' + userId + '",username="' + username + '",allowMultipleSessions="' + allowMultipleSessions + '",domain="AMERICAS",superUser="' + superUser + '",retryCount="0",locked="' + locked + '",version="' + version + '"}]';



        //     formValues.toJSON()
        $.ajax({
            url: '/IMDBMiddlewareService/api/system/users/',
            type: type,
            beforeSend: function(req) {
                req.setRequestHeader('Authorization', token);
                req.setRequestHeader('Authorization-Application', appId);

            },
            contentType: "application/json",
            dataType: "json",
            data: text1,
            success: function(data, tmp, xhr) {
                userId = data.id;
                switch (data[0].returnCode) {
                    case 602:
                        userId = data[0].id
                            //    window.location.replace('#users/page/1');
                        break;
                    case 601:
                        userId = data[0].id
                            //    window.location.replace('#users/page/1');
                        break;
                    default:
                        utils.showAlert('Error', 'An error occurred-- ' + data[0].returnMessages, data[0].returnCode);

                }
                //        if (superUser==='Yes') 
                //     {


                version = version * 1;

                jQuery.ajax({
                    type: "PUT",
                    beforeSend: function(req) {
                        req.setRequestHeader('Authorization', token);
                        req.setRequestHeader('Authorization-Application', appId);

                    },
                    contentType: "application/json",
                    url: baseURL + "/users/super/",
                    dataType: "json",
                    data: '[{id="' + userId + '",superUser="' + superUser + '",version="' + version + '"}]',
                    timeout: 10000,
                    success: function(data, tmp, xhr) {
                        switch (data[0].returnCode) {
                            case 601:
                                window.location.replace('#users/page/1');
                                break;
                            case 602:
                                window.location.replace('#users/page/1');
                                break;
                            default:
                                utils.showAlert('Error', 'An error occurred-- ' + data[0].returnCode);

                        }
                    },
                    error: function(msg) {
                        utils.showAlert('Error', 'A error occurred ', msg);
                    }

                });
                //       }  
            },
            error: function(msg) {
                utils.showAlert('Error', 'A error occurred ', msg);
            }

        });

        //   event.preventDefault(); // Don't let this button submit the form

    },

    deleteUser: function() {
        this.model.destroy({
            success: function() {
                alert('User deleted successfully');
                window.history.back();
            },
            error: function() {
                utils.showAlert('Error', 'An error occurred ', 'alert-error');
            }
        });
        return false;
    },

    dropHandler: function(event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];

        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function() {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    }

});