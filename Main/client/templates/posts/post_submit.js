
var job = {
  postId: "",
  location: ""
};

AutoForm.hooks({
  insertPostsForm: {
    before: {
      insert: function(doc, template) {
        if(doc.location) {job.location = doc.location;}
        doc.author = Meteor.user().username;
        doc.userId = Meteor.userId();
        doc.photoURL = Session.get("photoURL");
        doc.commentsCount= 0;
        return doc;
      }
    },
    after:{
      insert: function(doc, template){
        // add map marker if location field was filled
        job.postId = this.docId;
        Session.set("photos", undefined);
        Session.set("photoURL", undefined);
console.log(job);
        if(job.location) {
          Router.go('postPage', {_id: this.docId});
          Meteor.call('addJob', job);
        }
      }
    }
  }
})

// display photos

Template.postSubmit.helpers({
  photoURL: function(){
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });

    var img = Session.get("photoURL") || Session.get("photos");
    if(img) {return Images.find({_id:img});}
}

});

Template.postSubmit.onRendered = function(){
  $('.materialboxed').materialbox();
}

// Photo

Template.postSubmit.events({
  'click .photo': function () {

    var cameraOptions = {
      width: 400,
      height: 400,
      quality:100,
      androidOptions: androidOptions,
      iosOptions: iosOptions,
      buttonTexts: buttonTexts
    };

    var buttonTexts = {
      cancel: "Back",
      takeImage: "Use Camera",
      imageLibrary: "Take from Library"
    }
    var androidOptions= {
      width: 300,
      height: 300,
      quality: 50,
      buttonTexts: buttonTexts
    }

    var iosOptions= {
      width: 300,
      height: 300,
      quality: 50,
      buttonTexts: buttonTexts
    }

    MeteorCameraUI.getPicture(cameraOptions, function (error, data) {
      Session.set("photos", data);


      Images.insert(data, function(err, fileObj){
        if(err){
        } else {
          Session.set("photoURL", fileObj._id);
        }
      });

    });


  }
});

Template.postSubmit.events({
  'change .myFileInput': function(event, template) {

    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
        } else {
          Session.set("photoURL", fileObj._id);
        };
      });
    });
  }
});
