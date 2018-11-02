import '../animate.js';
import '../player.js';
import utils from '../utils.js';
import data from '../data.js';
import screensController from '../screensController.js';

let state;

// let questionNumber = 1;

const headerTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">02</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>`;

const template = (question) => `<section class="main main--level main--level-artist">
    ${headerTemplate}

    <div class="main-wrap">
      <div class="main-timer"></div>

      <h2 class="title main-title">${question.text}</h2>
      <div class="player-wrapper"></div>
      <form class="main-list">
      ${[...Object.entries(question.answers)].map((answer, i) => {
//        console.log(answer);
        return `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="${answer[0]}" />
          <label class="main-answer" for="answer-${i}">
            <img class="main-answer-preview" src="">
            ${answer[1].name}
          </label>
        </div>`;
      }

        ).join(``)}
      </form>
    </div>
  </section>`;


let mainElem = document.querySelector(`.main`);
mainElem.addEventListener(`change`, function (e) {

//  console.log(e.target);

  // берем value инпута
  let answer = e.target.value;

//  console.log(answer);

  // проверяем правильный ли это ответ
//  console.log(answer in data.questions[questionNumber].answers);
//  console.log(data.questions[questionNumber].answers[answer]);

//  if(!answer in data.questions[questionNumber].answers) return;
//  console.log(`Правильный ответ: `, data.currentState.currentQuestion.correctAnswerId);
//  console.log(`Текущий ответ: `, +answer);
  if (state.currentQuestion.correctAnswerId !== +answer) {
    // если ответ неправильный - убираем одну жизнь
    alert(`Неправильно`);
    state = data.changeLives(state, -1);
    console.log(state.lives);
  } else {
    alert(`Правильно!`);
		state = data.changeCorrectAnswers(state, +1);
  }

  data.checkGameState(state);
//  screensController.renderScreen(`screenGenre`);
});


function getElem() {
	state = data.currentState;
  const question = data.getRandomQuestion();
//  console.log(`Ответы в вопросе: `, question.answers);
  const audioFile = question.answers[question.correctAnswerId].audio;

  const elem = utils.getElementFromTemplate(template(question));

  const timerElem = elem.querySelector(`.timer-value`);
  const timerMin = timerElem.querySelector(`.timer-value-mins`);
  const timerSec = timerElem.querySelector(`.timer-value-secs`);

  let playerWrapper = elem.querySelector(`.player-wrapper`);
  window.initializePlayer(playerWrapper, audioFile, `autoplay`, false);
	data.startTimer(state, {mins: timerMin, secs: timerSec});

//  const buttons = elem.querySelectorAll(`.main-answer`);
//  buttons.forEach((item) => {
//    item.onclick = function () {
// //      screensController.renderScreen(`screenGenre`);
//
//
//    };
//  });


  return elem;
}

export default {
  getElem
};
