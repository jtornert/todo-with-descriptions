import * as express from 'express';
import Server from '../Server';

export default function config(app: Server) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.sendFile('index.html', { root: app.root });
  });

  return router;
}
