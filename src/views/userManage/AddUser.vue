<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" size="mini" @click="dialogFormVisible = true">添加用户</el-button>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      width="25%"
      @close="clear"
    >
      <el-form
        v-loading="loading"
        :model="addUserForm"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="username">
          <el-input
            v-model="addUserForm.username"
            type="text"
            auto-complete="off"
            placeholder="用户名"
          />
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            v-model="addUserForm.nickname"
            type="text"
            auto-complete="off"
            placeholder="昵称"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="addUserForm.password"
            type="text"
            auto-complete="off"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="addUserForm.avatarUrl"
            type="text"
            auto-complete="off"
            placeholder="头像链接"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="addUserForm.email"
            type="text"
            auto-complete="off"
            placeholder="E-Mail"
          />
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="register">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { getCurrentTime } from '@/api/getCurrentTime'
export default {
  name: 'AddUsre',
  data() {
    return {
      dialogFormVisible: false,
      // rules: {
      //   username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
      //   password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      // },
      addUserForm: {
        username: '',
        nickname: '',
        password: '',
        avatarUrl: '',
        email: ''
      },
      loading: false
    }
  },
  methods: {
    clear() {
      this.addUserForm = {
        username: '',
        nickname: '',
        password: '',
        avatarUrl: '',
        email: ''
      }
    },
    register() {
      this.loading = true
      const user = this.addUserForm
      const time = getCurrentTime()
      axios.post('http://swust.f3322.net:9001/sys/user/addUser', {
        'id': user.id,
        'username': user.username,
        'nickname': user.nickname,
        'avatarUrl': user.avatarUrl,
        'email': user.email,
        'password': user.password,
        'gmtCreate': time }, {
        headers: {
          Authorization: 'admin'
        }
      }).then(resp => {
        this.loading = false
        if (resp && resp.data.code === 1) {
          this.$message({ message: '注册成功', type: 'success' }
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
