import express from 'express';
import { system } from '../controllers';

const router = express.Router();

router.get('/status', system.getStatus);

export default router;
