var flat = function (objects, query, callback) {

  var key = Object.keys(query)[0];
  var term = query[key];

  var is_regex = term instanceof RegExp;

  var result = [];

  objects.forEach(function (obj) {

    if (is_regex && term.test(obj[key].toString())) {
      result.push(obj);
    } else if (term.toString() === obj[key].toString()) {
      result.push(obj);
    }

  });

  callback(result);

};

var tree = function (objects, query, callback) {

};

var query = function (type, objects, opts) {

  var query = {

    many: function (callback) {

      type(objects, opts, callback);

    },

    one: function (callback) {

      query.many(function (response) {

        if (response.length > 0) {
          callback(response[0]);
        }

      });
     
    },

    empty: function (callback) {

      query.many(function (response) {

        if (response.length === 0) {
          callback();
        }

      });

    }

  };

  return query;

};

module.exports = {
  flat: query.bind(null, flat),
  tree: query.bind(null, tree)
};
