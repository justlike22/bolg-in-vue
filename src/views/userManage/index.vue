<template>
  <div>
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedUser" v-loading="formLoading" style="text-align: left">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="selectedUser.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户昵称" label-width="120px" prop="nickname">
          <el-input v-model="selectedUser.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="头像链接" label-width="120px" prop="avatarUrl">
          <el-input v-model="selectedUser.avatarUrl" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="selectedUser.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="selectedUser.password" autocomplete="off" />
          <!-- <el-button type="warning" @click="resetPassword(selectedUser.username)">重置密码</el-button> -->
        </el-form-item>
        <!-- <el-form-item label="角色分配" label-width="120px" prop="roles">
          <el-checkbox-group v-model="selectedRolesIds">
            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{ role.nameZh }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="角色编辑" :visible.sync="roleDialogVisible">
      <el-checkbox-group v-model="roles">
        <el-checkbox
          v-for="(item, index) in roleData"
          :key="index"
          :checked="isCheck[index]"
          :label="item.name"
        >{{ item.description }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitRoles(roles)">确 定</el-button>
      </div>
    </el-dialog>
    <add-user @onSubmit="listUsers()" />
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :max-height="tableHeight"
        :row-style="{height:'70px'}"
        :cell-style="{padding:'0px','text-align':'center'}"
        :header-cell-style="{'text-align':'center'}"
        stripe
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <!-- <el-table-column label="id" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column> -->
        <el-table-column label="头像" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" style="height: 50px;border-radius: 50%">
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.username }}</p>
          </template>
        </el-table-column>
        <el-table-column label="昵称" width="100">
          <template slot-scope="scope">
            <p>{{ scope.row.nickname }}</p>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="220">
          <template slot-scope="scope">
            <p>{{ scope.row.email }}</p>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => toggleStatus(value, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="角色" width="40">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="editRole(scope.row)">编辑角色</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="editUser(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import AddUser from './AddUser'
import { getCurrentTime } from '@/api/getCurrentTime'
export default {
  components: { AddUser },
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      users: [],
      roles: [],
      roleData: [],
      isCheck: [],
      dialogFormVisible: false,
      roleDialogVisible: false,
      selectedUser: [],
      selectedRolesIds: [],
      loading: true,
      formLoading: false
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 220
    }
  },
  mounted() {
    this.listUsers()
  },
  methods: {
    listUsers() {
      console.log(this)
      // var that = this
      axios.get('/sys/user/getUserList?pageSize=10&pageNumber=' + this.currentPage, {
        headers: {
          Authorization: 'admin' }
      }).then(resp => {
        this.loading = false
        if (resp && resp.data.code === 1) {
          this.tableData = resp.data.data.list
          this.total = resp.data.data.total
          this.tableData.forEach(element => {
            if (element.status === 1) {
              element.status = true
            } else {
              element.status = false
            }
          })
        } else {
          this.$message.error('失败')
        }
      })
    },
    editUser(user) {
      console.log(user)
      this.dialogFormVisible = true
      this.selectedUser = user
      console.log(this.selectedUser)
      // const roleIds = []
      // for (let i = 0; i < user.roles.length; i++) {
      //   roleIds.push(user.roles[i].id)
      // }
      // this.selectedRolesIds = roleIds
    },
    editRole(row) {
      // /sys/role/getRoleList  /sys/userRole/getRoleByUserId?pageNumber=0&pageSize=10&userId=' + row.id
      this.roleDialogVisible = true
      axios.get('http://swust.f3322.net:9001/sys/role/getRoleList?pageSize=100&pageNumber=1', {
        headers: {
          Authorization: 'admin'
        }
      }).then(response => {
        this.roleData = response.data.data.list
        axios.get('http://swust.f3322.net:9001/sys/userRole/getRoleByUserId?pageNumber=0&pageSize=10&userId=' + row.id, {
          headers: {
            Authorization: 'admin' }
        }).then(res => {
          let userRoleList = []
          userRoleList = response.data.data.list
          for (var i = 0; i < this.roleData.length; i++) {
            if (userRoleList[i].id === this.roleData[i].id) {
              this.isCheck.push(true)
            } else {
              this.isCheck.push(false)
            }
          }
          console.log(this.isCheck)
        })
      })
    },
    onSubmit(user) {
      this.formLoading = true
      const time = getCurrentTime()
      // const that = this
      // const userinfo = []
      axios.post('http://swust.f3322.net:9001/sys/user/updateUserInfo', {
        'id': user.id,
        'username': user.username,
        'nickname': user.nickname,
        'avatarUrl': user.avatarUrl,
        'email': user.email,
        'password': user.password,
        'gmtModify': time }, {
        headers: {
          Authorization: 'admin'
        }
      }).then(resp => {
        this.formLoading = false
        if (resp && resp.data.code === 1) {
          this.$message({
            message: '用户信息修改成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          // 修改角色后重新请求用户信息，实现视图更新
          this.listUsers()
        } else {
          this.$alert(resp.data.message)
        }
      })
      // 根据视图绑定的角色 id 向后端传送角色信息
      // const perms = []
      // for (let i = 0; i < that.selectedPermsIds.length; i++) {
      //   for (let j = 0; j < that.perms.length; j++) {
      //     if (that.selectedPermsIds[i] === that.perms[j].id) {
      //       perms.push(that.perms[j])
      //   }
      // }
      // }
    },
    onSubmitRoles(roles) {

    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const ids = []
        ids.push(row.id)
        axios.post('http://swust.f3322.net:9001/sys/user/deleteUserByList', ids, {
          headers: {
            Authorization: 'admin'
          }
        }).then(response => {
          console.log(response)
          if (response.data.code === 1) {
            this.listUsers()
            this.$message({
              message: '用户删除成功',
              type: 'success'
            })
          } else {
            this.$message.error('删除失败')
          }
        })
      })
    },
    toggleStatus(val, row) {
      const time = getCurrentTime()
      let changestatus = 0
      if (row.status) {
        changestatus = 1
      } else {
        changestatus = 0
      }
      axios.post('http://swust.f3322.net:9001/sys/user/updateUserInfo', {
        'id': row.id,
        'status': changestatus,
        'gmtModify': time
      }, {
        headers: {
          Authorization: 'admin'
        }
      }).then(response => {
        this.$message({
          message: '用户状态修改成功',
          type: 'success'
        })
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.listUsers(this.currentPage)
    }
  }
}
</script>
