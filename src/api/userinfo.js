import request from '@/utils/request'

export function getUserinfoList(params) {
  return request({
    url: '/vue-admin-template/userinfo/list',
    method: 'get',
    params
  })
}

// export function deleteUserByList(id) {
//   return request({
//     url: 'sys/userinfo/deleteUserByList',
//     method: 'post',
//     id
//   })
// }
