import { Request, Response } from 'express';
import { uploadFileToR2, downloadFileFromR2 } from '../services/r2service';

const uploadFile = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return;
  }
  const { originalname, buffer, mimetype } = req.file;
  await uploadFileToR2(originalname, buffer, mimetype);
  res.status(200).send('File uploaded successfully');
};

const downloadFile = async (req: Request, res: Response): Promise<void> => {
  const { fileName } = req.params;
  try {
    const fileStream = await downloadFileFromR2(fileName);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    fileStream.pipe(res);
  } catch (error) {
    res.status(404).send('File not found');
  }
};

export { uploadFile, downloadFile };
