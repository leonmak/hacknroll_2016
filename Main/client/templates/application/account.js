Template.account.helpers({
  posts:function(){return Posts.find({userId: Meteor.userId()})}
});
