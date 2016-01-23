if (Meteor.isClient) {
  AutoForm.setDefaultTemplate('materialize');
}
var schema = new SimpleSchema({
  title: {
    // Labels are used to reffer to this field in validation
    label: 'title',
    // Specifying the allowed type
    type: String
  },
  author: {
    label: 'author',
    type: String
  },
  publishDate: {
    label: 'publish date',
    type: Date,
    // This is needed for the Materialize theme, more on this later
    autoform: {
      type: 'pickadate'
    }
  },
  rating: {
    type: Number,
    // We only want a rating from 0 to 10
    min: 0,
    max: 10
  }
});

Posts.attachSchema(schema);
