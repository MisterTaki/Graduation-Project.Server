import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import systemRoutes from './system';
import academyRoutes from './academy';
import noticeRoutes from './notice';
import messageRoutes from './message';
import topicRoutes from './topic';
import volunteerRoutes from './volunteer';
import resourceRoutes from './resource';
import reportRoutes from './report';
import groupRoutes from './group';
import accountRoutes from './account';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/system', systemRoutes);
router.use('/academy', academyRoutes);
router.use('/notice', noticeRoutes);
router.use('/message', messageRoutes);
router.use('/topic', topicRoutes);
router.use('/volunteer', volunteerRoutes);
router.use('/resource', resourceRoutes);
router.use('/report', reportRoutes);
router.use('/group', groupRoutes);
router.use('/account', accountRoutes);

export default router;
