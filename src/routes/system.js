import express from 'express';
import { system } from '../controllers';

const router = express.Router();

router.get('/load', system.load);

export default router;
