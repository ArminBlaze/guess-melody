import utils from '../utils.js';
import screensController from '../screensController.js';
import data from '../data.js';

const template = (stats) => `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${stats.time.minutes}:${stats.time.seconds}&nbsp;минуты<br>вы&nbsp;отгадали ${stats.score}&nbsp;мелодии</div>
    <span class="main-comparison">Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

function getElem() {
//	const question = data.getRandomQuestion();
	let stats = data.calculateStatistic();
	console.log(stats);
	
  const elem = utils.getElementFromTemplate(template(stats));
	
  const button = elem.querySelector(`.main-replay`);
  button.onclick = function () {
    screensController.renderScreen(`screenWelcome`);
  };

  return elem;
}

export default {
  getElem
};
