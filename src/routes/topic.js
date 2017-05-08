import express from 'express';
import { topic } from '../controllers';

const router = express.Router();

router.post('/add', topic.add);
router.get('/load', topic.load);

export default router;
