Template.header.rendered = function () {
  $(".button-collapse").sideNav();
};

Template.header.helpers({
  getImageUser: function () {
    var curUser = Meteor.user();
    if(curUser.profile.picture){
      return curUser.profile.picture;
    } else {
      var res =  curUser.profile.gravUrl;
      return res;
    }
  },
  getName: function(){
    var curUser = Meteor.user();
    return curUser.username || curUser.profile.name;
  }
});
