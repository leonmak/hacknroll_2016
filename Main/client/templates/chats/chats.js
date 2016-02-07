Template.chats.helpers({
 chatsList: function(){
   // find all chats that contain the current user's id in it's chatIds array
   return Chats.find({chatIds:{$in:[Meteor.userId()]}}, {sort: {updatedAt: -1}});
 },
 roomid: function(){
   return Session.get("roomid")
 }
})
