import TasksAreaComponent from '../view/task-area-component.js';
import TasksListComponent from '../view/task-list-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import TaskPresenter from './task-presenter.js';
import FormComponent from '../view/form-component.js';
import { Status } from '../const.js';
import { render, RenderPosition } from '../framework/render.js';
import EmptyTaskComponent from '../view/empty-task-component.js';

export default class TasksAreaPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksAreaComponent = new TasksAreaComponent();
  #clearButtonComponent = new ClearButtonComponent();
  #formComponent = null;
  #taskPresenters = new Map();
  #tasksListComponents = new Map(); // компоненты списка задач

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    // Подписываемся на изменения в модели задач
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderBoard();
    this.#renderFormAddTask();
  }

  #renderBoard() { 
    if (!this.#tasksAreaComponent) {
        throw new Error("TasksAreaComponent is not initialized");
    }
    render(this.#tasksAreaComponent, this.#boardContainer); 
    Object.values(Status).forEach((status) => { 
        this.#renderTasksList(status); 
    });
    this.#renderClearButton();
}

  #renderTasksList(status) {
    const tasksListComponent = new TasksListComponent(status);
    this.#tasksListComponents.set(status, tasksListComponent);
    render(tasksListComponent, this.#tasksAreaComponent.element);

    const tasksForStatus = this.#tasksModel.tasks.filter((task) => task.status === status);
    this.#updateTasksList(tasksListComponent, tasksForStatus);
  }

  #updateTasksList(tasksListComponent, tasksForStatus) {
    const tasksListElement = tasksListComponent.element.querySelector('.tasks__list');
    tasksListElement.innerHTML = '';

    if (tasksForStatus.length === 0) {
      const emptyTaskComponent = new EmptyTaskComponent();
      render(emptyTaskComponent, tasksListElement);
    } else {
      tasksForStatus.forEach((task) => {
        this.#renderTask(task, tasksListElement);
      });
    }
  }

  #renderTask(task, container) {
    const taskPresenter = new TaskPresenter({ taskContainer: container });
    taskPresenter.init(task);
    this.#taskPresenters.set(task.id, taskPresenter);
  }

  #renderFormAddTask() {
    this.#formComponent = new FormComponent({
      onClick: this.#handleNewTaskButtonClick.bind(this),
    });
    render(this.#formComponent, this.#boardContainer, RenderPosition.BEFOREBEGIN);
  }

  #renderClearButton() {
    // Отрисовываем кнопку только под столбцом "Корзина"
    const tasksListComponent = this.#tasksListComponents.get(Status.BASKET);
    if (tasksListComponent) {
      render(this.#clearButtonComponent, tasksListComponent.element, RenderPosition.BEFOREEND);
      this.#clearButtonComponent.setClickHandler(this.#handleClearButtonClick);
    }
  }

  #handleClearButtonClick = () => {
    this.#tasksModel.clearBasketTasks(); // Очищаем только корзину
    this.#updateBoard(); // Обновляем доску
    this.#updateClearButtonVisibility(); // Обновляем видимость кнопки
  };

  #handleNewTaskButtonClick() {
    const taskTitle = document.querySelector('input[type="text"]').value.trim();
    if (!taskTitle) return;

    // Добавляем новую задачу в модель и получаем ее с обновленным статусом
    const newTask = this.#tasksModel.addTask(taskTitle);
    document.querySelector('input[type="text"]').value = ''; // Очищаем поле ввода

    // Обновляем только нужный список задач
    const tasksListComponent = this.#tasksListComponents.get(newTask.status);
    const tasksForStatus = this.#tasksModel.tasks.filter(task => task.status === newTask.status);
    this.#updateTasksList(tasksListComponent, tasksForStatus);

    // Обновляем кнопку очистки
    this.#renderClearButton();
    this.#updateClearButtonVisibility();
  }

  #handleModelChange() {
    this.#clearBoard(); // Очищаем доску
    this.#renderBoard(); // Перерисовываем доску
  }

  #clearBoard() {
    if (this.#tasksAreaComponent.element) {
        this.#tasksAreaComponent.element.innerHTML = ''; // Очищаем содержимое доски 
    } else {
        console.error('tasksAreaComponent.element doesn\'t exist.');
    }
}


  #updateBoard() {
    Object.values(Status).forEach((status) => {
      const tasksListComponent = this.#tasksListComponents.get(status);
      this.#updateTasksList(tasksListComponent, this.#tasksModel.tasks.filter(task => task.status === status));
    });
    this.#updateClearButtonVisibility(); // Обновляем видимость кнопки
  }

  #updateClearButtonVisibility() {
    const tasksInBasket = this.#tasksModel.getTasksByStatus('basket');
    if (tasksInBasket.length === 0) {
      this.#clearButtonComponent.element.style.display = 'none'; // Скрываем кнопку
    } else {
      this.#clearButtonComponent.element.style.display = 'block'; // Показываем кнопку
    }
  }
}