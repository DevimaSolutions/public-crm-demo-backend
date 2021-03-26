import { MongoError } from 'mongodb';

const isDuplicateMongoError = (error: any) =>
  error instanceof MongoError && error.code === 11000;

export default isDuplicateMongoError;
