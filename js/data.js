import utils from './utils.js';

const questions = [
  {
    text: `Кто исполняет эту песню?`,
    correctAnswerId: 1,
    answers: {}
  },
  {
    text: `Чей это трек?`,
    correctAnswerId: 2,
    answers: {}
  }
];

const answers = [
  {
    name: `Andrew Huang`,
    description: `Andrew Huang - это такой музыкант`,
    image: ``,
    audio: `../music/Blunt.mp3`,
    genre: `electronic`
  },
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
    audio: `../music/Zemfira-trafic.mp3`,
    genre: `rock`
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
    name: `Виктор Цой`,
    description: ``,
    image: ``,
    audio: `../music/Gruppa krovi.mp3`,
    genre: `rock`
  },
  {
    name: `Виктор Цой`,
    description: ``,
    image: ``,
    audio: `../music/Zvezda po imeni Solnce.mp3`,
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
    audio: `../music/Smislovie gallucinacii - Vecno molodoy.mp3`,
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
  questions,
  answers,
  usedQuestions: {},
  usedAnswers: {}
});

let currentState;

function init() {
  currentState = Object.assign({}, initState);
}

function getRandomQuestion() {
  const answersInQuestion = 3;
  // пикает случайный вопрос
  // проверяет, что его нет в usedQuestions
//  debugger;
  let randQ;
  do {
    randQ = utils.randomInteger(0, currentState.questions.length - 1);
    console.log(randQ);
  } while (currentState.usedQuestions[randQ]);

  // записывает его в usedQuestions
  currentState.usedQuestions[randQ] = true;
  const question = currentState.questions[randQ];
  currentState.currentQuestion = question;

  // пикает в его ответы правильный ответ и два случайных ответа
  addAnswers(question);

  function addAnswers(question) {
    // берем правильный ответ
    question.answers[question.correctAnswerId] = currentState.answers[question.correctAnswerId];
    currentState.usedAnswers[question.correctAnswerId] = true;

    // берем 2 случайных
    while (Object.keys(question.answers).length < answersInQuestion) {
      let answerID = getRandomAnswerID();
      // записывает его в usedAnswers
      question.answers[answerID] = currentState.answers[answerID];
      currentState.usedAnswers[answerID] = true;
    }
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

  console.log(currentState.questions[randQ]);
  return currentState.currentQuestion;
}


export default {
  getRandomQuestion,
  get currentState() {
    return currentState;
  },
  init
};
