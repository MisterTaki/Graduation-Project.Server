import express from 'express';
import { system } from '../controllers';

const router = express.Router();

router.get('/load', system.load);
router.post('/modify', system.modify);

export default router;
