import { request } from 'core/helpers';

const create = (data: any) => request({ url: '/comments/create', data });

const remove = (data: any) => request({ url: '/comments/remove', data });

const search = (data: any) => request({ url: '/comments/search', data });

const update = (data: any) => request({ url: '/comments/update', data });

export const CommentsServices = {
  create,
  remove,
  search,
  update,
};
