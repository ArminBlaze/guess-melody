import utils from '../utils.js';
import screensController from '../screensController.js';

const template = `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;2 минуты дать
      максимальное количество правильных ответов.<br>
      Удачи!
    </p>
  </section>`;


function getElem() {
  const elem = utils.getElementFromTemplate(template);
  const button = elem.querySelector(`.main-play`);
  button.onclick = function () {
    screensController.renderScreen(`screenArtist`);
  };

  return elem;
}

export default {
  getElem
};
