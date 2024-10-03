import { request } from 'core/helpers';

const create = (data: any) => request({ url: '/links/create', data });

const remove = (data: any) => request({ url: '/links/remove', data });

const search = (data: any) => request({ url: '/links/search', data });

const update = (data: any) => request({ url: '/links/update', data });

export const LinksServices = {
  create,
  remove,
  search,
  update,
};
