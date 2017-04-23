import express from 'express';
import { user } from '../controllers';

const router = express.Router();

router.get('/load', user.load);
router.post('/create', user.create);
router.post('/apply', user.apply);
router.post('/forget-pwd', user.forgetPwd);
router.post('/set-pwd', user.setPwd);
router.post('/modify-pwd', user.modifyPwd);

export default router;
