import TaskListComponent from '../view/task-list-component.js';
import TaskAreaComponent from '../view/task-area-component.js';
import TaskComponent from '../view/task-component.js';
import { render, RenderPosition } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TasksAreaPresenter {
  tasksAreaComponent = new TaskAreaComponent()
  tasksListComponent = new TaskListComponent();

  constructor({ areaContainer, tasksModel }) {
    this.areaContainer = areaContainer;
    this.tasksModel = tasksModel;
  }

  init() {
    this.areaTasks = [...this.tasksModel.getTasks()];
    render(this.tasksAreaComponent, this.areaContainer);
    this.renderTasks();
    this.tasksAreaComponent.getElement().querySelector('.clear-btn').addEventListener('click', this.handleClearTrash.bind(this));
      }
    
   

  renderTasks() {
    this.areaTasks.forEach(task => {
      const taskComponent = new TaskComponent({ task });
      const taskList = this.tasksAreaComponent.getElement().querySelector(`.task-list[data-status="${task.status}"]`);
      render(taskComponent, taskList);
    });
  }

  handleClearTrash() {
    this.boardTasks = this.boardTasks.filter(task => task.status !== Status.BASKET);
    this.tasksAreaComponent.getElement().querySelector(`.task-list[data-status="${Status.BASKET}"]`).innerHTML = '';
    this.renderTasks();
  }
}  
 
