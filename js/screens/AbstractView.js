class AbstractView {

  get template() {
    return this._template;
  }

  render(data) {
		// добавить в этот файл импорт утилс и убрать из экранов
    return utils.getElementFromTemplate(this.template(data));
  }

  bind() {

  }

  get element() {
    this.elem = this.render(data);
    this.bind();

		// /ленивая загрузка
  }
}

export default AbstractView;
