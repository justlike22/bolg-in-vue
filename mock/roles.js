const Mock = require('mockjs')

const data = Mock.mock({
  'list|5': [{
    id: '@id',
    name: '@cname',
    description: '@csentence(5)',
    gmtCreate: '@datetime',
    gmtModify: '@datetime'
  }]
})
module.exports = [
  {
    url: '/vue-admin-template/roles/list',
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
