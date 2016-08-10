define(
['jquery', 'lodash', 'backbone', 'models/user-model'],

function($, _, Backbone, Part) {

	var UserCollection = Backbone.Collection.extend({
		model: User,
		url: "users/"
	});

	return UserCollection;
});