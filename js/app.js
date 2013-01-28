var App = Ember.Application.create();

// Router
App.Router.map(function() {
  this.resource('stations', function() {
    this.resource('index');
  });
});

//App.Store = DS.Store.create({
  //revision: 11,
  //adapter: DS.FixtureAdapter.create()
//});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('stations');
  }
});

App.StationsRoute = Ember.Route.extend({
  model: function() {
    //return App.Table.find();
    //return Em.A(['Carl','Stacey']);
    return Em.A([]);
  }
});

App.ApplicationRoute = Ember.Route.extend({
  //setupController: function() {
    //this.controllerFor('stations').set('model', Em.A(['Carl','Stacey']) );
  //}
});

//App.ApplicationRouter = Ember.Route.extend();

//App.searchController = Ember.Object.create({
  //searchText: '',
  //search: function(){
    //console.log('search for %@'.fmt( this.get('searchText') ));
  //}
//});

//App.SearchView = Ember.TextField.extend(Ember.TargetActionSupport, {
  //valueBinding: 'App.searchController.searchText',
  //insertNewline: function() {
    //this.triggerAction();
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

App.initialize();
