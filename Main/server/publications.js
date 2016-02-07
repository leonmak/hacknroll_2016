Meteor.publish("posts", function(){
  return Posts.find();
});

// Meteor.publish("posts", function(authorname){
//   return Posts.find({flagged: false, author: authorname});
// });

Meteor.publish("comments", function(argument){
  return Comments.find();
});

Meteor.publish("chats", function(argument){
  return Chats.find();
});

// Meteor.publish('userData', function () { return Meteor.users.find({}, {fields: {profile: 1}}); });
Meteor.publish("allUserData", function(argument){
  return Meteor.users.find({}, {fields: {profile: 1}});

});

Meteor.publish("images", function(){ return Images.find(); });

Meteor.publish("jobSearch", function(searchData) {
  if (!searchData) {
    return [];
  }

  var radius = searchData.radius;
  var centerLat = searchData.location.lat;
  var centerLon = searchData.location.lng;

  var selector = {
    "location.geometry": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [centerLon, centerLat]
        },
        $maxDistance: radius * 1000,
        $minDistance: 0
      }
    }
  };

  return Jobs.find(selector);
});
