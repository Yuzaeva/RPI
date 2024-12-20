import HeaderComponent from './view/header-component.js';
import TasksAreaPresenter from './presenter/task-area-presenter.js';
import TasksModel from './model/task-model.js';
import { render, RenderPosition } from './framework/render.js';
import { tasks } from './mock/task.js'; // Импортируйте массив задач

const bodyContainer = document.querySelector('.board-app');
const tasksBoardContainer = document.querySelector('.task-area');

const tasksModel = new TasksModel(tasks); // Инициализируем модель с задачами
const tasksAreaPresenter = new TasksAreaPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

// Рендерим только хедер
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

// Инициализируем презентер доски задач
tasksAreaPresenter.init();