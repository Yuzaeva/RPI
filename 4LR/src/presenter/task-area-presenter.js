import TaskListComponent from '../view/task-list-component.js';
import TaskAreaComponent from '../view/task-area-component.js';
import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../src/const.js';
import EmptyTaskComponent from '../view/empty-task-component.js';


export default class TasksAreaPresenter {
  #areaContainer = null;
  #tasksModel = null;
  #tasksAreaComponent = new TaskAreaComponent()
  #areaTasks = [];
  //tasksListComponent = new TaskListComponent();

  constructor({ areaContainer, tasksModel }) {
    this.#areaContainer = areaContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#areaTasks = [...this.#tasksModel.tasks];
    this.#renderArea();
  }

  #renderArea() {
    render(this.#tasksAreaComponent, this.#areaContainer);
    //this.tasksAreaComponent.getElement().querySelector('.clear-btn').addEventListener('click', this.handleClearTrash.bind(this));

    Object.values(Status).forEach((status) => {
      const tasksListComponent = new TaskListComponent({status: status, lable: StatusLabel[status]});
      render (tasksListComponent, this.#tasksAreaComponent.element);
      const tasksForStatus = getTasksByStatus(this.#areaTasks,status);
      const tasksListElement = tasksListComponent.element.querySelector('.tasks__list')
      
      if (tasksForStatus.length === 0) {
        const emptyTaskComponent = new EmptyTaskComponent();
        render(emptyTaskComponent, tasksListElement);
      }
      else {
      tasksForStatus.forEach((task) => {
        this.#renderTasks(task, tasksListElement);
      });
    }
    });
  }

  #renderTasks(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
    }
} 
 



