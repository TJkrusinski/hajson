'use strict';

var json = require('./fixtures/example.json');
var assert = require('chai').assert;
var toHa = require('..');

describe('toHa()', function(){
  it('converts json to haproxy config file', function(){
    var config = toHa(json);
    assert.isString(config);
  });
});
