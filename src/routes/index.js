import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import systemRoutes from './system';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/system', systemRoutes);

export default router;
