import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AppFile } from '../entity/File';
import { uploadFileToR2, downloadFileFromR2 } from '../services/r2service';

const uploadFile = async (req: Request, res: Response): Promise<void> => {
  console.log("uploadFile function being called");
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return;
  }
  const { originalname, buffer, mimetype, size } = req.file;
  const key = `${Date.now()}-${originalname}`;
  const url = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${key}`;

  await uploadFileToR2(key, buffer, mimetype);
  console.log("File Uploaded Successfully")
  const fileRepository = AppDataSource.getRepository(AppFile);
  const file = new AppFile();
  file.originalName = originalname;
  file.mimeType = mimetype;
  file.size = size;
  file.key = key;
  file.url = url;

  await fileRepository.save(file);
  
  res.status(200).json({ message: 'File uploaded successfully' });
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

const listFiles = async (req: Request, res: Response): Promise<void> => {
  const fileRepository = AppDataSource.getRepository(AppFile);
  const files = await fileRepository.find();
  res.json(files);
};

export { uploadFile, downloadFile, listFiles };