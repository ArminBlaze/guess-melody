import utils from '../utils.js';
import screensController from '../screensController.js';

const template = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы проиграли</h2>
    <div class="main-stat">Ничего, вам повезет в следующий раз</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

function getElem() {
  const elem = utils.getElementFromTemplate(template);
	
  const button = elem.querySelector(`.main-replay`);
  button.onclick = function () {
    screensController.renderScreen(`screenWelcome`);
  };

  return elem;
}

export default {
  getElem
};
