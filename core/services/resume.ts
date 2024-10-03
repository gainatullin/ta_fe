import { request } from 'core/helpers';

const get = (data: any) => request({ url: '/resume/get', data });

const create = (data: any) => request({ url: '/resume/create', data });

const search = (data: any) => request({ url: '/resume/search', data });

const update = (data: any) => request({ url: '/resume/update', data });

export const ResumeServices = {
  get,
  create,
  search,
  update,
};
