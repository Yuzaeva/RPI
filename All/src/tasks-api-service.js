import ApiService from './framework/view/api-service.js';


const Method = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};


export default class TasksApiService extends ApiService {
    get tasks() {
        return this._load({ url: 'task' })
            .then(ApiService.parseResponse)
            .then((data) => {
                console.log('Получение данных:', data);
                return data;
            })
            .catch(err => {
                console.error('Ошибка при загрузке задач:', err);
                throw err;
            })
        }

        async addTask(task) {
            try {
              const response = await this._load({
                url: 'task',
                method: Method.POST,
                body: JSON.stringify(task),
                headers: new Headers({ 'Content-Type': 'application/json' }),
              });
              return ApiService.parseResponse(response);
            } catch (err) {
              console.error('Ошибка при добавлении задачи:', err);
              throw err;
            }
          }
        
          async updateTask(task) {
            try {
              const response = await this._load({
                url: `task/${task.id}`,
                method: Method.PUT,
                body: JSON.stringify(task),
                headers: new Headers({ 'Content-Type': 'application/json' }),
              });
              return ApiService.parseResponse(response);
            } catch (err) {
              console.error('Ошибка при обновлении задачи:', err);
              throw err;
            }
          }
        
          async deleteTask(taskId) {
            try {
              await this._load({
                url: `task/${taskId}`,
                method: Method.DELETE,
              });
            } catch (err) {
              console.error('Ошибка при удалении задачи:', err);
              throw err;
            }
          }
        }
