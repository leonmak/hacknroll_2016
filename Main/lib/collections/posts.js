Posts = new Mongo.Collection("posts");
Posts.allow({
  insert: function(userId, doc){ return !! userId; },
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});
