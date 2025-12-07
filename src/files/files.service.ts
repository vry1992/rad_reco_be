import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { dirname, join } from 'path';

@Injectable()
export class FilesService {
  getFilePath({
    networkId,
    detectionId,
    fileName,
  }: {
    networkId: string;
    detectionId: string;
    fileName: string;
  }) {
    const folderPath = join(
      __dirname,
      '..',
      '..',
      'uploads',
      networkId,
      detectionId,
      fileName,
    );
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(dirname(folderPath), { recursive: true });
    }

    return folderPath;
  }

  async save(file: Express.Multer.File, savePath: string) {
    fs.writeFileSync(savePath, file.buffer);
  }

  deleteFile(path: string) {
    const fullPath = join(__dirname, '..', '..', path);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
}
