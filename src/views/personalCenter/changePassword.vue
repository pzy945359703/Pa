<template>
  <div>
    <el-card>
      <span style="color: rgb(102, 102, 102);font-size: 16px;font-family: 'Microsoft YaHei';font-weight: 800;padding-left: 10px;">修改密码</span>
      <el-divider/>
      <div class="container">
        <el-form ref="changePasswordFrom" :model="changePasswordFrom" :rules="changePasswordFormRole" label-width="140px" style="padding:0 25%">
          <el-form-item label="新密码">
            <el-input v-model="changePasswordFrom.password" type="password"/>
          </el-form-item>
          <el-form-item label="请确认新密码">
            <el-input v-model="changePasswordFrom.checkPassword" type="password"/>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button class="theme-color__background white-word" style="width:300px;" @click="changePassWord()">修改密码</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="centerDialogVisible"
      title="提示"
      width="30%"
      center>
      <span>修改密码成功</span>
    </el-dialog>
  </div>
</template>

<script>
import { changePassword } from '../../api/user'
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerUserForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userId: 0,
      changePasswordFormRole: {
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        checkPassword: { validator: validatePass2, trigger: 'blur' }
      },
      changePasswordFrom: {
        password: '',
        checkPassword: ''
      },
      centerDialogVisible: false
    }
  },
  mounted() {
    this.userId = JSON.parse(sessionStorage.getItem('userInfo')).id
  },
  methods: {
    changePassWord() {
      changePassword({ id: this.userId, password: this.changePasswordFrom.password }).then(res => {
        if (res.data.code === '200') {
          this.$message(res.data.desc)
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>
