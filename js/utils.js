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

function generateEvent(elem = document, msg, detail) {
//		var event = new CustomEvent('card-closed', {bubbles: true});	//Edge > 11 IE
  let event = document.createEvent(`Event`); // IE 9+
//		event.initEvent("image-added", true, true); //IE 9+
  event.initEvent(msg, true, true); // IE 9+

  if (detail) {
    event.detail = detail;
  }

  elem.dispatchEvent(event);
}


export default {
  getElementFromTemplate,
  randomInteger,
  generateEvent
};
