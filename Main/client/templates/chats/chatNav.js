Template.chatNav.helpers({
  getPostTitle: function(){
   return Posts.findOne(this.chatIds[0]).title;
  },
  getPostDes: function(){
    return Posts.findOne(this.chatIds[0]).description;
  },
  activeChat: function(){
    return Session.get("roomid")===this._id;
  },
  getOtherParty: function(){
    var twoParty = [this.chatIds[1], this.chatIds[2]];
    // console.log(twoParty);
    var otherPartyId = twoParty[0]==Meteor.userId() ? twoParty[0] : twoParty[1];
    var otherParty = Meteor.users.findOne(otherPartyId);
    // console.log(otherParty);
    if(otherParty.profile.name){
      return otherParty.profile.name;
    } else {
      return otherParty.username;
    }
  }
})

Template.chatNav.events= {
  'click .chatNav':function(){
    var curChatNav = this._id;
    Session.set("roomid", curChatNav);
  }
}

Template.registerHelper('trim30', function(passedString) {
    var fooText = passedString.substring(0,30); //same as truncate.
    return new Spacebars.SafeString(fooText)
});
