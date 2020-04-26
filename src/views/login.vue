<template>
  <div style="height:100%" >
    <div style="width:80%;padding-left:10%;padding-right:10%">
      <p style="font-size:24px;"><span class="main-title">优测试</span>
        <span class="subtitle">优质测试方案平台</span>
      </p>
    </div>
    <div style="background-color:#bfccd4;height:80%;width:80%;padding-left:10%;padding-right:10%">
      <el-row >
        <el-col :span="8" :offset="15" style="background-color:#ffffff;width:380px;height:500px;margin-top:30px;padding-left:20px;padding-right:20px">
          <div align="center" class="form-title" >
            <p>
              <span>用户登录</span>
            </p>
          </div>
          <el-form ref="loginForm" :model="userForm" :rules="loginFormRole">
            <el-form-item prop="phone">
              <el-input v-model="userForm.phone" prefix-icon="el-icon-user-solid" placeholder="请输入手机号"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="userForm.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"/>
            </el-form-item>
            <el-button class="theme-color__background white-word" style="width:100%" @click="login()">登陆</el-button>
            <div >
              <div class="link" style="text-align:left">
                <a class="theme-color__word" @click="dialogVisible=true">忘记密码?</a>
              </div>
              <div class="link" style="text-align:right">
                <a class="theme-color__word" @click="toRegiser()">新用户注册</a>
              </div>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { login } from '../api/user'

export default {
  data() {
    return {
      userForm: {
        phone: '',
        password: ''
      },
      loginFormRole: {
        phone: { required: true, message: '请输入手机号', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    }
  },
  mounted() {
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          login(this.userForm).then(res => {
            sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
            this.$router.push({ name: 'index', params: { showAll: 'true', queryName: 'a' }})
          }).catch(response => {
            this.$notify({
              title: '提示',
              message: '用户不存在或密码不正确'
            })
          })
        } else {
          //
        }
      })
    },
    toRegiser() {
      this.$router.push({ name: 'register' })
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
.theme-color__background {
  background-color:#1ABC94;
}
.theme-color__word {
  color:#1ABC94;
}
.white-word {
  color:#ffffff
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
