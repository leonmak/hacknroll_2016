var postsData = [ {
  title: 'HackNRoll',
  url: 'http://leonmak.me/',
  author: 'Me',
  description: 'Free Food at SR1!',
  pricePerItem: 10,
  destroyDate: Date.now()
}];

if(Posts.find().count() === 0){
  for(var i =0; i < postsData.length; i++){
    Posts.insert(postsData[i])
  }
};
