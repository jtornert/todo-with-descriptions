import * as express from 'express';
import todoRouter from './todo/todo.router';

const router = express.Router();

router.use('/todos', todoRouter);

export default router;
