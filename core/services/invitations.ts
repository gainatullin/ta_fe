import { request } from 'core/helpers';

const get = (data: any) => request({ url: '/invitations/get', data });

const create = (data: any) => request({ url: '/invitations/create', data });

const search = (data: any) => request({ url: '/invitations/search', data });

const confirm = (data: any) => request({ url: '/invitations/confirm', data });

export const InvitationsServices = {
  get,
  create,
  search,
  confirm,
};
