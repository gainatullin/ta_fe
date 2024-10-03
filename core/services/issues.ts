import { request } from 'core/helpers';

const get = (data: any) => request({ url: '/issues/get', data });

const create = (data: any) => request({ url: '/issues/create', data });

const remove = (data: any) => request({ url: '/issues/remove', data });

const search = (data: any) => request({ url: '/issues/search', data });

const update = (data: any) => request({ url: '/issues/update', data });

export const IssuesServices = {
  get,
  create,
  remove,
  search,
  update,
};
