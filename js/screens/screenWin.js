import utils from '../utils.js';
import screensController from '../screensController.js';

const template = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;2&nbsp;минуты<br>вы&nbsp;отгадали 4&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
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
