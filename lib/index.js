'use strict';

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose `Ambassador` integration.
 */

var Ambassador = module.exports = integration('Ambassador')
  .global('mbsy')
  .option('uid', '')
  .tag('<script src="https://cdn.getambassador.com/us.js">');

/**
 * Initialize.
 *
 * @api public
 */

Ambassador.prototype.initialize = function() {
  /* eslint-disable */
  (function (m,b,s,y) { m[b] = m[b] || {}; m[b].uid = s; m[b].methods = ['identify', 'track']; m[b].queue = []; m[b].factory = function(t) { return function() { var l = Array.prototype.slice.call(arguments); l.unshift(t); m[b].queue.push(l); return m[b].queue; };}; for (var t = 0; t < m[b].methods.length; t++) { y = m[b].methods[t]; m[b][y] = m[b].factory(y); }}.bind(this))(window, 'mbsy', this.options.uid);
  /* eslint-enable */

  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

Ambassador.prototype.loaded = function() {
  return !!window.mbsy;
};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} identify
 */

Ambassador.prototype.identify = function(identify) {
  var id = identify.userId();
  var email = identify.email();
  var traits = identify.traits();
  delete traits.id;
  var opts = identify.options(this.name);
  var args = [];

  if (!(id || email)) return this.debug('user id or email is required');

  if (id) args.push(id);
  if (Object.keys(traits).length > 0) args.push(traits);
  if (Object.keys(opts).length > 0) args.push(opts);

  window.mbsy.identify.apply(this, args);
};

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */

Ambassador.prototype.track = function(track) {
  var props = track.properties();
  var opts = track.options(this.name);
  var evt = track.event();

  if (!opts.conversion) return;

  window.mbsy.track(evt, props, opts);
};
