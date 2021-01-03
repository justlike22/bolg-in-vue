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
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="id"
          width="100"
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
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div> -->
    </el-card>
  </div>
</template>

<script>
import RoleCreate from './RoleCreate'
import { getRolesList } from '@/api/roles'
export default {
  name: 'UserRole',
  components: { RoleCreate },
  data() {
    return {
      dialogFormVisible: false,
      roles: [],
      perms: [],
      menus: [],
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
      return window.innerHeight - 320
    }
  },
  mounted() {
    // this.listRoles()
    // this.listPerms()
    // this.listMenus()
    getRolesList().then(response => {
      console.log(response)
      this.roles = response.data
      this.total = response.total
    })
  },
  methods: {
    listRoles() {
      // var _this = this
      // this.$axios.get('/admin/role').then(resp => {
      //   if (resp && resp.status === 200) {
      //     _this.roles = resp.data.result
      //   }
      // })
    },
    // listPerms() {
    //   var _this = this
    //   this.$axios.get('/admin/role/perm').then(resp => {
    //     if (resp && resp.data.code === 200) {
    //       _this.perms = resp.data.result
    //     }
    //   })
    // },
    // listMenus() {
    //   var _this = this
    //   this.$axios.get('/admin/role/menu').then(resp => {
    //     if (resp && resp.data.code === 200) {
    //       _this.menus = resp.data.result
    //     }
    //   })
    // },
    // commitStatusChange(value, role) {
    //   if (role.id !== 1) {
    //     this.$confirm('是否更改角色状态？', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       this.$axios.put('/admin/role/status', {
    //         enabled: value,
    //         id: role.id
    //       }).then(resp => {
    //         if (resp && resp.data.code === 200) {
    //           if (value) {
    //             this.$message('角色 [' + role.nameZh + '] 已启用')
    //           } else {
    //             this.$message('角色 [' + role.nameZh + '] 已禁用')
    //           }
    //         }
    //       })
    //     }).catch(() => {
    //       role.enabled = !role.enabled
    //       this.$message({
    //         type: 'info',
    //         message: '已取消'
    //       })
    //     })
    //   } else {
    //     role.enabled = true
    //     this.$alert('无法禁用系统管理员！')
    //   }
    // },
    editRole(role) {
      this.dialogFormVisible = true
      this.selectedRole = role
      const permIds = []
      for (let i = 0; i < role.perms.length; i++) {
        permIds.push(role.perms[i].id)
      }
      this.selectedPermsIds = permIds
      const menuIds = []
      for (let i = 0; i < role.menus.length; i++) {
        menuIds.push(role.menus[i].id)
        for (let j = 0; j < role.menus[i].children.length; j++) {
          menuIds.push(role.menus[i].children[j].id)
        }
      }
      this.selectedMenusIds = menuIds
      // 判断树是否已经加载，第一次打开对话框前树不存在，会报错。所以需要设置 default-checked
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(menuIds)
      }
    }
    // onSubmit(role) {
    //   const _this = this
    //   // 根据视图绑定的角色 id 向后端传送角色信息
    //   const perms = []
    //   for (let i = 0; i < _this.selectedPermsIds.length; i++) {
    //     for (let j = 0; j < _this.perms.length; j++) {
    //       if (_this.selectedPermsIds[i] === _this.perms[j].id) {
    //         perms.push(_this.perms[j])
    //       }
    //     }
    //   }
    //   this.$axios.put('/admin/role', {
    //     id: role.id,
    //     name: role.name,
    //     nameZh: role.nameZh,
    //     enabled: role.enabled,
    //     perms: perms
    //   }).then(resp => {
    //     if (resp && resp.data.code === 200) {
    //       this.$alert(resp.data.result)
    //       this.dialogFormVisible = false
    //       this.listRoles()
    //     }
    //   })
    //   this.$axios.put('/admin/role/menu?rid=' + role.id, {
    //     menusIds: this.$refs.tree.getCheckedKeys()
    //   }).then(resp => {
    //     if (resp && resp.data.code === 200) {
    //       console.log(resp.data.result)
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
  .add-button {
    float: left;
    margin: 18px 0 18px 10px;
  }
</style>
