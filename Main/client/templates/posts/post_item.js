Template.postItem.helpers({
  domain: function(){
    var a = document.createElement('a'); a.href = this.url;
    return a.hostname;
  }
})

Template.postItem.helpers({
  formattedDate: function(){
    return moment(this.createdAt).format("DD MMM");
  },
  formattedDestroyDate: function(){
    return moment(this.destroyDate).format("DD MMM");
  }
});
