Template.searchBox.helpers({
  postsIndex: function(){
    return PostsIndex;
  },
  posts: function () {
    return Posts.find({});
  },
  resultsCount: function () {
    return PostsIndex.getComponentDict().get('count');
  },
  showMore: function () {
    return false;
  },

});
//
// Template.searchBox.events({
// })
