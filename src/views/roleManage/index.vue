<template>
  <div>
    <el-dialog
      title="修改角色信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedRole" style="text-align: left">
        <el-form-item label="角色名" label-width="120px" prop="username">
          <el-input v-model="selectedRole.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="name">
          <el-input v-model="selectedRole.description" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="功能配置" label-width="120px" prop="perms">
          <el-checkbox-group v-model="selectedPermsIds">
            <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{ perm.desc_ }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            ref="tree"
            :data="menus"
            :props="props"
            show-checkbox
            :default-checked-keys="selectedMenusIds"
            node-key="id"
          />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedRole)">确 定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0px 0px 18px " />
    <role-create @onSubmit="listRoles()" />
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="roles"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
        :row-style="{height:'70px'}"
        :cell-style="{padding:'0px','text-align':'center'}"
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="id"
          width="180"
        />
        <el-table-column
          prop="name"
          label="角色名"
          fit
        />
        <el-table-column
          prop="description"
          label="角色描述"
          fit
        />
        <el-table-column
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editRole(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
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
      <!-- <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div> -->
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import RoleCreate from './RoleCreate'
import { getCurrentTime } from '@/api/getCurrentTime'
export default {
  name: 'UserRole',
  components: { RoleCreate },
  data() {
    return {
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      roles: [],
      selectedRole: [],
      selectedPermsIds: [],
      selectedMenusIds: [],
      props: {
        id: 'id',
        label: 'nameZh',
        children: 'children'
      }
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 240
    }
  },
  mounted() {
    this.listRoles()
  },
  methods: {
    listRoles() {
      console.log(this)
      // var that = this
      axios.get('http://swust.f3322.net:9001/sys/role/getRoleList?pageSize=10&pageNumber=' + this.currentPage, {
        headers: {
          Authorization: 'admin' }
      }).then(resp => {
        if (resp && resp.data.code === 1) {
          this.roles = resp.data.data.list
          this.total = resp.data.data.total
        } else {
          this.$message.error('失败')
        }
      })
    },
    editRole(role) {
      this.dialogFormVisible = true
      this.selectedRole = role
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
        axios.post('http://swust.f3322.net:9001/sys/role/deleteRoleByList', ids, {
          headers: {
            Authorization: 'admin'
          }
        }).then(response => {
          console.log(response)
          if (response.data.code === 1) {
            this.listRoles()
            this.$message({
              message: '角色删除成功',
              type: 'success'
            })
          } else {
            this.$message.error('删除失败')
          }
        })
      })
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    onSubmit(role) {
      const time = getCurrentTime()
      // const that = this
      axios.post('http://swust.f3322.net:9001/sys/permission/updatePermission', {
        'id': role.id,
        'name': role.name,
        'description': role.description,
        'gmtModify': time }, {
        headers: {
          Authorization: 'admin'
        }
      }).then(resp => {
        if (resp && resp.data.code === 1) {
          this.$message({
            message: '角色修改成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.listRoles()
        } else {
          this.$alert(resp.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .add-button {
    float: left;
    margin: 18px 0 18px 10px;
  }
</style>
