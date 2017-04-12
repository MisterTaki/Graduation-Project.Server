import express from 'express';
import { user } from '../controllers';

const router = express.Router();

router.post('/register/:identity', user.register);

export default router;
