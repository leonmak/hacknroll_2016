Template.postItem.helpers({
  domain: function(){
    var a = document.createElement('a'); a.href = this.url;
    return a.hostname;
  }
})

Template.postItem.helpers({
  formattedDate: function(){
    return moment(this.createdAt).format("DD MMM");
  },
  formattedDestroyDate: function(){
    return moment(this.destroyDate).format("DD MMM");
  },
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  image: function(){
    var a = Images.find({_id:this.photoURL});
console.log(a);
return a;
  }
});

Template.postItem.events({
  'click .deletePost': function(e) {
    e.preventDefault();
    if (confirm("Delete this post?")) {
      var currentPostId = this._id; Posts.remove(currentPostId); Router.go('postList');
    }
  }
});
