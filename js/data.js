import utils from './utils.js';

const questions = [
  {
    question: `Кто это поёт?`,
    correctAnswerId: 1,
    answers: {}
  },
  {
    question: `Чей это трек?`,
    correctAnswerId: 0,
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
    name: `Пелагея`,
    description: `Пелагея - певица такая`,
    image: ``,
    audio: ``,
    genre: `folk`
  },
  {
    name: `Краснознаменная дивизия имени моей бабушки`,
    description: `Краснознаменная дивизия имени моей бабушки`,
    image: ``,
    audio: ``,
    genre: `folk`
  },
  {
    name: `Lorde`,
    description: `Lorde - финская группа`,
    image: ``,
    audio: ``,
    genre: `folk`
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

const currentState = Object.assign({}, initState);

function getRandomQuestion() {
  const answersInQuestion = 3;
  // пикает случайный вопрос
  // проверяет, что его нет в usedQuestions
//  debugger;
  let randQ;
  do {
    randQ = utils.randomInteger(0, currentState.questions.length-1);
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

    do {
      randA = utils.randomInteger(0, currentState.answers.length-1);
      console.log(randA);
    } while (currentState.usedAnswers[randA]);

    return randA;
  }

  console.log(currentState.questions[randQ]);
  return currentState.currentQuestion;
}


export default {
  getRandomQuestion,
  currentState
};
