import * as express from 'express';
import Server from '../Server';
import Todo from '../models/Todo';

export default function config(app: Server) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  });

  router.post('/', async (req, res) => {
    const todo = new Todo({
      title: req.body.title
    });
    const saved = await todo.save();
    res.json(saved);
  });

  router.patch('/:id', async (req, res) => {
    const result = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Received update!', update: req.body, result: result });
  });

  router.delete('/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.send(result);
  });

  return router;
}
