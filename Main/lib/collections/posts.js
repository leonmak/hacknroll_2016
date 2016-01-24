Posts = new Mongo.Collection("posts");

PostsIndex = new EasySearch.Index({
  collection: Posts,
  fields: ['title', 'description', 'author'],
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { pricePerItem: -1 };
    },
  }),
  name: 'work',
  permission: function(){ return true},
  defaultSearchOptions: {
    limit: 5
  },
});

Posts.allow({
  insert: function(userId, doc){ return !! userId; },
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});
