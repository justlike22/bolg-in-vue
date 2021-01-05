<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" size="mini" @click="dialogFormVisible = true">添加角色</el-button>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogFormVisible"
      width="25%"
      @close="clear"
    >
      <el-form
        v-loading="loading"
        :model="roleForm"
        :rules="rules"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="name">
          <el-input
            v-model="roleForm.name"
            type="text"
            auto-complete="off"
            placeholder="角色名"
          />
        </el-form-item>
        <el-form-item prop="description">
          <el-input
            v-model="roleForm.description"
            type="text"
            auto-complete="off"
            placeholder="角色描述"
          />
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="createRole">添加</el-button>
        </el-form-item>
        <el-form-item prop="username">
          <el-tag>初始权限：无</el-tag>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { getCurrentTime } from '@/api/getCurrentTime'
export default {
  name: 'RoleCreate',
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: '角色名不能为空', trigger: 'blur' }]
      },
      checked: true,
      roleForm: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  methods: {
    clear() {
      this.roleForm = {
        name: '',
        description: ''
      }
    },
    createRole() {
      console.log(this)
      const role = this.roleForm
      const time = getCurrentTime()
      axios.post('http://swust.f3322.net:9001/sys/role/addRole', {
        'name': role.name,
        'description': role.description,
        'gmtCreate': time }, {
        headers: {
          Authorization: 'admin'
        }
      }).then(resp => {
        if (resp && resp.data.code === 1) {
          this.$message({ message: '添加成功', type: 'success' }
          )
          this.dialogFormVisible = false
          this.clear()
          this.$emit('onSubmit')
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
    margin: 18px 0 0 30px;
  }
</style>
