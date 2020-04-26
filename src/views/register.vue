<template>
  <div style="height:100%" >
    <div style="width:80%;padding-left:10%;padding-right:10%">
      <div style="font-size:24px;padding-top:20px;padding-bottom:20px">
        <div align="left">
          <span class="main-title">优测试</span>
          <span class="subtitle">优质测试方案平台</span>
        </div>
        <div align="right">
          <span class="subtitle">已有账号</span>
        </div>
      </div>
    </div>
    <div style="background-color:#bfccd4;height:80%;width:80%;padding-left:10%;padding-right:10%">
      <el-row>
        <div class="container white-panel" style="padding-top:20px">
          <div align="center" class="form-title" >
            <p>
              <span>新用户注册</span>
            </p>
          </div>
          <div style="padding-left:20%;padding-right:20%" align="center">
            <el-form ref="loginForm" :model="registerUserForm" :rules="loginFormRole" style="width:300px;" >
              <el-form-item prop="name" >
                <el-input v-model="registerUserForm.name" placeholder="请输入用户姓名"/>
              </el-form-item>
              <el-form-item prop="nikename" >
                <el-input v-model="registerUserForm.nikename" placeholder="请输入用户昵称"/>
              </el-form-item>
              <el-form-item prop="gender" >
                <el-radio-group v-model="registerUserForm.gender">
                  <el-radio :label="'男'">男</el-radio>
                  <el-radio :label="'女'">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="phone" >
                <el-input v-model="registerUserForm.phone" placeholder="请输入电话号码"/>
              </el-form-item>
              <el-form-item prop="mail" >
                <el-input v-model="registerUserForm.mail" placeholder="请输入邮箱"/>
              </el-form-item>
              <el-form-item prop="password" >
                <el-input v-model="registerUserForm.password" type="password" placeholder="请设置密码"/>
              </el-form-item>
              <el-form-item prop="checkPassword" >
                <el-input v-model="registerUserForm.checkPassword" type="password" placeholder="请再次输入密码"/>
              </el-form-item>
              <!-- <el-form-item label="请选择账户户类型:" prop="registerType" >
                <el-radio-group v-model="registerUserForm.registerType">
                  <el-radio :label="1" >普通用户</el-radio>
                  <el-radio :label="2">管理员</el-radio>
                </el-radio-group>
              </el-form-item> -->
              <!-- <el-form-item v-show="registerUserForm.registerType==2" prop="authorCode" >
                <el-input v-model="registerUserForm.authorCode" placeholder="请输入授权码"/>
              </el-form-item> -->
            </el-form>
            <div style="padding-bottom:30px">
              <el-button class="theme-color__background white-word" style="width:300px;" @click="registerUser()">立即注册</el-button>
            </div>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { register, login } from '../api/user'
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
      loginFormRole: {
        name: { required: true, message: '请输入用户名', trigger: 'blur' },
        nikename: { required: true, message: '请输入昵称', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        phone: { required: true, message: '请输入电话', trigger: 'blur' },
        checkPassword: { validator: validatePass2, trigger: 'blur' }
      },
      registerUserForm: {
        name: '',
        nikename: '',
        password: '',
        gender: '男',
        checkPassword: '',
        phone: '',
        mail: '',
        permission: '0'
        // registerType: 1,
        // authorCode: ''
      }
    }
  },
  methods: {
    registerUser() {
      register(this.registerUserForm).then(res => {
        if (res.data.code === '200') {
          login({ phone: this.registerUserForm.phone, password: this.registerUserForm.password }).then(res => {
            if (res.data.code === '200') {
              sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
              this.$router.push({ name: 'index', params: { showAll: 'true', queryName: 'a' }})
            } else {
              this.$message(res.data.data)
            }
          })
        } else {
          this.$message(res.data.data)
        }
      })
    }
  }

}
</script>

<style>
.loginForm {
    padding-top:20%;
}
.whiteLabel .el-form-item__label {
    color:#ffffff
}
.center {
    text-align: center;
}
.center .dialog-footer{
    text-align: center;
}
.form-title {
    font-family: 微软雅黑, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    color: rgb(153, 153, 153);
    line-height: 36px;
}
.theme-color__word {
  color:#1ABC94;
}
a {
  cursor:pointer;
}
.link {
  display:inline-block;
  width:49%;
  font-size: 12px;
}
.main-title{
  font-family:'微软雅黑 Bold' '微软雅黑 Regular', '微软雅黑', sans-serif;
  font-weight:700;color:#6B6B6B;
}
.subtitle{
  font-family:'微软雅黑', sans-serif;font-weight:400;
  font-size:20px;color:#CCCCCC;
}
</style>
