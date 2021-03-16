let memory = '';
const todoInput: HTMLInputElement = document.getElementById('todo-input');
todoInput.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    addItem(todoInput.value);
    todoInput.value = '';
  }
});
const todoAdd: HTMLButtonElement = document.getElementById('todo-add');
todoAdd.addEventListener('click', (event) => {
  addItem(todoInput.value);
  todoInput.value = '';
});

export function refresh() {
  fetch('/api/todos')
    .then((todos) => todos.json())
    .then((result) => {
      result.forEach((element) => {
        document.body.appendChild(from(element));
      });
    });
}

function addItem(title: string) {
  fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ title: title }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json())
    .then((result) => document.body.appendChild(from(result)));
}

function updateItem(attributes) {
  fetch(`/api/todos/${attributes.id}`, {
    method: 'PATCH',
    body: JSON.stringify(attributes),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
}

function deleteItem(todoItem: HTMLDivElement) {
  console.log(`Deleted: ${todoItem.id}`);
  fetch(`/api/todos/${todoItem.id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json())
    .then((result) => todoItem.remove());
}

/**
 * Returns a Todo component.
 */
export function from(element): HTMLDivElement {
  const root = document.createElement('div');
  root.classList.add('container', 'todo-item');
  if (element.completed) root.classList.add('completed');
  root.id = element._id;

  const contentNode = document.createElement('div');
  contentNode.classList.add('todo-content');
  root.appendChild(contentNode);

  const titleNode = document.createElement('span');
  titleNode.classList.add('todo-title');
  titleNode.contentEditable = 'true';
  titleNode.innerText = element.title;
  titleNode.addEventListener('focusin', () => {
    memory = titleNode.innerText;
  });
  titleNode.addEventListener('focusout', () => {
    if (titleNode.innerText != memory)
      updateItem({ id: root.id, title: titleNode.innerText });
  });
  contentNode.appendChild(titleNode);

  const descriptionNode = document.createElement('span');
  descriptionNode.classList.add('todo-description');
  descriptionNode.contentEditable = 'true';
  descriptionNode.innerText =
    element.description !== undefined ? element.description : '';
  descriptionNode.addEventListener('focusin', () => {
    memory = descriptionNode.innerText;
  });
  descriptionNode.addEventListener('focusout', () => {
    if (descriptionNode.innerText != memory)
      updateItem({
        id: root.id,
        description: descriptionNode.innerText
      });
  });
  contentNode.appendChild(descriptionNode);

  const buttonCheck = document.createElement('button');
  buttonCheck.classList.add('button', 'todo-check');
  buttonCheck.innerHTML = '&#10003; Complete';
  buttonCheck.addEventListener('click', () => {
    root.classList.toggle('completed');
    const completed = root.classList.contains('completed') ? true : false;
    updateItem({ id: root.id, completed: completed });
  });
  contentNode.appendChild(buttonCheck);

  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('button', 'todo-delete');
  buttonDelete.innerHTML = '&#10005;';
  buttonDelete.addEventListener('click', () => {
    deleteItem(root);
  });
  contentNode.appendChild(buttonDelete);

  return root;
}
