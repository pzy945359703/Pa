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
            <el-form-item prop="userName">
              <el-input v-model="userForm.userName" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input v-model="userForm.passWord" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"/>
            </el-form-item>
            <el-button class="theme-color__background white-word" style="width:100%" @click="login()">登陆</el-button>
            <div >
              <div class="link" style="text-align:left">
                <a class="theme-color__word" @click="dialogVisible=true">忘记密码?</a>
              </div>
              <div class="link" style="text-align:right">
                <a class="theme-color__word" @click="dialogVisible=true">新用户注册</a>
              </div>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="注册用户"
      width="35%">
      <el-form ref="loginForm" :model="registerUser" :rules="loginFormRole" label-width="140px">
        <el-form-item label="账号:" prop="userName" >
          <el-input v-model="registerUser.userName" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="密码:" prop="passWord" >
          <el-input v-model="registerUser.passWord" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPassword" >
          <el-input v-model="registerUser.checkPassword" type="password" placeholder="请再次输入密码"/>
        </el-form-item>
        <el-form-item label="邮箱:" prop="mail" >
          <el-input v-model="registerUser.mail" type="password" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone" >
          <el-input v-model="registerUser.phone" type="password" placeholder="请输入电话号码"/>
        </el-form-item>
        <el-form-item label="请选择用户类型:" prop="registerType" >
          <el-radio-group v-model="registerUser.registerType">
            <el-radio :label="1" >普通用户</el-radio>
            <el-radio :label="2">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="center">
        <el-button type="primary" @click="dialogVisible = false">注 册</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        userName: '',
        passWord: ''
      },
      loginFormRole: {
        userName: { required: true, message: '请输入用户名', trigger: 'blur' },
        passWord: { required: true, message: '请输入密码', trigger: 'blur' }
      },
      dialogVisible: false,
      registerUser: {
        userName: '',
        passWord: '',
        checkPassword: '',
        mail: '',
        phone: '',
        registerType: 1
      }
    }
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$router.push({ name: 'index' })
        } else {
          //
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
.backGround {
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  color: #ffffff
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
