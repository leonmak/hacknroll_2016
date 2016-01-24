if (Meteor.isClient) {
  AutoForm.setDefaultTemplate('materialize');
}
var schema = new SimpleSchema({
  title: {
    label: 'Item:',
    type: String
  },
  description: {
    label: 'Description:',
    type: String
  },
  author: {
    label: 'author',
    type: String
  },
  userId:{
    type: String
  },
  destroyDate: {
    label: 'Expires on:',
    type: Date,
    autoform: {
      type: 'pickadate'
    }
  },
  pricePerItem: {
    label: 'Price per item:',
    type: Number,
    min: 0,
    max: 10000
  },
  url:{
    label: 'URL',
    type: String,
    optional: true
  },
  location:{
    label: 'Where it at?',
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  photoURL:{
    type: String,
    optional: true
  },
  location: {
    type: Schemas.Address,
    autoform: {
      label: false,
      placeholder: "Address"
    },
    optional: true
  },
  commentsCount: {
    type: Number
  }

//   location:{
// label:"",
//     type: String,
//     autoform:{
//       type: 'map',
//       afFieldInput:{
//         geolocation: true,
//         searchBox: true,
//         autolocate: true,
//         zoom: 13,
//         defaultLat: 1,
//       	defaultLng: 1
//       }
//     },
//     optional: true,
//   }
});

Posts.attachSchema(schema);
