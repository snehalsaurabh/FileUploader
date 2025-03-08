import { Router } from 'express';
import upload from '../utils/multerConfig';
import { uploadFile, downloadFile } from '../controllers/fileController';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:fileName', downloadFile);

export default router;