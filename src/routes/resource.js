import express from 'express';
import { resource } from '../controllers';

const router = express.Router();

router.get('/load', resource.load);
router.post('/upload', resource.upload);
router.get('/download', resource.download);

export default router;
