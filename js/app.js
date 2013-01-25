var App = Ember.Application.create();

App.user = Ember.Object.create({
  name: 'World!'
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, user) {
    controller.set('content', App.user);
  }
});

App.initialize();
