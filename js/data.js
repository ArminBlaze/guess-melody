import utils from './utils.js';
import screensController from './screensController.js';

const Question = function (text, correctAnswerID, answers) {
  this.text = text;
  this.correctAnswerId = correctAnswerID;
  this.answers = answers;
};

const questionsText = [`Кто это поёт?`, `Кто исполняет эту песню?`];

const answers = [
  {
    name: `Алсу`,
    description: `Алсу - певица такая`,
    image: ``,
    audio: `../music/Alsu.mp3`,
    genre: `pop`
  },
  {
    name: `Король и шут`,
    description: `Панк-рок группа`,
    image: ``,
    audio: `../music/05. Blujdayut teni.mp3`,
    genre: `rock`
  },
  {
    name: `Мельница`,
    description: `Русская фолк-рок группа`,
    image: ``,
    audio: `../music/11 - Korolevna.mp3`,
    genre: `folk`
  },
  {
    name: `Земфира`,
    description: ``,
    image: ``,
    audio: `../music/Zemfira - Romashki.mp3`,
    genre: `rock`
  },
  {
    name: `Виктор Цой`,
    description: ``,
    image: ``,
    audio: `../music/Aluminievie ogurci.mp3`,
    genre: `rock`
  },
  {
    name: `ГДР`,
    description: ``,
    image: ``,
    audio: `../music/GDR - Jonatan.mp3`,
    genre: `rock`
  },
  {
    name: `Смысловые Галлюцинации`,
    description: ``,
    image: ``,
    audio: `../music/Smislovie gallucinacii - Perviy den oseni.mp3`,
    genre: `rock`
  },
  {
    name: `Сплин`,
    description: ``,
    image: ``,
    audio: `../music/Splin - Alisa.mp3`,
    genre: `rock`
  },
  {
    name: `Чайф`,
    description: ``,
    image: ``,
    audio: `../music/Chaif - salto nazad.mp3`,
    genre: `rock`
  }
];

const tableOfRecords = [
  {time: 20, answers: 8},
  {time: 50, answers: 7},
  {time: 32, answers: 10},
  {time: 20, answers: 10},
  {time: 44, answers: 10}
];

const initState = Object.freeze({
  time: 120,
  screen: `screenWelcome`,
  playerName: ``,
  tableOfRecords,
  gameType: ``,
  lives: 3,
  questionsText,
  answers,
  lastUsedQuestion: null,
  usedAnswers: {},
  correctAnswers: 0,
});

let currentState;

function init() {
  currentState = JSON.parse(JSON.stringify(initState));
  console.log(currentState);
}


// /////////////////// TIME FUNCTIONS

let timer = null;

function startTimer(state, elem) {
  deleteTimer();
  const mins = elem.mins;
  const secs = elem.secs;

  timer = setTimeout(function timerok() {
    state.time--;
    console.log(state.time);
      // тут перерисовываем окошко времени
    let time = formatTime(state.time);

    elem.mins.innerHTML = time.minutes;
    elem.secs.innerHTML = time.seconds;

    if (state.time > 0) {
      timer = setTimeout(timerok, 1000);
    } else {
        // конец игры, когда время вышло
      gameLose(`Время вышло!`);
    }
  }, 1000);
}

function deleteTimer() {
  console.log(timer);
  console.log(`Удаляю таймер`);
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function calculatePassedTime() {
  return initState.time - currentState.time;
}

function formatTime(seconds) {
  const formattedMinutes = Math.floor(seconds / 60);
  const formattedSeconds = (`0` + (seconds % 60)).slice(-2);

  return {minutes: formattedMinutes, seconds: formattedSeconds};
}

// //////////////////// END OF TIME FUNCTIONS


function checkGameState(state) {
  currentState = state;
  deleteTimer();
  console.log(Object.keys(currentState.usedAnswers).length, ` Сколько было вопросов`);
  if (currentState.lives < 1) {
  // жизни закончились, поражение
    gameLose(`Жизни закончились. Поражение.`);
  } else if (Object.keys(currentState.usedAnswers).length >= 5) {
    // вопросы закончились, победа
    gameWin(`Победа! Вы ответили на все вопросы!`);
  } else {
//    просто вызываем экран вопроса
    getRandomScreenForQuestion();
  }
}

function gameLose(str) {
  // Игра закончилась, отрисовываем статистику
  alert(str);
  screensController.renderScreen(`screenLose`);
}

function gameWin(str) {
  alert(str);
  screensController.renderScreen(`screenWin`);
}

function getRandomScreenForQuestion() {
  screensController.renderScreen(`screenArtist`);
}

function calculateStatistic() {
  let passedTime = calculatePassedTime();
  let formattedTime = formatTime(passedTime);

  let score = currentState.correctAnswers;

  writeRecord({time: passedTime, answers: score});
  console.log(passedTime, score);

  return {time: formattedTime, score};
}

function writeRecord(record) {
  tableOfRecords.push(record);

  debugger;
  console.log(tableOfRecords);
  sortRecords();
}

function changeLives(state, num) {
  let newState = Object.assign({}, state);
  newState.lives += num;
  return newState;
}

function changeCorrectAnswers(state, num) {
  let newState = Object.assign({}, state);
  newState.correctAnswers += num;
  return newState;
}

function sortRecords() {
  tableOfRecords.sort(function (a, b) {
    let rankDiff = b.answers - a.answers;
    if (rankDiff === 0) {
      rankDiff = namesComparator(a.time, b.time);
    }

    return rankDiff;
  });

  debugger;
  console.log(tableOfRecords);
}

  // для устойчивости массива, сравниваем по имени
function namesComparator(a, b) {
  return (a > b) ? 1 : -1;
}


function getRandomQuestion() {
  const answersInQuestion = 3;
  // пикает случайный вопрос
  let randQ;
  do {
    randQ = utils.randomInteger(0, currentState.questionsText.length - 1);
//    console.log(randQ);
  } while (currentState.lastUsedQuestion === randQ);

  currentState.lastUsedQuestion = randQ;
  const questionText = currentState.questionsText[randQ];

  // берет случайный ответ и делает его правильным
  let RandA = getRandomAnswerID();

  currentState.usedAnswers[RandA] = true;

  // Создаём объект вопроса, передав туда: 1) Текст вопроса
  // 2) id правильного ответа
  // 3) объект с вопросами, создаваемый функцией
  currentState.currentQuestion = new Question(questionText, RandA, addAnswers());


//  пикает правильный ответ и два случайных ответа
  function addAnswers() {
    // берем правильный ответ
    let answersForQuestion = {};
    answersForQuestion[RandA] = currentState.answers[RandA];

    // берем 2 случайных
    while (Object.keys(answersForQuestion).length < answersInQuestion) {
      let answerID = getRandomAnswerID();
      answersForQuestion[answerID] = currentState.answers[answerID];
    }

    return answersForQuestion;
  }

  function getRandomAnswerID() {
    let randA;
    const usedAnswersNum = Object.keys(currentState.usedAnswers).length;
    const answersNum = currentState.answers.length;

    do {
      randA = utils.randomInteger(0, currentState.answers.length - 1);
//      console.log(randA);
    } while (currentState.usedAnswers[randA] && usedAnswersNum < answersNum);

    return randA;
  }

//  console.log(currentState.currentQuestion);

  return currentState.currentQuestion;
}


export default {
  getRandomQuestion,
  get currentState() {
    return currentState;
  },
  get initState() {
    return JSON.parse(JSON.stringify(initState));
  },
  init,
  checkGameState,
  changeLives,
  calculateStatistic,
  changeCorrectAnswers,
  startTimer,
  deleteTimer,
  sortRecords
};
