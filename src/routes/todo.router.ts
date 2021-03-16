import * as express from 'express';
import Todo from '../models/Todo';

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
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.send(result);
});

export default router;
