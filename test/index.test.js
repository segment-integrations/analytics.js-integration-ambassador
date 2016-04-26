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
    uid: '<PLACE_TEST_UID_HERE>'
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
      .global('_mbsy')
      .option('uid', ''));
  });

  xdescribe('before loading', function() {
    beforeEach(function() {
      analytics.stub(ambassador, 'load');
    });

    describe('#initialize', function() {
      it('should create the window._mbsy object', function() {
        analytics.assert(!window._mbsy);
        analytics.initialize();
        analytics.assert(window._mbsy);
      });

      it('should call #load', function() {
        analytics.initialize();
        analytics.called(Ambassador.load);
      });
    });
  });
});
