// /api/course.js(接口的定义)
import request from '@/utils/request'
export function getUserinfoList(params) {
  return request({
    url: '/vue-admin-template/userinfo/list',
    method: 'get',
    params
  })
}
