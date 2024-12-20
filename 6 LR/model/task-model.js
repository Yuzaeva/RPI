import { generateId } from '../utils/utils.js'; 

export default class TasksModel {
  #boardtasks = []; 
  #observers = []; 

  constructor(initialTasks = []) {
    this.#boardtasks = initialTasks; // Инициализация задач
  }

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateId(),
    };
    this.#boardtasks.push(newTask);
    this._notifyObservers(); // Уведомляем всех подписчиков об изменении
    return newTask;
  }

  clearBasketTasks() {
    this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'basket'); // Очищаем только корзину
    this._notifyObservers(); // Уведомляем об изменении
  }

  updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find(task => task.id === taskId);
    if (task) {
        task.status = newStatus;
        this._notifyObservers(); 
    }
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }

  moveTask(taskId, newStatus, index) {
    const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const task = this.#boardtasks.splice(taskIndex, 1)[0];
      task.status = newStatus;
      this.#boardtasks.splice(index, 0, task);
      this._notifyObservers();
    }
  }
}
