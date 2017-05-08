import express from 'express';
import { volunteer } from '../controllers';

const router = express.Router();

router.get('/load', volunteer.load);

export default router;
