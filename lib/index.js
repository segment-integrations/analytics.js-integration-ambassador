
/**
 * Module dependencies.
 */

var Identify = require('facade').Identify;
var alias = require('alias');
var convertDates = require('convert-dates');
var integration = require('analytics.js-integration');

/**
 * Expose `Ambassador` integration.
 */

var Ambassador = module.exports = integration('Ambassador')
  .global('_mbsy')
  .option('uid', '');

/**
 * Initialize.
 *
 * @api public
 */

Ambassador.prototype.initialize = function() {

};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

Ambassador.prototype.loaded = function() {

};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} identify
 */

Ambassador.prototype.identify = function(identify) {

};

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */

Ambassador.prototype.track = function(track) {

};
