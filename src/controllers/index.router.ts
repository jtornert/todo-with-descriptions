import * as express from 'express';
import * as paths from '../utils/paths';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: paths.root });
});

export default router;
