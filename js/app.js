var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('stations', function() {
    this.resource('index');
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('stations');
  }
});

App.StationsRoute = Ember.Route.extend({
  model: function() {
    return App.Station.find();
    //return Em.A(['Carl','Stacey']);
    //return Em.A([]);
  }
});

//App.ApplicationRoute = Ember.Route.extend({});

//App.searchController = Ember.Object.create({
  //searchText: '',
  //search: function(){
    //console.log('search for %@'.fmt( this.get('searchText') ));
  //}
//});

App.SearchView = Ember.TextField.extend({
  valueBinding: 'App.SearchController.model',
  //change: function(evt) {
    //var value = this.get('value');
    //console.log(value);
    ////this.set('formBlurred', true);
  //}
  insertNewline: function() {
    App.SearchController.setCurrent
    var value = this.get('value');
    console.log(value);
    //debugger;
    //if (value) {
      //App.productsController.search(value);
    //}
  }
});

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.Station = DS.Model.extend({
  name: DS.attr('string')
});

App.Station.FIXTURES = [
  {
    'id': 1,
    'name': 'Carl Craig'
  },

  {
    'id': 2,
    'name': 'Stacey Pullen'
  }
];
