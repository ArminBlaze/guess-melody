import assert from 'assert';
import data from './data.js';

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { document } = (new JSDOM(`...`)).window;


describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
//    it(`should fail`, () => {
//      assert.equal([1, 2, 3].indexOf(4), 0);
//    });
  });
});


describe(`Time Functions`, () => {
  data.init();

  describe(`calculatePassedTime`, () => {
    it(`should return 0 when timer didn't started`, () => {
      assert.equal(data.calculatePassedTime(), 0);
    });
  });

  describe(`formatTime`, () => {
    it(`should return formatted time for 120 sec`, () => {
      assert.deepEqual(data.formatTime(120), {minutes: 2, seconds: 0});
    });
    it(`should return formatted time for 0 sec`, () => {
      assert.deepEqual(data.formatTime(0), {minutes: 0, seconds: 0});
    });
    it(`should return formatted time for 119 sec`, () => {
      assert.deepEqual(data.formatTime(119), {minutes: 1, seconds: 59});
    });
    it(`should return formatted time for 59 sec`, () => {
      assert.deepEqual(data.formatTime(59), {minutes: 0, seconds: 59});
    });
  });


});

describe(`State Functions`, () => {
  data.init();

  describe(`calculateStatistic`, () => {
    it(`should be equal for 0 time and score`, () => {
      assert.deepEqual(data.calculateStatistic(), {time: {minutes: 0, seconds: `00`}, score: 0});
    });
  });

  describe(`3 lives on start`, () => {
    it(`should have 3 lives on start`, () => {
      assert.deepEqual(data.initState.lives, 3);
    });
  });

  describe(`changeLives`, () => {
    it(`shouldn't change lives if 0 is and argument`, () => {
      assert.deepEqual(data.changeLives(data.initState, 0).lives, 3);
    });
  });

  describe(`changeLives`, () => {
    it(`should substract 1 live`, () => {
      assert.deepEqual(data.changeLives(data.initState, -1).lives, 2);
    });
  });

  describe(`changeLives`, () => {
    it(`should substract all lives`, () => {
      assert.deepEqual(data.changeLives(data.initState, -3).lives, 0);
    });
  });

  describe(`changeLives`, () => {
    it(`shouldn't set lives less than 0`, () => {
      assert.deepEqual(data.changeLives(data.initState, -4).lives, 0);
    });
  });

  describe(`changeCorrectAnswers`, () => {
    it(`should add 1 correct answer`, () => {
      assert.deepEqual(data.changeCorrectAnswers(data.initState, 1).correctAnswers, 1);
    });
  });



});
