import '../animate.js';
import '../player.js';
import utils from '../utils.js';
import data from '../data.js';
// import screensController from '../screensController.js';

import ArtistView from './artistView';

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


  const view = new ArtistView(state);

  console.log(view);

  view.onClick = function () {
    console.log('click!');

  };

  return view.getElem();
}

export default {
  getElem
};
