import Router from 'next/router';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { getAvatarSrc } from 'core/helpers';
import { AuthenticationServices } from 'core/services';
import { TAppDispatch } from 'core/store';
import { EGetSelfType, TUser } from 'core/types';

export const getSelf = createAsyncThunk<any, EGetSelfType>(
  'session/getSelf',
  async (getSelfType, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user: TUser = await AuthenticationServices.getSelf();
        user.avatarSrc = getAvatarSrc('users', user.id);
        return { user, getSelfType };
      } catch (error) {
        localStorage.removeItem('token');
        return rejectWithValue(error);
      }
    } else {
      return rejectWithValue(null);
    }
  },
);

export const loginSuccess = (token: string) => (dispatch: TAppDispatch) => {
  localStorage.setItem('token', token);
  dispatch(getSelf(EGetSelfType.SIGN_IN));
};

export const selfUpdate = () => (dispatch: TAppDispatch) => {
  dispatch(getSelf(EGetSelfType.UPDATE));
};

export const logout = () => (dispatch: TAppDispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'session/logout' });
  Router.push('/');
};
