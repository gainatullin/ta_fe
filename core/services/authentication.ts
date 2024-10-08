import { request } from 'core/helpers';

const signIn = (data: any) => request({ url: '/authentication/signIn', data });

const getSelf = () => request({ url: '/authentication/getSelf' });

const signOut = () => request({ url: '/authentication/signOut' });

export const AuthenticationServices = {
  signIn,
  getSelf,
  signOut,
};
