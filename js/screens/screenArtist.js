import '../animate.js';
import '../player.js';
import utils from '../utils.js';
import data from '../data.js';
// import screensController from '../screensController.js';

let state;

// let questionNumber = 1;




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
