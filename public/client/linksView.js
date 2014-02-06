Shortly.LinksView = Backbone.View.extend({

  className: 'links',

  events: {
    "submit" : "filter"
  },

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    this.$el.append(' \
      <form> \
        <input class="search" placeholder="Seach Here..."></input> \
      </form>'
    );
    return this;
  },

  addAll: function(){
    this.render();
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );
    this.$el.append(view.render().el);
  },

  filter: function(e){
    e.preventDefault();
    var form = this.$el.find('.search');
    var text = form.val();
    this.collection.fetch({
      url: '/links/' + text,
      success: function(collection){}
    });
  }

});