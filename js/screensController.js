import screenWelcome from './screens/screenWelcome.js';
import screenArtist from './screens/screenArtist.js';
import screenGenre from './screens/screenGenre.js';
import screenWin from './screens/screenWin.js';
import screenLose from './screens/screenLose.js';

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
