<template>
  <div>
    <el-dialog
      title="修改权限信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedRole" style="text-align: left">
        <el-form-item label="权限名" label-width="120px" prop="username">
          <el-input v-model="selectedRole.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="name">
          <el-input v-model="selectedRole.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限代码" label-width="120px" prop="name">
          <el-input v-model="selectedRole.code" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedRole)">确 定</el-button>
      </div>
    </el-dialog>
    <add-permission @onSubmit="listRoles()" />
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table :data="tableData" style="width: 100%" :max-height="tableHeight">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column label="id" width="160">
          <template slot-scope="scope">
            <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column>
        <el-table-column label="name" width="160">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column label="权限代码" width="220">
          <template slot-scope="scope">
            <p>{{ scope.row.code }}</p>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
import AddPermission from './AddPermission'
import { getPermissionList } from '@/api/permission'
export default {
  components: { AddPermission },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      roles: [],
      perms: [],
      menus: [],
      selectedRole: [],
      selectedPermsIds: [],
      selectedMenusIds: []
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 180
    }
  },
  mounted() {
    getPermissionList().then(response => {
      console.log(response)
      this.tableData = response.data
      this.total = response.total
    })
  },
  methods: {
    handleEdit(index, role) {
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
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.tableData.splice(index, 1) // 静态将数组删除，不涉及数据库
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        console.log(row.id)
      })
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>
