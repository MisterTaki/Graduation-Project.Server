import express from 'express';
import { academy } from '../controllers';

const router = express.Router();

router.get('/load', academy.load);

export default router;
