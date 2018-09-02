import utils from './utils.js';

// const questions = [
//  {
//    text: `Кто исполняет эту песню?`,
//    correctAnswerId: 1,
//    answers: {}
//  },
//  {
//    text: `Чей это трек?`,
//    correctAnswerId: 2,
//    answers: {}
//  }
// ];

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

const initState = Object.freeze({
  time: 120,
  screen: `screenWelcome`,
  playerName: ``,
  tableOfRecords: [],
  gameType: ``,
  lives: 3,
  questionsText,
  answers,
  lastUsedQuestion: null,
  usedAnswers: {}
});

let currentState;

function init() {
  currentState = Object.assign({}, initState);
}

function getRandomQuestion() {
  const answersInQuestion = 3;
  // пикает случайный вопрос
//  debugger;
  let randQ;
  do {
    randQ = utils.randomInteger(0, currentState.questionsText.length - 1);
    console.log(randQ);
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
      console.log(randA);
    } while (currentState.usedAnswers[randA] && usedAnswersNum < answersNum);

    return randA;
  }

  console.log(currentState.currentQuestion);

  return currentState.currentQuestion;
}


export default {
  getRandomQuestion,
  get currentState() {
    return currentState;
  },
  init
};
