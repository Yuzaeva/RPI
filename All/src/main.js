import HeaderComponent from './view/header-component.js';
import TasksAreaPresenter from './presenter/task-area-presenter.js';
import TasksModel from './model/task-model.js';
import { render, RenderPosition } from './framework/render.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://67220b442108960b9cc2a5ec.mockapi.io';
const bodyContainer = document.querySelector('.board-app');
const tasksBoardContainer = document.querySelector('.task-area');

const tasksModel = new TasksModel({
  tasksApiService: new TasksApiService(END_POINT)
});

// Рендерим только хедер
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

// Инициализируем презентер доски задач
tasksModel.init().then(() => {
  const tasksBoardPresenter = new TasksAreaPresenter({
    boardContainer: tasksBoardContainer,
    tasksModel,
  });
  tasksBoardPresenter.init();
});