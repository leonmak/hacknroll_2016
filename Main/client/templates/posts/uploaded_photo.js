Template.uploadedPhoto.rendered = function(){
    $('.materialboxed').materialbox();
}

Template.uploadedPhoto.helpers({
  photoURL: function(){
    var img = Session.get("photoURL") || Session.get("photos");
    if(img) {return Images.find({_id:img});}
  }

});
