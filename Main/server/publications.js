Meteor.publish("posts", function(){
  return Posts.find();
});

// Meteor.publish("posts", function(authorname){
//   return Posts.find({flagged: false, author: authorname});
// });

Meteor.publish("comments", function(argument){
  return Comments.find();
});

Meteor.publish("images", function(){ return Images.find(); });
