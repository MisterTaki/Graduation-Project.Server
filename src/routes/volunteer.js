import express from 'express';
import { volunteer } from '../controllers';

const router = express.Router();

router.get('/load', volunteer.load);
router.post('/choose', volunteer.choose);
router.post('/refuse', volunteer.refuse);

export default router;
