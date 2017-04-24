import express from 'express';
import { notice } from '../controllers';

const router = express.Router();

router.post('/publish', notice.publish);
router.get('/load', notice.load);
router.delete('/remove', notice.remove);

export default router;
