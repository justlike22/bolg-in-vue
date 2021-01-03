<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" size="mini" @click="dialogFormVisible = true">添加权限</el-button>
    <el-dialog
      title="添加权限"
      :visible.sync="dialogFormVisible"
      width="25%"
      @close="clear"
    >
      <el-form
        :model="permissionForm"
        label-position="left"
        label-width="0px"
      >
        <el-form-item prop="name">
          <el-input
            v-model="permissionForm.name"
            type="text"
            auto-complete="off"
            placeholder="名称"
          />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="permissionForm.code"
            type="text"
            auto-complete="off"
            placeholder=""
          />
        </el-form-item>
        <el-form-item prop="description">
          <el-input
            v-model="permissionForm.description"
            type="text"
            auto-complete="off"
            placeholder="描述"
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
      permissionForm: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  methods: {
    clear() {
      this.permissionForm = {
        name: '',
        code: '',
        description: ''
      }
    },
    register() {
      this.$axios
        .post('/register', {
          name: this.permissionForm.name,
          code: this.permissionForm.code,
          description: this.permissionForm.description
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('注册成功', '提示', {
              confirmButtonText: '确定'
            })
            this.clear()
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {})
    }
  }
}
</script>

<style scoped>
  .add-button {
    margin: 18px 0 0 30px;
  }
</style>
