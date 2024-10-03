import { request } from 'core/helpers';

const get = (data: any) => request({ url: '/documents/get', data });

const create = (data: any) => request({ url: '/documents/create', data });

const remove = (data: any) => request({ url: '/documents/remove', data });

const update = (data: any) => request({ url: '/documents/update', data });

const search = (data: any) => request({ url: '/documents/search', data });

export const DocumentsServices = {
  get,
  create,
  remove,
  search,
  update,
};
