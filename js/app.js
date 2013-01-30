var App = Ember.Application.create();

// Routes

App.Router.map(function() {
  this.resource('stations', function() {
    this.resource('stations.tracks', { path: ':station_id/tracks' }, function() {
      this.route('playing', { path: ':tracks_id' } );
    })
  });
  this.route('profile');
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('stations');
  }
});

App.StationsRoute = Ember.Route.extend({
  model: function() {
    return App.Station.find();
  }
});

App.StationsTracksRoute = Ember.Route.extend({
  model: function(param) {
    return App.Station.find(param['station_id']);
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  }
});

App.StationsTracksPlayingRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('content', model);
    setTimeout(function(){
      widget = SC.Widget( document.getElementById('sc-widget') );
      widget.play();
    },2000); // cheating for programmatic click :-)
  }
});

// Controllers

App.StationsController = Ember.ArrayController.extend({
  addAndSearch: function(artist){
    App.addArtist(artist);
  }
});

App.SearchController = Ember.Controller.extend({
  needs: 'stations',
  search: function(query) {
    this.get('controllers.stations').addAndSearch(query);
  }
});

// Views

App.StationsTracksPlayingView = Ember.View.extend({
  scBaseUrl: 'https://w.soundcloud.com/player/',
  scTrackSourceUrlBinding: 'controller.model.url',
  scIframeSourceUrl: function() {
    return this.scBaseUrl + '?url=' + this.scTrackSourceUrl;
  }.property()
});

App.SearchView = Ember.TextField.extend({
  valueBinding: 'query',
  didInsertElement: function() {
    this.$().focus();
  },
  clearTextBox: function(){
    this.$().val('');
  },
  change: function(e) {
    this.controller.search( this.query );
    this.clearTextBox();
  }
});

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.Station = DS.Model.extend({
  name: DS.attr('string'),
  tracks: DS.hasMany('App.Tracks')
});

App.Tracks = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string')
});

//
//
//
//
// App ends here.... 
//
//
//
//
//

// Ember Data

App.Station.FIXTURES = [
  {
    id: 1,
    name: 'Carl Craig',
    tracks: [100,101,102]
  },
  {
    id: 2,
    name: 'Stacey Pullen',
    tracks: [200,201,202]
  }
];

App.Tracks.FIXTURES = [
  {
    id: 100,
    title: '20 Years Of Planet E Essential Mix',
    url: 'https://api.soundcloud.com/r_co/carl-craig-20-years-of-planet'
  },
  {
    id: 101,
    title: 'Live @ Mixmag Live',
    url: 'https://api.soundcloud.com/planetedetroit/carl-craig-live-mixmag-live-19'
  },
  {
    id: 102,
    title: 'FACT mix 345',
    url: 'https://api.soundcloud.com/selftitledmag/carl-craig-fact-mix-345'
  },
  {
    id: 200,
    title: 'Stacey Pullen Live',
    url: 'https://api.soundcloud.com/staceypullen/stacey-pullen-live'
  },
  {
    id: 201,
    title: 'Get Up (Original)',
    url: 'https://api.soundcloud.com/staceypullen/stacey-pullen-get-up-original'
  },
  {
    id: 202,
    title: 'Circus Act',
    url: 'https://api.soundcloud.com/staceypullen/sets/bfr007-circus-act-ep'
  }
];

// fakes the search and return with tracks
App.addArtist = function(artist) {
  var station = App.Station.createRecord({ id: 3, name: 'Justin Martin' });
  var track = App.Tracks.createRecord({
    id: 300,
    title: 'Jungle Mix',
    url: 'https://api.soundcloud.com/justin-martin-music/justin-martin-jungle-mix'
  });
  station.get('tracks').pushObject(track); // there has to be a better way...
}
