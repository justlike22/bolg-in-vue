import request from '@/utils/request'

export function getRolesList(params) {
  return request({
    url: '/vue-admin-template/roles/list',
    method: 'get',
    params
  })
}
