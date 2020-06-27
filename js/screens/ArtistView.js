import AbstractView from './AbstractView';

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


class ArtistView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._template = template;
  }

  bind() {
    const timerElem = this.element.querySelector(`.timer-value`);
    const timerMin = timerElem.querySelector(`.timer-value-mins`);
    const timerSec = timerElem.querySelector(`.timer-value-secs`);

    // вызов метода data ?
    // перенести в контроллер?
    const question = this._data.getRandomQuestion();

    const audioFile = this._data.answers[question.correctAnswerId].audio;

    let playerWrapper = this.element.querySelector(`.player-wrapper`);
    window.initializePlayer(playerWrapper, audioFile, `autoplay`, false);

    // вызов метода data ?
    // это заменить на событие
    this._data.startTimer(state, {mins: timerMin, secs: timerSec});

    this.element.onclick = (evt) => {
      evt.preventDefault();
      this.onClick();
    };
  }

  onClick() {

  }
}


export default ArtistView;
