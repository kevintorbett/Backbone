var AppRouter = Backbone.Router.extend({
    events: {
        'submit': 'submit',
        'click': 'submit',
        'click': 'onSelectedChanged'
    },

    routes: {
        //     ""                  : "login",
        "": "list",
        "users/page/:page": "list",
        "users/add": "addUser",
        "users/:id": "userDetails",
        "logout": "logout1",
        "users/apps/:id": "listUser",
        "users/apps2/:id": "listUser2",
        "users/copy/:id": "listCopy",
        "users/groups/:id": "listGroup",
        "users/groups2/:id": "listGroup2",
        "users/roles/:id": "listRoles",
        "users/users/:id": "listUsers",
        "users/groups/add/:lid": "updateGroup",
        "about": "about",
        "login": "login"
    },

    initialize: function() {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);

        userid = 0;
    },
    onSelectedChanged: function(model) {
        alert('sel')
        this.each(function(model) {
            if (model.get('isSelected') === true && !model.hasChanged('isSelected')) {
                model.set({
                    isSelected: false
                });
            }
        });
    },
    list: function(page) {
        $('.alert-error').text(' ').hide()
        var page = (page != 'null') ? page : 1;

        var p = page ? parseInt(page, 10) : 1;
        var userList = new UserCollection();
        if (isNaN(p)) {
            p = 1;
        }
        userList.fetch({
            success: function() {
                $("#content").html(new UsersListView({
                    model: userList,
                    page: p
                }).el);
                $("tr:even").css("background-color", "#dddddd");
            }
        });

        this.headerView.selectMenuItem('home-menu');

    },
    listUser: function(input) {
        var p = 1;
        var input1 = input.split("|");
        var id = input1[0],
            username = input1[1];
   //     console.log(id + ' ' + username)

        userid = id;
        var appList = new AppCollection({
            userId: id
        });

        appList.fetch({ data: { userId: id},
            success: function() {
                $("#content").html(new AppListView({
                    model: appList,
                    userId: userid
                }).el);
                $("#usern").html(username);
                $("tr:even").css("background-color", "#dddddd");
                
            }
        });

this.headerView.selectMenuItem('list-menu');
    },
    listUser2: function() {

        var appList = new AppCollection2();

        appList.fetch({
            success: function() {
                $("#rows1").append(new AppList2View({
                    model: appList
                }).el);
                 $("#notauth").css("background-color", "white ");
            }
        });

    },
    userDetails: function(id) {
        var user = new User({
            id: id
        });
        user.fetch({
            success: function() {
                $("#content").html(new UserView({
                    model: user
                }).el);
            }
        });
        this.headerView.selectMenuItem();
    },

    addUser: function() {
        var user = new User();
        $('#content').html(new UserView({
            model: user
        }).el);
    //    this.headerView.selectMenuItem('add-menu');
    },
    
    listGroup: function(id) {
        appid = id;
        var groupList = new GroupCollection({
            id: id,
            userid: userid
        });
        $('.rows2').html('');
        groupList.fetch({
            success: function({
                id: id,
                userid: userid
            }) {
                $("#rows2").append(new GroupListView({
                    model: groupList,
                    id: id,
                    userid: userid
                }).el);
                $("tr:even").css("background-color", "#dddddd");
            }
        });

    },
    listGroup2: function(id) {
        var groupList2 = new Group2Collection(({
            id: appid,
            userid: userid
        }));
        groupList2.fetch({
            success: function() {
                $("#rows2").append(new GroupList2View({
                    model: groupList2,
                    id: id,
                    userid: userid
                }).el);
                $("tr:even").css("background-color", "#dddddd");
                 $("#notauth").css("background-color", "white ");
            }
        });
        this.headerView.selectMenuItem('home-menu');
    },
    listCopy: function(id) { 
        var groupList = new GroupCopyCollection({
            id: id
        });
        groupList.fetch({
            success: function({
                id: id
            }) {
                $("#content").html(new GroupCopyView({
                    model: groupList,
                    id: id
                }).el);
                var id1 = id;
                var userList = new Users1Collection({
                    id: id
                });
                userList.fetch({
                    success: function({
                        id: id
                    }) {
                        var xxx = new UserList2View({
                            model: userList,
                            id: id1
                        });

                        $("tr:even").css("background-color", "#dddddd");
                         $("#notauth").css("background-color", "white ");
                    }
                });
            }
        });
        this.headerView.selectMenuItem('home-menu');
    },
    listRoles: function(id) {

        var roleList = new RoleCollection({
            id: id
        });
        roleList.fetch({
            success: function({
                id: id
            }) {
                $("#rows3").append(new RoleListView({
                    model: roleList,
                    id: id
                }).el);
                $("tr:even").css("background-color", "#dddddd");
            }
        });

        this.headerView.selectMenuItem('home-menu');
    },
    listUsers: function(id) {

        var id1 = $(this.currentTarget);
       // console.log(id1)
        var userList = new UsersCollection({
            id: id
        });
        userList.fetch({
            success: function({
                id: id
            }) {
                $("#rows3").append(new UserListView({
                    model: userList,
                    id: id
                }).el);
                $("tr:even").css("background-color", "#dddddd");
            }
        });

        this.headerView.selectMenuItem('home-menu');
    },
    about: function() {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },
    login: function() {
        $('#content').html(new LoginView().render().el);
    },
    logout1: function() {
        localStorage.setItem('logged', '0');
        $('#content').html(new LoginView().render().el);
    },
    submit: function() {
        var status = this.$el.find('input[name="grp1"]:checked').val();
        alert('p')
        window.location.replace('#users/groups/' + status);
        return false;
    }


});

utils.loadTemplate(['HeaderView', 'UserView', 'UsersListItemView', 'UsersListItem2View', 'UserListItemView', 'UserListItem2View', 'AppListItemView', 'AppListItem2View', 'GroupCopyItemView', 'RoleListItemView', 'GroupListItemView', 'GroupListItem2View', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();

});