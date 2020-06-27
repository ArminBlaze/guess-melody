import utils from '../utils.js';

class AbstractView {

  get template() {
    return this._template;
  }

  render() {
		// добавить в этот файл импорт утилс и убрать из экранов
    return utils.getElementFromTemplate(this._template(this._data));
  }

  bind() {

  }

  getElem() {
    this.element = this.render();
    this.bind();

		// /ленивая загрузка

    return this.element;
  }
}

export default AbstractView;
