var query = function (objects, query, callback) {

  var key = Object.keys(query)[0];
  var term = query[key];

  var is_regex = term instanceof RegExp;

  var result = [];

  objects.forEach(function (obj) {

    if (is_regex && term.test(obj[key].toString())) {
      result.push(obj);
    } else if (term === obj[key]) {
      result.push(obj);
    }

  });

  callback(result);

};

module.exports = function (objects, opts) {

  var kwery = {

    many: function (callback) {

      query(objects, opts, callback);

    },

    one: function (callback) {

      kwery.many(function (response) {

        if (response.length > 0) {
          callback(response[0]);
        }

      });
     
    },

    empty: function (callback) {

      kwery.many(function (response) {

        if (response.length === 0) {
          callback();
        }

      });

    }

  };

  return kwery;

};
