import * as express from 'express';
import * as mongoose from 'mongoose';
import indexRouter from './routes/index.router';
import todoRouter from './routes/todo.router';

export default class Server {
  app = express();
  port = 3000;
  root = `${__dirname}/../dist`;
  users = mongoose
    .connect('mongodb://localhost:27017/users', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to mongodb://users'));

  constructor() {
    this.app.use(express.static(this.root));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use('/', indexRouter(this));
    this.app.use('/api/todos', todoRouter(this));
  }

  start() {
    console.log(`Server listening on port ${this.port}`);
    this.app.listen(this.port);
  }
}
