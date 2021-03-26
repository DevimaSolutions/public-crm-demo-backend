import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { errorMessages, multerConst } from '@constants';
import { ClientError } from '@models';

const storageConfig = multer.diskStorage({
  destination(
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    callback(null, path.resolve(__dirname, '../../uploads'));
  },
  filename(
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    callback(null, uuidv4() + path.extname(file.originalname));
  },
});

const customFileFilter = function (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
) {
  const extension = path.extname(file.originalname);

  // Getting file size from Express-Request headers
  const fileSize = Number(req.rawHeaders.slice(-1)[0]);

  if (!multerConst.allowedImageTypes.includes(extension)) {
    callback(new ClientError(errorMessages.wrongFileType));

    return;
  }

  if (fileSize > multerConst.sizeLimit) {
    callback(
      new ClientError(
        `File ${file.originalname} ${errorMessages.wrongFileSize}`,
      ),
    );

    return;
  }

  callback(null, true);
};

export default { storageConfig, customFileFilter };
