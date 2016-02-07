Template.postItem.helpers({
  domain: function(){
    var a = document.createElement('a'); a.href = this.url;
    return a.hostname;
  },
  userId:function(){
    return  this.userId;
  },
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
    return Images.find({_id:this.photoURL});;
  },
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }
});

Template.postItem.events({
  'click .deletePost': function(e) {
    e.preventDefault();
    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId); Router.go('postList');
    }
  },
  'click .chat':function(){
      Session.set('currentId',this._id);
      var postId = this._id;
      console.log("postId: ", this._id);

      var userId = this.userId;
      console.log("userId: ", this.userId);


      var res=Chats.findOne({chatIds:{$all:[postId, Meteor.userId(), userId]}});
      if(res)
      {
          //already room exists
          Session.set("roomid",res._id);
          Router.go("chats");
      }
      else{
          //no room exists
          var newRoom= Chats.insert({chatIds:[postId, Meteor.userId(), userId],messages:[], updatedAt:Date.now() });
          Session.set('roomid',newRoom);
          Router.go("chats");
      }
  }

});
