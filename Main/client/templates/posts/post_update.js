Template.postEdit.events({
  'click .deletePost': function(e) {
    e.preventDefault();
    if (confirm("Delete this post?")) {
      var currentPostId = this._id; Posts.remove(currentPostId);
      Router.go('postList');
    }
  }
});

Template.postEdit.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  }
});

AutoForm.hooks({
  updatePostForm: {
    after:{
      update: function(doc, template){
        Router.go('postPage', {_id: this.docId});
      }
    }
  }
})
