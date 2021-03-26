declare module 'mongoose-paginate-v2' {
  import mongoose = require('mongoose');
  declare function _<T extends mongoose.Document>(
    schema: mongoose.Schema<T, Model<T, {}>>,
  ): void;
  export = _;
}
