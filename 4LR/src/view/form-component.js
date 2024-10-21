import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormComponentTemplate() {
    return (
        `<section class="task">
        <h2 for="input">Новая задача</h2>
        <input name="s" placeholder="Название задачи"/>
        <button>+ Добавить</button>
        </section>`
      );
}

export default class FormComponent extends AbstractComponent {
  get template() {
    return createFormComponentTemplate();
  }
}
  