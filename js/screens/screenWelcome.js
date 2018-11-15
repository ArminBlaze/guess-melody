import utils from '../utils.js';
import data from '../data.js';

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

  // По нажатию на кнопку должна начинаться игра:
  // Инициализируется data объект с 3-мя жизнями
  // Запускается таймер
  // генерируется случайный экран вопроса

  button.onclick = function () {
    data.init();

    // тут вызов функции, которая рандомно выбирает экран с вопросом
    data.checkGameState(data.currentState);
  };

  return elem;
}

export default {
  getElem
};

