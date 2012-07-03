var kwery = require('./');
var eql = require('eql');

describe('Kwery', function () {

  describe('Flat', function () {
    
    describe('Many', function () {
      
      it('returns all the objects found by regex', function (done) {
        
        var objects = [ { name: 'one' }, { name: 'two' }, { name: 'three' } ];

        var result = kwery.flat(objects, { name: /.*/ });

        result.many(function (response) {
          response.should.eql(objects);
          done();
        });

      });

      it('returns all the objects found by attribute', function (done) {
        
        var objects = [ { name: '1' }, { name: 1 } ];

        var result = kwery.flat(objects, { name: 1 });

        result.many(function (response) {
          response.should.eql(objects);
          done();
        });

      });

    });

    describe('One', function () {
      
      it('returns one object', function (done) {

        var objects = [ { name: 'one' }, { name: 'two' }, { name: 'three' } ];

        var result = kwery.flat(objects, { name: 'one' });

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

        var result = kwery.flat(objects, { name: 'four' });

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

  describe('Tree', function () {

    describe('Many', function () {

      it('returns all the matching results', function () {
        
        var db = [
          {
            id: 0,
            name: 'snowboard',
            path: '/snowboard',
            children: [
              {
                id: 1,
                name: 'tags',
                path: '/snowboard/tags',

                children: [
                  { id: 2, name: 'red', path: '/snowboard/tags/red' },
                  { id: 3, name: 'green', path: '/snowboard/tags/green' }
                ]

              }
            ]
          }
        ];

        var result = kwery.tree(db, { path: /snowboard\/.*/ });

        result.many(function (response) {
          var expected = [
            {
              id: 1,
              name: 'tags',
              path: '/snowboard/tags',

              children: [
                { id: 2, name: 'red', path: '/snowboard/tags/red' },
                { id: 3, name: 'green', path: '/snowboard/tags/green' }
              ]

            },
            { id: 2, name: 'red', path: '/snowboard/tags/red' },
            { id: 3, name: 'green', path: '/snowboard/tags/green' }

          ];

          eql(expected, response);

        });

      });

    });

  });

});

