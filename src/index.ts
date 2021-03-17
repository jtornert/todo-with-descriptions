import * as express from 'express';
import * as dotenv from 'dotenv';
import * as paths from './utils/paths';
import * as mongoose from 'mongoose';

import indexRouter from './controllers/index.router';
import apiV1Router from './controllers/api/api.v1.router';

dotenv.config();

mongoose
  .connect('mongodb://localhost:27017/users')
  .then(() => console.log('Connected to users database'))
  .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT ?? 80;

app.use(express.static(paths.root)); // serve static files like .html and .css
app.use(express.json()); // accept requests with json body
app.use(express.urlencoded({ extended: true })); // accept html form submissions

app.use('/', indexRouter);
app.use('/api', apiV1Router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
