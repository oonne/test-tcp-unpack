let assert = require('assert');
let unpack = require('./unpack');

let data = require('./case/data');
let p1 = require('./case/p1');
let p2 = require('./case/p2');
let p3 = require('./case/p3');
let p4 = require('./case/p4');
let p5 = require('./case/p5');


describe('Array', function() {
  
  describe('case 1', function() {
    it('没有粘包和拆包', function() {
      let res = unpack(p1);
      assert.equal(res[0], data.data1);
      assert.equal(res[1], data.data2);
    });
  });

  describe('case 2', function() {
    it('只粘包', function() {
      let res = unpack(p2);
      assert.equal(res[0], data.data1);
      assert.equal(res[1], data.data2);
    });
  });

  describe('case 3', function() {
    it('只拆包', function() {
      let res = unpack(p3);
      assert.equal(res[0], data.data1);
    });
  });
  
  describe('case 4', function() {
    it('粘包和拆包', function() {
      let res = unpack(p4);
      assert.equal(res[0], data.data1);
      assert.equal(res[1], data.data2);
    });
  });
  
  describe('case 5', function() {
    it('拆包和粘包', function() {
      let res = unpack(p5);
      assert.equal(res[0], data.data1);
      assert.equal(res[1], data.data2);
    });
  });

});