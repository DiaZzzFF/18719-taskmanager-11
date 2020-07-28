import Task from "./models/task.js";


const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;

  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getTasks() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/task-manager/tasks`, {headers})
      .then(checkStatus)
      .then((response) => response.json())
      .then(Task.parseTasks);
  }

  updateTask(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/task-manager/tasks/${id}`, {
      method: `PUT`,
      body: JSON.stringify(data),
      headers,
    })
      .then(checkStatus)
      .then((response) => response.json())
      .then(Task.parseTasks);
  }
};

export default API;
