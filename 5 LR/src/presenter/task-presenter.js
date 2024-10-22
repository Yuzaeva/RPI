import TaskComponent from '../view/task-component.js';
import { render, remove } from '../framework/render.js';

export default class TaskPresenter {
  #taskContainer = null;
  #task = null;
  #taskComponent = null;

  constructor({ taskContainer }) {
    this.#taskContainer = taskContainer;
  }

  init(task) {
    this.#task = task;

    this.#taskComponent = new TaskComponent({ task: this.#task });
    
    render(this.#taskComponent, this.#taskContainer);
  }

  destroy() {
    remove(this.#taskComponent); // Удаляем компонент задачи
  }

  updateTask(updatedTask) {
    this.#task = updatedTask;
    this.#taskComponent.updateElement({ task: this.#task }); // Обновляем компонент задачи
  }
}
