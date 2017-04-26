import express from 'express';
import { message } from '../controllers';

const router = express.Router();

router.get('/load', message.load);
router.post('/send', message.send);

export default router;
