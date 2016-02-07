Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) {
      if (Meteor.user())
      {
        var name = (Meteor.user().username) ? Meteor.user().username : Meteor.user().profile.name;
        var message = document.getElementById('message');
        console.log(message.value);

        if (message.value !== '') {
          var de=Chats.update({"_id":Session.get("roomid")},
          {$push:{messages:{
            name: name,
            text: message.value,
            createdAt: Date.now()
          }}});
          de = Chats.update({"_id":Session.get("roomid")},
          { $set:
            {updatedAt: Date.now() }
          }
        );
          console.log(de);

          document.getElementById('message').value = '';
          message.value = '';
        }
      }
      else
      {
        alert("login to chat");
      }

    }
  },
  'click .sendMsg' : function(e){
    if (Meteor.user())
    {
      var name = (Meteor.user().username) ? Meteor.user().username : Meteor.user().profile.name;
      var message = document.getElementById('message');
      console.log(message.value);

      if (message.value !== '') {
        var de=Chats.update({
          "_id":Session.get("roomid")},
          {$push:{messages:{
            name: name,
            text: message.value,
            createdAt: Date.now()
          }}
        });
        console.log(de);

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
    else
    {
      alert("login to chat");
    }

  }


}

Template.messages.helpers({
  msgs:function(){
    var roomid = Session.get('roomid');
    if(roomid){
      var result=Chats.findOne({_id:roomid});
      return result.messages.reverse();
    }
  },
  date: function() {
    return moment(this.createdAt).format("ddd hA").toUpperCase();
  }

});
