# Kwery

Find objects in an array or tree structure by regex or attribute value. All values get converted to a RegExp.

## Flat

```js
var objects = [ { name: 'one' }, { name: 'two' }, { name: 'three' } ];

var result = kwery.flat(objects, { name: 'one' });

// or

var result = kwery.flat(objects, { name: /.*/ });

result.many(function (data) {
  // data: array
});

result.one(function (data) {
  // called when there is atleast one result
});

result.empty(function () {
  // called when result is empty
});
```

## Tree

```js
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

result.many(function (data) {
  // data: array
});

result.one(function (data) {
  // called when there is atleast one result
});

result.empty(function () {
  // called when result is empty
});
```

## Test

mocha.js and should.js is needed.

```js
make test
```
