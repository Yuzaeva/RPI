import { StatusLabel } from "../const.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTasksListComponentTemplate(status) {
  return `
    <div class="column ${status.toLowerCase()}"> 
      <h3 class="column-header">${StatusLabel[status]}</h3>
      <ul class="tasks__list tasks__${status} list-reset"></ul>
    </div>`;
}

export default class TasksListComponent extends AbstractComponent {
  constructor({ status, label, onTaskDrop }) {
    super();
    this.status = status;
    this.label = label;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTasksListComponentTemplate(this.status, this.label);
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element;
    
    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    
    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      const dropTarget = event.target.closest('.task-item');
      const index = dropTarget ? Array.from(container.children).indexOf(dropTarget) : container.children.length; //Если dropTarget определен, то index будет равен индексу этого элемента в контейнере. Если нет, index получит значение, равное количеству детей в контейнере, что указывает на добавление нового элемента в конец
      onTaskDrop(taskId, this.status, index);
    });
  }
}