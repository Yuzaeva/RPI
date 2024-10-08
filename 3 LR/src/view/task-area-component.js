import {createElement} from '../framework/render.js';
import { Status } from '../const.js';

function createTaskAreaComponentTemplate() {
    return (
        `<section class="column">
          <section class="backlog">
            <label>Бэклог</label>
            <ul class="task-list" data-status="${Status.BACKLOG}"></ul>
          </section>
          <section class="progress">
              <label>В процессе</label>
              <ul class="task-list" data-status="${Status.PROCESSING}"></ul>
          </section>
          <section class="ready">
              <label>Готово</label>
              <ul class="task-list" data-status="${Status.DONE}"></ul>
          </section>
          <section class="basket">
              <label>Корзина</label>
              <ul class="task-list" data-status="${Status.BASKET}"></ul>
              <button class="clear-btn">Х Очистить</button>
          </section>
        </section>`
    );
}

export default class TaskAreaComponent {
  getTemplate() {
    return createTaskAreaComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}