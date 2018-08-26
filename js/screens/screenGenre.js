import utils from '../utils.js';
import screensController from '../screensController.js';

const template = `<section class="main main--level main--level-genre">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </section>`;

function getElem() {
  const elem = utils.getElementFromTemplate(template);
  const button = elem.querySelector(`.genre-answer-send`);
  button.setAttribute(`disabled`, ``);
  button.onclick = function (e) {
    e.preventDefault();
  //  screensController.renderScreen(`screenArtist`);
    let rand = Math.floor(Math.random() * 2);

    if (rand) {
      screensController.renderScreen(`screenWin`);
    } else {
      screensController.renderScreen(`screenLose`);
    }
  };

  const form = elem.querySelector(`.genre`);
  form.onchange = function (e) {
  //  console.log(`onchange`);
  //  let inputs = form.querySelectorAll('input:checked').length;
    if (form.querySelectorAll(`input:checked`).length) {
      button.removeAttribute(`disabled`);
    } else {
      button.setAttribute(`disabled`, ``);
    }
  };

  return elem;
}

export default {
  getElem
};
