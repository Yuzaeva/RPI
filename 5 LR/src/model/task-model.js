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
    this._notifyObservers(); 
    return newTask;
  }

  clearBasketTasks() {
    this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'basket'); // Очищаем только корзину
    this._notifyObservers(); 
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
}
