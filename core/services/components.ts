import { request } from 'core/helpers';

const create = (data: any) => request({ url: '/components/create', data });

const remove = (data: any) => request({ url: '/components/remove', data });

const search = (data: any) => request({ url: '/components/search', data });

const update = (data: any) => request({ url: '/components/update', data });

export const ComponentServices = {
  create,
  remove,
  search,
  update,
};
