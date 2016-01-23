Router.configure({
  layoutTemplate:"layout",
  notFoundTemplate:"notFoundTemplate",
  yieldRegions:{
    "header": {to: "header"},
    "footer": {to: "footer"}
  },
  loadingTemplate:"loadingTemplate", // shows if still waiting on subscription
  waitOn: function(){
    return [Meteor.subscribe('posts'), Meteor.subscribe('comments'),Meteor.subscribe('images')];
  }
});

Router.route("/", {
  name:"postList"
});

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function(){
    console.log(Posts.findOne(this.params._id));
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
});

var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
}
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});


// update
Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() { return Posts.findOne(this.params._id); }
});
