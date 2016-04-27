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
  .global('_mbsy')
  .option('uid', '');

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
    a = n.createElement(v); a.src = e; a.async = s;
    n.getElementsByTagName(i)[0].appendChild(a);
  })(window, document, 'head', 'script', 'https://cdn.getambassador.com/us.js', 'mbsy', true, this.uid);
  /* eslint-enable */

  window.mbsy.ready(this.ready);
};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

Ambassador.prototype.loaded = function() {
  return !!(window._mbsy && !window.mbsy.queue);
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
