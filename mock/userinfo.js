const Mock = require('mockjs')

const data = Mock.mock({
  'list|6': [{
    id: '@id',
    username: '@name',
    nickname: '@cname',
    avatarUrl: Mock.Random.image('50x50'),
    website: '@url',
    email: '@email',
    'status|1': true,
    gmtCreate: '@datetime',
    gmtModify: '@datetime'
  }]
})
module.exports = [
  {
    url: '/vue-admin-template/userinfo/list',
    type: 'get',
    response: config => {
      const list = data.list
      return {
        success: true,
        code: 20000,
        pagesize: 10,
        currentPage1: 1,
        msg: '成功',
        data: list,
        total: list.length
      }
    }
  },
  {
    url: 'sys/userinfo/deleteUserByList',
    type: 'post',
    response: config => {
      return {
        success: true,
        code: 20000,
        msg: '成功'
      }
    }
  }
]
