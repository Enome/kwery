var kwery = require('./');

describe('Kwery', function () {
  
  describe('Many', function () {
    
    it('returns all the objects found by regex', function (done) {
      
      var objects = [ { name: 'one' }, { name: 'two' }, { name: 'three' } ];

      var result = kwery(objects, { name: /.*/ });

      result.many(function (response) {
        response.should.eql(objects);
        done();
      });

    });

    it('returns all the objects found by attribute', function (done) {
      
      var objects = [ { name: 'one' }, { name: 'one' } ];

      var result = kwery(objects, { name: 'one' });

      result.many(function (response) {
        response.should.eql(objects);
        done();
      });

    });

  });

  describe('One', function () {
    
    it('returns one object', function (done) {

      var objects = [ { name: 'one' }, { name: 'two' }, { name: 'three' } ];

      var result = kwery(objects, { name: 'one' });

      result.one(function (response) {
        response.should.eql({ name: 'one' });
        done();
      });

      result.empty(function () {
        false.should.be.true;
        done();
      });

    });

  });

  describe('Empty', function () {
    
    it('returns nothing object', function (done) {

      var objects = [ { name: 'one' }, { name: 'two' }, { name: 'three' } ];

      var result = kwery(objects, { name: 'four' });

      result.empty(function () {
        true.should.true
        done();
      });

      result.one(function () {
        false.should.true
        done();
      });

    });

  });

});
