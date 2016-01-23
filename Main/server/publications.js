Meteor.publish("posts", function(){
  return Posts.find()
});

// Meteor.publish("posts", function(authorname){
//   return Posts.find({flagged: false, author: authorname});
// });
