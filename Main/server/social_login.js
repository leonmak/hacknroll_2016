Meteor.startup(function() {
  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
      appId: Meteor.settings.private.fbappId,
      secret: Meteor.settings.private.fbsecret
    }
  },
  { upsert: true }
);

ServiceConfiguration.configurations.update(
  { service: "twitter" },
  { $set: {
    consumerKey: Meteor.settings.private.twconsumerKey,
    secret: Meteor.settings.private.twsecret
  }
},
{ upsert: true }
);

ServiceConfiguration.configurations.update(
  { service: "google" },
  { $set: {
    clientId: Meteor.settings.private.ggclientId,
    secret: Meteor.settings.private.ggsecret,
    client_email: Meteor.settings.private.ggclient_email
  }
},
{ upsert: true }
);

});

Accounts.onCreateUser(function(options, user) {
  console.log(options);
console.log(user);
  if (options.profile) {
    if (user.services.facebook){
      options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    }
    if (user.services.twitter){
      options.profile.picture = user.services.twitter.profile_image_url;
    }
    if (user.services.google){
      options.profile.picture = user.services.google.picture;
    }
    user.profile = options.profile;
  }

  return user;
});
