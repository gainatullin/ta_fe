import { request } from 'core/helpers';

const getById = (data: any) => request({ url: '/workspaces/get', data });

const create = (data: any) => request({ url: '/workspaces/create', data });

const remove = (data: any) => request({ url: '/workspaces/remove', data });

const search = (data: any) => request({ url: '/workspaces/search', data });

const usersSearch = (data: any) => request({ url: '/workspaces/users/search', data });

export const WorkspacesServices = {
  getById,
  create,
  remove,
  search,
  usersSearch,
};
