import { ISignIn, ISignUp } from './../interfaces/index';
import rest from './axios';

const signIn = (data: ISignIn) => {
  return rest.request({
    method: 'post',
    url: '/signin',
    data
  });
};

const signUp = (data: ISignUp) => {
  return rest.request({
    method: 'post',
    url: '/user/register',
    data
  });
};

const changePassword = (data) => {
  return rest.request({
    method: 'post',
    url: '/auth/password/reset',
    data
  });
}

export default {
  signIn,
  signUp,
  changePassword
}
