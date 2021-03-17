import { UpdateQuery } from 'mongoose';
import Todo from '../../../models/Todo';

export async function findAll() {
  return Todo.find();
}

export async function create(title: string) {
  const todo = new Todo({
    title: title
  });
  return todo.save();
}

export async function update(id: string, updates: UpdateQuery<any>) {
  return Todo.findByIdAndUpdate(id, updates, {
    useFindAndModify: false
  });
}

export async function remove(id: string) {
  return Todo.findByIdAndDelete(id, {
    useFindAndModify: false
  });
}
