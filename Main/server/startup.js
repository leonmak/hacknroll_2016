Meteor.startup(function() {
  Jobs._ensureIndex({"location.geometry": "2dsphere"});
});

// Accounts.onLogin(function(user){
//   console.log(user.user._id)
// });
//
