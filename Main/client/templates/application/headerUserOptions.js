// put dropdown in another template so can use rendered
// if same as header will run after page loaded, and so not after sign in
Template.headerUserOptions.rendered = function(){
  $('.dropdown1Hover').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
  });

}

Template.atNavButton.rendered = function(){
  var element = $("#at-nav-button");
  if(element.text()==="Sign In"){
    element.addClass("signin");
  }
}

Template.headerUserOptions.helpers({
  getImageUser: function () {
    return Meteor.user().profile.picture;
  }
});
