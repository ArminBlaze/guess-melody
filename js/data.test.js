import assert from 'assert';
import data from './data.js';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it(`should fail`, () => {
      assert.equal([1, 2, 3].indexOf(4), 0);
    });
  });
});

data.init();

describe(`Time Functions`, () => {
  describe(`calculatePassedTime`, () => {
    it(`should return 120`, () => {
      assert.equal(data.calculatePassedTime(), data.initStateTime);
    });
  });
});
