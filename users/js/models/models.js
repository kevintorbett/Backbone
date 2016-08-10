window.User = Backbone.Model.extend({

    urlRoot: location.protocol + '//' + location.host + '/IMDBMiddlewareService/api/system/users',

    initialize: function(options) {
        this.validators = {};
        this.validators.username = function(value) {
            return value.length > 0 ? {
                isValid: true
            } : {
                isValid: false,
                message: "You must enter a username"
            };
        };


        //    this.validators.domain = function (value) {
        //        return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a domain"};
        //    };

    },

    validateItem: function(key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {
            isValid: true
        };
    },

    validateAll: function() {

        var messages = {};

        for (var key in this.validators) {
            if (this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {
            isValid: false,
            messages: messages
        } : {
            isValid: true
        };
    },

    defaults: {
        id: null,
        username: "",
        superUser: "",
        version: "",
        domain: "",
        locked: "false",
        retryCount: "",
        allowMultipleSessions: ""
    },


});
var baseURL = location.protocol + '//' + location.host + '/IMDBMiddlewareService/api/system';
var userURL = location.protocol + '//' + location.host + '/IMDBMiddlewareService/api/imr';
var loginURL = location.protocol + '//' + location.host + '/IMDBMiddlewareService/api/system/users';
var appObj = window.parent.controller.validateApplication(location);
var token = appObj[0].token;
var su = appObj[0].superUser;
$.ajaxSetup({
    headers: {
        'Authorization': token,
        'Authorization-Application': appObj[0].id
    }
});
window.UserCollection = Backbone.Collection.extend({

    model: User,
    dataType: "json",
    url: baseURL + '/users?sort=name&searchCriteria=[{"searchType":"eq","values":["false"],"field":"locked"},{"searchType":"ne","values":["AUTO"],"field":"domain"}]',

});
window.Users1Collection = Backbone.Collection.extend({

    model: User,
    dataType: "json",
    url: baseURL + '/users?sort=id&searchCriteria=[{"searchType":"eq","values":["false"],"field":"locked"},{"searchType":"ne","values":["AUTO"],"field":"domain"}]',

});
window.AppCollection2 = Backbone.Collection.extend({

    model: User,
    dataType: "json",
    url: baseURL + '/applications?sort=name'

});
window.AppCollection = Backbone.Collection.extend({

    model: User,
    dataType: "json",
    data: '[{": {"userId":"' + this.userid + '"}]',
    url: function() {
        data: '[{": {"userId":"' + this.userid + '"}]'
        return userURL + '/userMaint/users/applications'
    },
    initialize: function(opt) {
        this.id = opt.id;
        this.userid = opt.userId;
    },
});
window.GroupCollection = Backbone.Collection.extend({

    model: User,
    dataType: "json",
    url: function() {
        return userURL + '/userMaint/users/groups?'
    },
    initialize: function(opt) {
        this.id = opt.id;
        this.userid = opt.userid;
    },
    update: function() {
        console.log("update : ")
    }
});

window.Group2Collection = Backbone.Collection.extend({

    model: User,
    dataType: "json",
    url: function() {
        return baseURL + '/applications/groups?sort=name&searchCriteria=[{"searchType":"eq","values":["' + this.id + '"],"field":"application.id"}]'
    },
    initialize: function(opt) {
        this.id = opt.id;
    }
});
window.GroupCopyCollection = Backbone.Collection.extend({

    model: User,
    dataType: "json",
    url: function() {
        return baseURL + '/users/' + this.id + '/applications'
    },
    initialize: function(opt) {
        this.id = opt.id;
    }
});
window.RoleCollection = Backbone.Collection.extend({
    dataType: "json",
    model: User,
    url: function() {
        return baseURL + '/applications/groups/roles?sort=role.description&searchCriteria=[{"searchType":"eq","values":["' + this.id + '"],"field":"group.id"}]'
    },
    initialize: function(opt) {
        this.id = opt.id;
    }
});
window.UsersCollection = Backbone.Collection.extend({

    model: User,
    dataType: "json",
    url: function() {
        return userURL + '/userMaint/groups/users?sort=userName&searchCriteria=[{"searchType":"eq","values":["' + this.id + '"],"field":"groupId"}]'

    },
    initialize: function(opt) {
        this.id = opt.id;
    }
});
window.userCollection = Backbone.Collection.extend({

    model: User,
    dataType: "json",
    url: loginURL + '/authenticate'

});