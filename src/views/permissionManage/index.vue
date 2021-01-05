<template>
  <div>
    <el-dialog
      title="修改权限信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="dataForm" v-model="selectedPermission" v-loading="formLoading" style="text-align: left">
        <el-form-item label="权限名" label-width="120px" prop="username">
          <el-input v-model="selectedPermission.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="name">
          <el-input v-model="selectedPermission.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限代码" label-width="120px" prop="name">
          <el-input v-model="selectedPermission.code" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedPermission)">确 定</el-button>
      </div>
    </el-dialog>
    <add-permission @onSubmit="getPermissionList()" />
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :max-height="tableHeight"
        stripe
        :row-style="{height:'70px'}"
        :cell-style="{padding:'0px','text-align':'center'}"
        :header-cell-style="{'text-align':'center'}"
      >
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
import axios from 'axios'
import AddPermission from './AddPermission'
import { getCurrentTime } from '@/api/getCurrentTime'
export default {
  components: { AddPermission },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      selectedPermission: [],
      loading: true,
      formLoading: false
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 180
    }
  },
  mounted() {
    this.getPermissionList()
  },
  methods: {
    getPermissionList() {
      console.log(this)
      // var that = this
      axios.get('/sys/permission/getPermissionList?pageNumber=' + this.currentPage + '&pageSize=10', {
        headers: {
          Authorization: 'admin' }
      }).then(resp => {
        this.loading = false
        if (resp && resp.data.code === 1) {
          this.tableData = resp.data.data.list
          this.total = resp.data.data.total
        } else {
          this.$message.error('失败')
        }
      })
    },
    handleEdit(index, permission) {
      this.dialogFormVisible = true
      this.selectedPermission = permission
    },
    onSubmit(permission) {
      this.formLoading = true
      const time = getCurrentTime()
      // const that = this
      axios.post('http://swust.f3322.net:9001/sys/permission/updatePermission', {
        'id': permission.id,
        'name': permission.name,
        'code': permission.code,
        'description': permission.description,
        'gmtModify': time }, {
        headers: {
          Authorization: 'admin'
        }
      }).then(resp => {
        this.formLoading = false
        if (resp && resp.data.code === 1) {
          this.$message({
            message: '权限修改成功',
            type: 'success'
          })
          this.dialogFormVisible = false
          this.getPermissionList()
        } else {
          this.$alert(resp.data.msg)
        }
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const ids = []
        ids.push(row.id)
        axios.post('http://swust.f3322.net:9001/sys/permission/deletePermissionByList', ids, {
          headers: {
            Authorization: 'admin'
          }
        }).then(response => {
          console.log(response)
          if (response.data.code === 1) {
            this.getPermissionList()
            this.$message({
              message: '权限删除成功',
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

    }
  }
}
</script>
