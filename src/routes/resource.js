import express from 'express';
import { resource } from '../controllers';

const router = express.Router();

router.post('/upload', resource.upload);

export default router;
