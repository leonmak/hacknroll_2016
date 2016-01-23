// AutoForm.addHooks(["insertPostsForm"], {
//   before: {
//     // Replace `formType` with the form `type` attribute to which this hook applies
//     insert: function(doc) {
//       // Potentially alter the doc
//       doc.author = Meteor.userId();
//       return doc;
//       // Then return it or pass it to this.result()
//       //return doc; (synchronous)
//       //return false; (synchronous, cancel)
//       //this.result(doc); (asynchronous)
//       //this.result(false); (asynchronous, cancel)
//     }
//   }
//
// });

var job = {
  postId: "",
  location: ""
};

AutoForm.hooks({
  insertPostsForm: {
    before: {
      insert: function(doc, template) {
        job.location = doc.location;

        doc.author = Meteor.user().username;
        doc.userId = Meteor.userId();
        doc.photoURL = Session.get("photoURL");
        return doc;
      }
    },
    after:{
      insert: function(doc, template){
        //modify the document here

        job.postId = this.docId;
        console.log(job);
        Meteor.call('addJob', job);

        Session.set("photos", undefined);
        Session.set("photoURL", undefined);
        Router.go('postPage', {_id: this.docId});
      }
    }
  }
})
Template.postSubmit.helpers({
photoURL: function(){
  var img = Session.get("photoURL") || Session.get("photos");
  if(img) {return Images.find({_id:img});}
},
box: function(){
  $(document).ready(function(){
    $('.materialboxed').materialbox();
  });

}
});


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
    $(document).ready(function(){
      $('.materialboxed').materialbox();
    });

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
