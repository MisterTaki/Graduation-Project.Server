import express from 'express';
import { group } from '../controllers';

const router = express.Router();

router.get('/load', group.load);

export default router;
