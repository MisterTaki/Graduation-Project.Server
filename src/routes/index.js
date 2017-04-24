import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import systemRoutes from './system';
import academyRoutes from './academy';
import noticeRoutes from './notice';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/system', systemRoutes);
router.use('/academy', academyRoutes);
router.use('/notice', noticeRoutes);

export default router;
