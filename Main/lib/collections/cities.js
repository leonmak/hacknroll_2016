Schemas = {};

Schemas.Address = new SimpleSchema({
  fullAddress: {
    type: String
  },
  lat: {
    type: Number,
    decimal: true
  },
  lng: {
    type: Number,
    decimal: true
  },
  geometry: {
    type: Object,
    blackbox: true
  },
  placeId: {
    type: String
  },
  street: {
    type: String,
    max: 100
  },
  // city: {
  //   type: String,
  //   max: 50
  // },
  country: {
    type: String
  }
});


Schemas.Search = new SimpleSchema({
  location: {
    type: Schemas.Address,
    autoform: {
      label: false,
      placeholder: "Address"
    }
  },
  radius: {
    type: Number,
    autoform: {
      label: false,
      placeholder: "Radius (km)"
    }
  }
});

Schemas.Job = new SimpleSchema({
  postId: {
    type: String
  },
  location: {
    type: Schemas.Address,
    autoform: {
      label: false,
      placeholder: "Address"
    }
  }
});

Jobs = new Mongo.Collection("jobs");

Jobs.attachSchema(Schemas.Job);
