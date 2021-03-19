import Todo from './Todo';

let todos = [];
let memory = '';

const todoInput: HTMLInputElement = document.getElementById('todo-input');
todoInput.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    addItem(todoInput.value);
    todoInput.value = '';
  }
});

const todoAdd = document.getElementById('todo-add');
todoAdd.addEventListener('click', (event) => {
  addItem(todoInput.value);
  todoInput.value = '';
});

const todoDisplayCompleted: HTMLInputElement = document.getElementById(
  'todo-display-completed'
);
todoDisplayCompleted.addEventListener('click', () => {
  todoDisplayCompleted.checked
    ? render(todos)
    : render(
        todos.filter((value, index, array) => {
          return !value.classList.contains('completed');
        })
      );
});

const todoList = document.getElementById('todo-list');

export async function init() {
  await refresh();
  todoDisplayCompleted.checked
    ? render(todos)
    : render(
        todos.filter((value, index, array) => {
          return !value.classList.contains('completed');
        })
      );
}

export async function refresh() {
  return fetch('/api/todos')
    .then((response) => response.json())
    .then((result) => {
      result.forEach((element) => {
        const node = Todo(element);
        todos.push(node);
      });
    });
}

export async function render(list: any[]) {
  todoList.innerHTML = '';
  list.forEach((element) => {
    todoList.appendChild(element);
  });
}

export function temp(content?: string) {
  if (content !== undefined) memory = content;
  else return memory;
}

export function is(options: { showCompleted?: any }) {
  if (options.showCompleted !== undefined)
    return todoDisplayCompleted.checked == options.showCompleted;
}

async function addItem(title: string) {
  if (title.length == 0) return;
  return fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title: title }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json())
    .then((result) => {
      document.body.appendChild(Todo(result));
      console.log(result);
    });
}

export async function updateItem(attributes) {
  return fetch(`/api/todos/${attributes.id}`, {
    method: 'PATCH',
    body: JSON.stringify(attributes),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
}

export async function deleteItem(todoItem: HTMLDivElement) {
  return fetch(`/api/todos/${todoItem.id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json())
    .then((result) => {
      todos = todos.filter((value, index, array) => {
        return value.id != todoItem.id;
      });
      todoItem.remove();
    });
}
