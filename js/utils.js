function getElementFromTemplate(template) {
  let container = document.createElement(`template`);
  container.innerHTML = template;
  return container.content;
}

export default {
  getElementFromTemplate
};
