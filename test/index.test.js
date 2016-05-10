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
    uid: '11111111-1111-1111-1111-111111111111'
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

    describe('#identify', function() {
      beforeEach(function() {
        analytics.stub(window.mbsy, 'identify');
      });

      it('should send an id', function() {
        analytics.identify('id');
        analytics.called(window.mbsy.identify, 'id', {}, { identifyType: 'segment' });
      });

      it('should send traits', function() {
        analytics.identify({ email: 'test@example.com' });
        analytics.called(window.mbsy.identify, { email: 'test@example.com' }, { identifyType: 'segment' });
      });

      it('should send an id and traits', function() {
        analytics.identify('id', { email: 'test@example.com' });
        analytics.called(window.mbsy.identify, 'id', { email: 'test@example.com' }, { identifyType: 'segment' });
      });

      it('should send traits and options', function() {
        analytics.identify({ email: 'test@example.com' }, { Ambassador: { enrollCampaign: 1, enrollGroups: '1,2,3' } });
        analytics.called(window.mbsy.identify, { email: 'test@example.com' }, { enrollCampaign: 1, enrollGroups: '1,2,3', identifyType: 'segment' });
      });

      it('should send an id and options', function() {
        analytics.identify('id', {}, { Ambassador: { enrollCampaign: 1, enrollGroups: '1,2,3' } });
        analytics.called(window.mbsy.identify, 'id', {}, { enrollCampaign: 1, enrollGroups: '1,2,3', identifyType: 'segment' });
      });

      it('should send an id, traits and options', function() {
        analytics.identify('id', { email: 'test@example.com' }, { Ambassador: { enrollCampaign: 1, enrollGroups: '1,2,3' } });
        analytics.called(window.mbsy.identify, 'id', { email: 'test@example.com' }, { enrollCampaign: 1, enrollGroups: '1,2,3', identifyType: 'segment' });
      });
    });

    describe('#track', function() {
      beforeEach(function() {
        analytics.stub(window.mbsy, 'track');
      });

      it('should not send event if conversion option is not provided', function() {
        analytics.track('Event Name');
        analytics.didNotCall(window.mbsy.track);
      });

      it('should send an event, properties and options', function() {
        analytics.track('event', { revenue: 1 }, { Ambassador: { conversion: true } });
        analytics.called(window.mbsy.track, 'event', { revenue: 1 }, { conversion: true });
      });
    });
  });
});
