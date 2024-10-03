import { request } from 'core/helpers';

const get = (data: any) => request({ url: '/projects/get', data });

const create = (data: any) => request({ url: '/projects/create', data });

const remove = (data: any) => request({ url: '/projects/remove', data });

const search = (data: any) => request({ url: '/projects/search', data });

const update = (data: any) => request({ url: '/projects/update', data });

const usersSearch = (data: any) => request({ url: '/projects/users/search', data });

const upload = (data: any) => request({ url: '/projects/upload', data });

const userAdd = (data: any) => request({ url: '/projects/user/add', data });

export const ProjectsServices = {
  get,
  create,
  remove,
  search,
  update,
  usersSearch,
  upload,
  userAdd,
};
