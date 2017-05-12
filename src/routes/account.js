import express from 'express';
import { account } from '../controllers';

const router = express.Router();

router.post('/create', account.create);
router.get('/load', account.load);
router.post('/modify', account.modify);
router.delete('/delete', account.remove);

export default router;
