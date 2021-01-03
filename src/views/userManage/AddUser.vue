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
            type="password"
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
      }
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
      console.log(this.addUserForm)
      this.$alert('注册成功', '提示', {
        confirmButtonText: '确定'
      })
      // this.$axios
      //   .post('/register', {
      //     username: this.addUserForm.username,
      //     nickname: this.addUserForm.nickname,
      //     password: this.addUserForm.password,
      //     avatarUrl: this.addUserForm.avatarUrl,
      //     email: this.addUserForm.email
      //   })
      // .then(resp => {
      //   if (resp.data.code === 200) {
      //     this.$alert('注册成功', '提示', {
      //       confirmButtonText: '确定'
      //     })
      //     this.clear()
      //     this.$emit('onSubmit')
      //   } else {
      //     this.$alert(resp.data.message, '提示', {
      //       confirmButtonText: '确定'
      //     })
      //   }
      // })
      // .catch(failResponse => {})
    }
  }
}
</script>

<style scoped>
  .add-button {
    margin: 18px 0 0 30px;
  }
</style>
