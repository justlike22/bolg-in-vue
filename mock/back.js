// const Mock = require('mockjs')

// const data = Mock.mock({
//   'list|30': [{
//     id: '@id',
//     username: '@name',
//     nickname: '@cname',
//     avatarUrl: '@url',
//     website: '@url',
//     email: '@email',
//     status: '1',
//     gmtCreate: '@datetime',
//     gmtModify: '@datetime'
//   }]
// })
// module.exports = [
//   {
//     url: '/vue-admin-template/userinfo/list',
//     type: 'get',
//     response: config => {
//       const list = data.list
//       return {
//         success: true,
//         code: 1,
//         msg: '成功',
//         data: {
//           id: 1,
//           username: list.username,
//           nickname: list.nickname,
//           avatarUrl: list.avatarUrl,
//           website: list.website,
//           email: list.email,
//           status: 1,
//           gmtCreate: list.gmtCreate,
//           gmtModify: list.gmtModify,
//           total: list.length
//         }
//       }
//     }
//   }
// ]
