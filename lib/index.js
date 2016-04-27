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
  (function (u, n, i, v, e, r, s, a, l) {
    u[r] = u[r] || {};
    u[r].uid = a;
    u[r].methods = ['ready', 'identify', 'track'];
    u[r].queue = [];
    u[r].factory = function(t) {
      return function() {
        var l = Array.prototype.slice.call(arguments);
        l.unshift(t);
        u[r].queue.push(l);

        return u[r].queue;
      };
    };
    for (var t = 0; t < u[r].methods.length; t++) {
      l = u[r].methods[t];
      u[r][l] = u[r].factory(l);
    }
  }.bind(this))(window, document, 'head', 'script', 'https://cdn.getambassador.com/us.js', 'mbsy', true, this.options.uid);
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

Ambassador.prototype.identify = function() {

};

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */

Ambassador.prototype.track = function() {

};
