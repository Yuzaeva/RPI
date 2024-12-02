import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTasksAreaComponentTemplate() {
  return `
    <section class="tasks">
      <ul class="task-list"></ul> 
    </section>
  `;
}

export default class TasksAreaComponent extends AbstractComponent {
  get template() {
    return createTasksAreaComponentTemplate();
  }
}