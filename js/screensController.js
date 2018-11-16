import screenWelcome from './screens/welcomeController.js';
import screenArtist from './screens/artistController.js';
import screenGenre from './screens/genreController.js';
import screenWin from './screens/winController.js';
import screenLose from './screens/loseController.js';

import eventBus from './framework/eventBus';
import EVENTS from './framework/events';

const screens = {
  screenWelcome,
  screenArtist,
  screenGenre,
  screenWin,
  screenLose
};

const main = document.querySelector(`.main`);


// init();

function init() {
  renderScreen(`screenWelcome`);


  eventBus.subscribe(EVENTS.screens, function (screen) {
    renderScreen(screen);
  });
//  document.addEventListener(`screensController`, function (e) {
//    renderScreen(e.detail);
//  });
}

function renderScreen(name) {
  let elem = screens[name].getElem();
  main.innerHTML = ``;
  main.appendChild(elem);
  console.log(screens);
}

export default {
  init,
  renderScreen
};
