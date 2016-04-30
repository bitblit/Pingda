var chai = require('chai'),
     expect = chai.expect,
     should = chai.should(),
     pingda = require('../index');

describe('#testPingUrl', function() {
    it('Tests ping url against google.com', function(done) {
        pingda.pingURL('http://www.google.com').then(
            function(val)
            {
                expect(val).to.not.equal(null);
                done();
            },
            function(err)
            {
                done(err);
            }
        );
    });
});
