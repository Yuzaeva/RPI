import {createElement} from '../framework/render.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';
import { StatusLabel } from '../src/const.js';

function createTaskListComponentTemplate() {
    return (
        `<div class="column ${status.toLowerCase()}"> <!-- Класс статус здесь -->
      <h3 class="column-header">${StatusLabel[status]}</h3>
      <ul class="tasks__list tasks__${status} list-reset"></ul>
    </div>`
    );
}

export default class TaskListComponent extends AbstractComponent {
  constructor(status) {
    super();
    this.status = status;
  }

  get template() {
    return createTaskListComponentTemplate(this.status);
  }
}