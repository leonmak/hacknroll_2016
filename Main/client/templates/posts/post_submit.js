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

AutoForm.hooks({
  insertPostsForm: {
    before: {
      insert: function(doc, template) {
        //modify the document here
        console.log(doc);
        doc.author = Meteor.user().username;
        doc.userId = Meteor.userId();
        return doc;
      }
    },
    after:{
      insert: function(doc, template){
        // console.log(this);
        Router.go('postPage', {_id: this.docId});
      }
    }
  }
})
