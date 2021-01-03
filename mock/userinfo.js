const Mock = require('mockjs')

const data = Mock.mock({
  'list|10': [{
    id: '@id',
    username: '@name',
    nickname: '@cname',
    avatarUrl: '@url',
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
  }
]
