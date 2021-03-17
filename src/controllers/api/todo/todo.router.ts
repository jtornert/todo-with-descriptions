import * as express from 'express';
import * as TodoService from './todo.service';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await TodoService.findAll();
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await TodoService.create(req.body.title);
  res.json(result);
});

router.patch('/:id', async (req, res) => {
  const result = await TodoService.update(req.params.id, req.body);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await TodoService.remove(req.params.id);
  res.send(result);
});

export default router;
