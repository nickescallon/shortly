window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
        <ul> \
          <li><a href="#" class="index">All Links</a></li> \
          <li><a href="#" class="create">Shorten</a></li> \
        </ul> \
        <form> \
          <input class="search" placeholder="Seach Here..."></input> \
        </form> \
      </div> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView",
    "submit": "renderFilteredView"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.renderIndexView(); // default view
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    e && e.preventDefault();
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView( {collection: links} );
    this.$el.find('#container').html( linksView.render().el );
    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  /*-------Fade In/Out Search Bar---------*/          
    if (className === 'index'){
      this.$el.find('.search').fadeIn();
    } else {
      this.$el.find('.search').fadeOut();
    }  
  },

  renderFilteredView: function(e){
    e && e.preventDefault();
    var form = this.$el.find('.search');
    var text = form.val();
    var filtered = new Shortly.Filtered([], {title: text});
    var linksView = new Shortly.LinksView( {collection: filtered} );
    this.$el.find('#container').html( linksView.render().el );
    form.val('');
  }

});