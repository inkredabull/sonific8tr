var App = Ember.Application.create();

App.Router.map(function() {
  this.resource('stations', function() {
    this.resource('stations.tracks', { path: ':station_id/tracks' }, function() {
      this.route('playing', { path: ':tracks_id' } );
    })
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
    //return Em.A([]);
  }
});

App.TracksRoute = Ember.Route.extend({
  model: function(params) {
    return App.Tracks.find(params.listing_id);
  }
});

App.StationsIndexView = Ember.View.extend({
  isActive: true
});

App.StationsTracksPlayingView = Ember.View.extend({
  scBaseUrl: 'https://w.soundcloud.com/player/',
  scTrackSourceUrlBinding: 'controller.model.url',
  scIframeSourceUrl: function() {
    return this.scBaseUrl + '?url=' + this.scTrackSourceUrl;
  }.property()
});

App.StationsController = Ember.ArrayController.extend({
  addAndSearch: function(artist){
    console.log(artist);
  }
});

App.SearchController = Ember.Controller.extend({
  needs: 'stations',
  //search: function() {
    //var query = this.get('query');     
    //this.get('controllers.food').search(query);
  //},
  //didInsertElement: function() {
    //this.$().focus();
  //},
  //clearTextBox: function(){
    //this.$().val(''); 
  //},
  search: function() {
    var query = this.get('query');
    this.get('controllers.stations').addAndSearch(query);
    ////this.clearTextBox();
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

App.Station.FIXTURES = [
  {
    id: 1,
    name: 'Carl Craig',
    tracks: [100]
  },
  {
    id: 2,
    name: 'Stacey Pullen',
    tracks: [200]
  }
];

App.Tracks.FIXTURES = [
  {
    id: 100,
    title: '20 Years Of Planet E Essential Mix',
    url: 'https://api.soundcloud.com/r_co/carl-craig-20-years-of-planet'
  },
  {
    id: 200,
    title: 'Stacey Pullen Live',
    url: 'https://api.soundcloud.com/staceypullen/stacey-pullen-live'
  },
];
