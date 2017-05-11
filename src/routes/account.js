import express from 'express';
import { account } from '../controllers';

const router = express.Router();

router.get('/load', account.load);
router.post('/modify', account.modify);

export default router;
