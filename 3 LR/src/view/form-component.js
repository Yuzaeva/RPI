import {createElement} from '../framework/render.js';

function createFormComponentTemplate() {
    return (
        `<section class="task">
        <h2 for="input">Новая задача</h2>
        <input name="s" placeholder="Название задачи"/>
        <button>+ Добавить</button>
        </section>`
      );
}

export default class FormComponent {
    getTemplate() {
      return createFormComponentTemplate();
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
  