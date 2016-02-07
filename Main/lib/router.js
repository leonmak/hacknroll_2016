Router.configure({
  layoutTemplate:"layout",
  notFoundTemplate:"notFoundTemplate",
  yieldRegions:{
    "header": {to: "header"},
    "footer": {to: "footer"}
  },
  loadingTemplate:"loadingTemplate", // Spinner
  waitOn: function(){
    return [Meteor.subscribe('posts'), Meteor.subscribe('chats'), Meteor.subscribe('comments'),Meteor.subscribe('images')];
  }
});

Router.route("/", {
  name:"postList"
});

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function(){
    return Posts.findOne(this.params._id);
  }
});

AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  }
]);

// Account Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

// insert routes
Router.route('/submit', {
  name: 'postSubmit',
  // for google places autoform
  onBeforeAction: function() {
    if (!GoogleMaps.loaded()) {
      GoogleMaps.load({
        key: Meteor.settings.public.google_maps_key,
        libraries: "geometry,places"
      });
    }
    this.next();
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
}
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(requireLogin, {only: 'chats'});
Router.onBeforeAction(requireLogin, {only: 'account'});


// update
Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() { return Posts.findOne(this.params._id); }
});

// maps
Router.route("/explore",{
  name: "explore",
  onBeforeAction: function() {
    if (!GoogleMaps.loaded()) {
      GoogleMaps.load({
        key: Meteor.settings.public.google_maps_key,
        libraries: "geometry,places"
      });
    }
    this.next();
  }
})

// account page
Router.route("/account", {
  name: 'account'
})

// chats page
Router.route("/messages", {
  name: 'chats',
  waitOn: function(){
    Meteor.subscribe('allUserData');
  }
})

// search page
Router.route("/search", {
  name: 'searchBox'
})


// categories
Router.route("/fnb", {
  name: 'fnb'
})
Router.route("/forHim", {
  name: 'forHim'
})
Router.route("/forHer", {
  name: 'forHer'
})
Router.route("/tech", {
  name: 'tech'
})
