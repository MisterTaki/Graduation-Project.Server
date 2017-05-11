import express from 'express';
import { report } from '../controllers';

const router = express.Router();

router.get('/load', report.load);
router.post('/upload', report.upload);
router.get('/download', report.download);

export default router;
