import { request } from 'core/helpers';
import { AuthenticationServices } from 'core/services/authentication';

const getById = (data: any) => request({ url: '/users/get', data });

const create = (data: any) => request({ url: '/users/create', data });

const search = (data: any) => request({ url: '/users/search', data });

const update = (data: any) => request({ url: '/users/update', data });

const upload = (data: any) => request({ url: '/users/upload', data });

const signUp = async (data: any) => {
  try {
    await create(data);
    return await AuthenticationServices.signIn(data);
  } catch (error: any) {
    throw error;
  }
};

export const UsersServices = {
  getById,
  create,
  search,
  update,
  upload,
  signUp,
};
