import * as express from 'express';
import Server from '../Server';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: Server.root });
});

export default router;
