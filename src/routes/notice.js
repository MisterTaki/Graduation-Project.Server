import express from 'express';
import { notice } from '../controllers';

const router = express.Router();

router.post('/publish', notice.publish);

export default router;
