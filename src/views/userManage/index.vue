<template>
  <div>
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedUser" style="text-align: left">
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
    <add-user @onSubmit="listRoles()" />
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="tableData"
        style="width: 100%"
        :max-height="tableHeight"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column label="id" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="80">
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl">
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
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="editUser(scope.row)">编辑</el-button>
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
// import axios from 'axios'
import AddUser from './AddUser'
import { getUserinfoList } from '@/api/userinfo'
export default {
  components: { AddUser },
  data() {
    return {
      currentPage: 1,
      total: 0,
      tableData: [],
      users: [],
      roles: [],
      dialogFormVisible: false,
      selectedUser: [],
      selectedRolesIds: []
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 220
    }
  },
  mounted() {
    getUserinfoList().then(response => {
      console.log(response)
      this.tableData = response.data
      this.total = response.total
    })
  },
  methods: {
    handleEdit(index, row) {
    },
    editUser(user) {
      console.log(user)
      this.dialogFormVisible = true
      this.selectedUser = user
      // const roleIds = []
      // for (let i = 0; i < user.roles.length; i++) {
      //   roleIds.push(user.roles[i].id)
      // }
      // this.selectedRolesIds = roleIds
    },
    onSubmit(role) {
      const _this = this
      // 根据视图绑定的角色 id 向后端传送角色信息
      const perms = []
      for (let i = 0; i < _this.selectedPermsIds.length; i++) {
        for (let j = 0; j < _this.perms.length; j++) {
          if (_this.selectedPermsIds[i] === _this.perms[j].id) {
            perms.push(_this.perms[j])
          }
        }
      }
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        console.log(row.id)
        // deleteUserByList(row).then(response => {
        //   this.tableData.splice(index, 1) // 静态将数组删除，不涉及数据库
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   })
        // })
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
