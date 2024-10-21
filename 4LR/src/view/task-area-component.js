import {createElement} from '../framework/render.js';
import { Status } from '../const.js';
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskAreaComponentTemplate() {
    return (
        `<section class="column">
          <ul class="task-list"></ul>
        </section>`
    );
}

export default class TaskAreaComponent extends AbstractComponent {
  get template() {
    return createTaskAreaComponentTemplate();
  }
}