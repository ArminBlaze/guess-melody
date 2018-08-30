function getElementFromTemplate(template) {
  let container = document.createElement(`template`);
  container.innerHTML = template;
  return container.content;
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

export default {
  getElementFromTemplate,
  randomInteger
};
