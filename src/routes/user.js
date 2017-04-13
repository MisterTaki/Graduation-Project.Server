import express from 'express';
import { user } from '../controllers';

const router = express.Router();

router.post('/create', user.create);

export default router;
