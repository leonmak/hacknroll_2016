Template.postList.helpers({
 posts: function(){ return Posts.find({}, {sort: {submitted: -1}}); }
})
// posts: function(){ return Posts.find({author: "name"}) }
