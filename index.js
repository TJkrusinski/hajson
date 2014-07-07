'use strict';

module.exports = toHa;

/**
 *  toHa
 *  @param {Object|String} json
 *  @return {String}
 *  @api public
 */
function toHa (json) {
  var json = json;
  var config = [];
  var iterator = createIterator(config);

  if (typeof json == 'string'){
    try {
      json = JSON.parse(json);
    } catch (e) {
      throw new Error(e);
    };
  };

  iterator(json);

  return config.join('\n');
};

/**
 *  Return a function that does the actual work
 *  @param {Array} config
 *  @return {Undefined}
 *  @api private
 */

function createIterator (config) {
  return function(json) {
    var key;
    var subKey;
    for (key in json) {

      if (!(json[key] instanceof Array)) {
        config.push(key);
        config.push(translate(key, json));
      } else {
        json[key].forEach(function(obj){
          var name = Object.keys(obj)[0];
          config.push(key+' '+name);
          config.push(translate(name, obj));
        });
      };
    };
  };
};

/**
 *  Extract the key and the data for the specified key
 *  @param {String} index
 *  @param {Object} json
 *  @return {Array}
 *  @api private
 */

function translate (index, json) {
  var data = json[index];
  var str = [];
  var key;

  if (typeof data[key] == 'object') data = json[index][key];

  for (key in data) {
    str.push('  '+key+' '+data[key]);
  };

  return str.join('\n');
};
