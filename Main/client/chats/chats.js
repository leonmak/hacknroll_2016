Template.chats.helpers({
 chatList: function(){ return Chats.find({}, {sort: {submitted: -1}}); }
})
