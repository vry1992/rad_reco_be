import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { dirname, join } from 'path';

@Injectable()
export class FilesService {
  getFilePath(fileName: string, folders: string[]) {
    const folderPath = join(
      __dirname,
      '..',
      '..',
      'uploads',
      ...folders,
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
    if (fs.existsSync(path)) {
      const isFile = fs.lstatSync(path).isFile();

      if (isFile) {
        fs.unlinkSync(path);
      }

      const isDir = fs.lstatSync(path).isDirectory();

      if (isDir) {
        fs.rmSync(path, { recursive: true });
      }
    }
  }
}
