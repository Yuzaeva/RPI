import HeaderComponent from './view/header-component.js'
import FormComponent from './view/form-component.js';
import { render, RenderPosition } from '../src/framework/render.js';
import TasksAreaPresenter from './presenter/task-area-presenter.js';
import TasksModel from './model/task-model.js';


const bodyContainer = document.querySelector('.board-app');
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const formContainer = document.querySelector('.form-task');
render(new FormComponent(), formContainer);

const tasksAreaContainer = document.querySelector(".task-area");

const tasksModel = new TasksModel();
const tasksAreaPresenter = new TasksAreaPresenter({ areaContainer: tasksAreaContainer, tasksModel});

tasksAreaPresenter.init();