var App = Ember.Application.create();

//App.user = Ember.Object.create({
  //name: 'World!'
//});

// Router
App.Router.map(function() {
  this.resource('search');
});

//App.SearchRoute = Ember.Route.extend();

App.SearchView = Ember.TextField.extend({
  valueBinding: 'App.SearchController.model',
  insertNewline: function() {
    var value = this.get('value');
    //if (value) {
      //App.productsController.search(value);
    //}
  }
});

//App.ApplicationRoute = Ember.Route.extend({
  //setupController: function(controller, user) {
    //controller.set('content', App.user);
  //}
//});

//App.SearchRoute = Ember.Route.extend({
  //setupController: function(controller, user) {
    //controller.set('content', App.user);
  //}
//});



//App.SearchController = Ember.ObjectController.extend();

//App.SearchView = Ember.TextField.extend({
  //valueBinding: 'App.SearchController.content.value',
  //insertNewline: function() {
    //alert('Submitted: ' + App.controllerFor('search').get('value'));
  //}
//});

//App.SearchValue = Em.Object.create({
  //value: ''
//});

App.initialize();
