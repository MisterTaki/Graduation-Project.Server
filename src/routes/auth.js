import express from 'express';
import { auth } from '../controllers';

const router = express.Router();

router.post('/login', auth.login);

export default router;
