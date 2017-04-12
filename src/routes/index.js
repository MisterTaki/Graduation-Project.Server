import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
