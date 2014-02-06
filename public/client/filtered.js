Shortly.Filtered = Backbone.Collection.extend({

  // model: Shortly.Link,
  // url: '/links/filtered'

  initialize: function(models, options) {
    this.tilte = options.title;
  },

  url: function() {
    return '/links/' + this.tilte;
  },

  model: Shortly.Link

});