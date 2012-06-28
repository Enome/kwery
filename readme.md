```js
var objects = [ { name: 'one' }, { name: 'two' }, { name: 'three' } ];

var result = kwery(objects, { name: 'one' });

// or

var result = kwery(objects, { name: /.*/ });


result.many(function (data) {
  // do stuff with data
});

result.one(function (data) {
  // do stuff with data
});

result.empty(function () {
  // do stuff when empty
});
```
