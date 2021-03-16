import * as express from 'express';
import * as mongoose from 'mongoose';
import indexRouter from './routes/index.router';
import todoRouter from './routes/todo.router';

export default class Server {
  static root = `${__dirname}/../dist`;
  app = express();
  port = 3000;
  users = mongoose
    .connect('mongodb://localhost:27017/users', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connected to mongodb://users'));

  constructor() {
    this.app.use(express.static(Server.root));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use('/', indexRouter);
    this.app.use('/api/todos', todoRouter);
  }

  start() {
    console.log(`Server listening on port ${this.port}`);
    this.app.listen(this.port);
  }
}
