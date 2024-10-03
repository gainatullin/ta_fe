import { request } from 'core/helpers';

const create = (data: any) => request({ url: '/shortcuts/create', data });

const remove = (data: any) => request({ url: '/shortcuts/remove', data });

const update = (data: any) => request({ url: '/shortcuts/update', data });

const search = (data: any) => request({ url: '/shortcuts/search', data });

export const ShortcutsServices = {
  create,
  remove,
  search,
  update,
};
