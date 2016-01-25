var SearchData = new ReactiveVar(null);
var Map = null;
var Markers = [];

var createMap = function() {
  var lat = 1.294635;
  var lng = 103.7734412;
  var latlng = new google.maps.LatLng(lat, lng);
  var options = {
    zoom: 13,
    streetViewControl: false,
    scaleControl: false,
    draggable: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latlng
  };

  Map = new google.maps.Map(document.getElementById("searchMapContainer"),
                            options);

};

var addMarkersToMap = function(jobs) {
  if (!Map) {
    console.log("Map not initialized!");
    return;
  }

  // Remove existing markers
  Markers.forEach(function(marker) {
    marker.setMap(null);
  });
  Markers = [];

  var center = true;
  var bounds = new google.maps.LatLngBounds(); var idx = 0;

  jobs.forEach(function(job) {
    var lat = job.location.lat;
    var lng = job.location.lng;

    if (center) {
      Map.setCenter(new google.maps.LatLng(lat, lng));
      center = false;
    }

    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: Map
    });

    var post = Posts.find({_id:job.postId}).fetch()["0"];
    console.log(post);
    var imageurl = post.photoURL;
    var img = '<img width="100%" src=/cfs/files/images/' + imageurl + '/images?store=images>';
    var path = post._id;

    marker.addListener("click", function() {
        var contentString = '<div class="valign-wrapper">'+
            '<a href=/posts/'+path+'><h5 id="firstHeading" class="valign">'+ post.title +'</h5>' +
            img+'</a>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
          });

      infowindow.open(Map, marker);
      console.log("clicked on ", job);
    });
    Markers.push(marker);
    bounds.extend(Markers[idx].getPosition()); idx++;
  });
};


Template.explore.onRendered(function() {
  GoogleMaps.load();

  this.autorun(function() {
    var searchData = SearchData.get();
    if (searchData) {
      Meteor.subscribe("jobSearch", searchData);
    }
  });

  this.autorun(function() {
    if (GoogleMaps.loaded()) {
      createMap();
    }
  });

  this.autorun(function() {
    var jobs = Jobs.find({});
    if (jobs.count() > 0) {
      addMarkersToMap(jobs.fetch());
    }
  });
});

Template.explore.helpers({
  jobSchema: function() {
    return Schemas.Job;
  },
  searchSchema: function() {
    return Schemas.Search;
  },
  jobs: function() {
    return Jobs.find({});
  }
});

AutoForm.addHooks("searchJob", {
  onSubmit: function(insertDoc, updateDoc, currentDoc) {
    check(insertDoc, Schemas.Search);
    SearchData.set(insertDoc);
    this.done();
    return false;
  },

  onSuccess: function(formType, result) {
  },

  onError: function(formType, error) {
    console.log("error", formType, error);
  }
});

Template.registerHelper("googleMapsReady", function() {
  return GoogleMaps.loaded();
});
