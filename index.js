var match = function (query, obj) {

  var key = Object.keys(query)[0];
  var term = query[key];
  var is_regex = term instanceof RegExp;

  return ((is_regex && term.test(obj[key].toString())) || (term.toString() === obj[key].toString()));

};

var flat = function (objects, query, callback) {

  var result = [];

  objects.forEach(function (obj) {

    if (match(query, obj)) {
      result.push(obj);
    }

  });

  callback(result);

};


var tree = function (objects, query, callback) {

  var result = [];

  var traverse = function (ns) {

    ns.forEach(function (node) {

      if (match(query, node)) {
        result.push(node);
      }
      if (node.children) {
        traverse(node.children);
      }

    });

  };

  traverse(objects);
  callback(result);

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
