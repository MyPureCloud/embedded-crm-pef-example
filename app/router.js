import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('contacts', function() {
    this.route('contact', { path: '/:contact_id' });
  });
  this.route('about');
  this.route('config');
  this.route('accounts');
  this.route('callLog');
  this.route('search');

  this.route('transcript', function() {
    this.route('id', { path: '/:interaction_id' });
  });
});

export default Router;
