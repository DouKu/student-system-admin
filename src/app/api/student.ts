import rest from './axios';

const getStuedents = () => {
  return rest.request({
    method: 'get',
    url: `/auth/users`,
  })
}

export default {
  getStuedents
}