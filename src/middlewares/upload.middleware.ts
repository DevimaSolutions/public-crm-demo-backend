import multer from 'multer';

import { multerConfigs } from '@configs';

const upload = multer({
  storage: multerConfigs.storageConfig,
  fileFilter: multerConfigs.customFileFilter,
});

export default upload;
