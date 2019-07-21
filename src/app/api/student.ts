import rest from './axios';

const getStuedents = ({ query }) => {
  return rest.request({
    method: 'get',
    url: `/auth/users`,
    params: query
  })
}

const putStudent = ({ data }) => {
  data.second_subject = data.second_subject.join(',');
  return rest.request({
    method: 'put',
    url: `/auth/user`,
    data
  });
}

const postStudent = ({ data }) => {
  data.second_subject = data.second_subject.join(',');
  return rest.request({
    method: 'post',
    url: `/auth/user`,
    data
  })
}

const delStudent = ({ data }) => {
  return rest.request({
    method: 'delete',
    url: `/auth/user`,
    data
  })
}

const switchChoose = ({ data }) => {
  return rest.request({
    method: 'post',
    url: `/auth/switch/choose`,
    data
  })
}

export default {
  getStuedents,
  putStudent,
  postStudent,
  delStudent,
  switchChoose
}