import * as TodoListImpl from './TodoList.impl';

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function (element: Todo): HTMLDivElement {
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
    TodoListImpl.temp(titleNode.innerText);
  });
  titleNode.addEventListener('focusout', () => {
    if (titleNode.innerText != TodoListImpl.temp())
      TodoListImpl.updateItem({ id: root.id, title: titleNode.innerText });
  });
  contentNode.appendChild(titleNode);

  const descriptionNode = document.createElement('span');
  descriptionNode.classList.add('todo-description');
  descriptionNode.contentEditable = 'true';
  descriptionNode.innerText =
    element.description !== undefined ? element.description : '';
  descriptionNode.addEventListener('focusin', () => {
    TodoListImpl.temp(descriptionNode.innerText);
  });
  descriptionNode.addEventListener('focusout', () => {
    if (descriptionNode.innerText != TodoListImpl.temp())
      TodoListImpl.updateItem({
        id: root.id,
        description: descriptionNode.innerText
      });
  });
  contentNode.appendChild(descriptionNode);

  const buttonCheck = document.createElement('button');
  buttonCheck.classList.add('button', 'todo-check');
  buttonCheck.style.color = 'mediumseagreen';
  buttonCheck.innerHTML = element.completed
    ? '<i class="fas fa-check-circle"/>'
    : '<i class="far fa-check-circle"/>';
  buttonCheck.addEventListener('click', () => {
    root.classList.toggle('completed');
    const completed = root.classList.contains('completed');
    TodoListImpl.updateItem({ id: root.id, completed: completed });
    if (completed) {
      if (TodoListImpl.is({ showCompleted: false })) root.remove();
      else {
        buttonCheck.innerHTML = '<i class="fas fa-check-circle"/>';
      }
    } else {
      buttonCheck.innerHTML = '<i class="far fa-check-circle"/>';
    }
  });
  contentNode.appendChild(buttonCheck);

  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('button', 'todo-delete');
  buttonDelete.innerHTML = '<i class="fas fa-times-circle"/>';
  buttonDelete.style.color = 'crimson';
  buttonDelete.addEventListener('click', () => {
    TodoListImpl.deleteItem(root);
  });
  contentNode.appendChild(buttonDelete);

  return root;
}
