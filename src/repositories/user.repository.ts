import { IUser } from '@interfaces';
import { userModel } from '@models';
import { getPaginationValue } from '@utils';

const getById = (id: string) => userModel.findById(id);

const create = (user: IUser) => userModel.create(user);

const getByEmail = (email: string) =>
  userModel.findOne({ email }).select('+password');

const getAllUsers = (filter: object = {}, page = 0, limit = 0) =>
  userModel.paginate(filter, getPaginationValue(page, limit));

const updateById = (id: string, data: any) =>
  userModel.updateOne({ _id: id }, data);

const deleteById = (id: string) => userModel.deleteOne({ _id: id });

export default {
  getById,
  create,
  getByEmail,
  getAllUsers,
  updateById,
  deleteById,
};
