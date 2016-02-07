Template.header.rendered = function () {
  $(".button-collapse").sideNav();
};

Template.header.helpers({
  getImageUser: function () {
    if(Meteor.user().profile.picture){
      return Meteor.user().profile.picture;
    } else {
      var res =  Meteor.user().profile.gravUrl;
      return res;
    }
  },
  name: function(){
    return Meteor.user().username || Meteor.user().profile.name;
  }
});
