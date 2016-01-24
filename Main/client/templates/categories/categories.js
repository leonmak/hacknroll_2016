Template.fnb.helpers({
 posts: function(){ return Posts.find({cat:"Food & Drinks"}, {sort: {submitted: -1}}); }
})
Template.forHim.helpers({
 posts: function(){ return Posts.find({cat:"For Him"}, {sort: {submitted: -1}}); }
})
Template.forHer.helpers({
 posts: function(){ return Posts.find({cat: "For Her"}, {sort: {submitted: -1}}); }
})
Template.tech.helpers({
 posts: function(){ return Posts.find({cat:"Tech & Gadgets"}, {sort: {submitted: -1}}); }
})
