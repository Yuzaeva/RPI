import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskAreaComponent from './view/task-area-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from '../src/framework/render.js';


const bodyContainer= document.querySelector('.board-app');
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const formContainer = document.querySelector('.form-task');
render(new FormComponent(), formContainer);


const tasksAreaContainer = document.querySelector(".task-area");
render(new TaskAreaComponent(), tasksAreaContainer, RenderPosition.BEFOREBEGIN);




for (let i = 0; i < 4; i++) {
    const taskListComponent = new TaskListComponent();
    render(taskListComponent, tasksAreaContainer, RenderPosition.BEFOREEND);

    const tasksList = taskListComponent.getElement(".task-list");

    for (let j = 0; j < 3; j++) {
        render(new TaskComponent(), tasksList, RenderPosition.BEFOREEND);
      }
  }
