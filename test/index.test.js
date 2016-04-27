'use strict';

var Analytics = require('analytics.js-core').constructor;
var integration = require('analytics.js-integration');
var sandbox = require('clear-env');
var tester = require('analytics.js-integration-tester');
var Ambassador = require('../lib/');

describe('Ambassador', function() {
  var analytics;
  var ambassador;
  var options = {
    uid: 'f1af0eb5-9001-4fc2-872d-2a4afcb46c12'
  };

  beforeEach(function() {
    analytics = new Analytics();
    ambassador = new Ambassador(options);
    analytics.use(Ambassador);
    analytics.use(tester);
    analytics.add(ambassador);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    ambassador.reset();
    sandbox();
  });

  it('should have the right settings', function() {
    analytics.compare(Ambassador, integration('Ambassador')
      .global('mbsy')
      .option('uid', ''));
  });

  describe('before loading', function() {
    beforeEach(function() {
      analytics.stub(ambassador, 'load');
    });

    describe('#initialize', function() {
      it('should create the window.mbsy object', function() {
        analytics.assert(!window.mbsy);
        analytics.initialize();
        analytics.assert(window.mbsy);
      });

      it('should call #load', function() {
        analytics.initialize();
        analytics.called(ambassador.load);
      });
    });
  });

  describe('loading', function() {
    it('should load', function(done) {
      analytics.load(ambassador, done);
    });
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
    });
  });
});
