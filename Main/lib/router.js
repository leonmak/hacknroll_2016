Router.configure({
  layoutTemplate:"layout",
  // notFoundTemplate:"notFoundTemplate",
  yieldRegions:{
    "header": {to: "header"},
    "footer": {to: "footer"}
  },
  loadingTemplate:"loadingTemplate", // shows if still waiting on subscription
  waitOn: function(){ return Meteor.subscribe('posts'); }
});

Router.route("/", {
  name:"postList"
  // template:"templateName",
  // waitOn:function(){
  //   subscriptions
  // },
  // data:function(){
  //    dataFunction
  // },
  // onBeforeAction:function(){
  //
  // },
  // onAfterAction:function(){
  //
  // },
  // onRun:function(){
  //
  // },
  // onReRun:function(){
  //
  // }
});

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function(){ return Posts.findOne(this.params._id); }
});


// Account Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

// insert routes
Router.route('/submit', {name: 'postSubmit'});
