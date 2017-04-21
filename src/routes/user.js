import express from 'express';
import { user } from '../controllers';

const router = express.Router();

router.post('/create', user.create);
router.post('/apply', user.apply);
router.post('/forget-pwd', user.forgetPwd);
router.post('/set-pwd', user.setPwd);

export default router;
