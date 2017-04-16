import express from 'express';
import { auth } from '../controllers';

const router = express.Router();

router.post('/login', auth.login);
router.get('/load', auth.load);

export default router;
