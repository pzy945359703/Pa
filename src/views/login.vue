<template>
<div class="backGround">
    <div style="padding-top:10%">
        <el-row>
            <el-col :span="8" :offset="9" class="center">
                <h1>无人机测试服务平台</h1>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="8" :offset="8">
                <el-form :model="userForm" :rules="loginFormRole" label-width="140px" ref="loginForm">
                    <el-form-item label="账号:" prop="userName" class="whiteLabel">
                        <el-input v-model="userForm.userName" placeholder="请输入用户名"/>
                    </el-form-item>
                    <el-form-item label="密码:" prop="passWord" class="whiteLabel">
                        <el-input type="password" v-model="userForm.passWord" placeholder="请输入密码"/>
                    </el-form-item>
                    <div class="center">
                        <el-button type="primary" @click="login()">登陆</el-button>
                        <el-button @click="dialogVisible=true">注册</el-button>
                    </div>
                </el-form>
            </el-col>
        </el-row>
    </div>
    <el-dialog
    title="注册用户"
    :visible.sync="dialogVisible"
    width="35%">
        <el-form :model="registerUser" :rules="loginFormRole" label-width="140px" ref="loginForm">
            <el-form-item label="账号:" prop="userName" >
                <el-input v-model="registerUser.userName" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="密码:" prop="passWord" >
                <el-input type="password" v-model="registerUser.passWord" placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPassword" >
                <el-input type="password" v-model="registerUser.checkPassword" placeholder="请再次输入密码"/>
            </el-form-item>
            <el-form-item label="邮箱:" prop="mail" >
                <el-input type="password" v-model="registerUser.mail" placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item label="手机号:" prop="phone" >
                <el-input type="password" v-model="registerUser.phone" placeholder="请输入电话号码"/>
            </el-form-item>
            <el-form-item label="请选择用户类型:" prop="registerType" >
                <el-radio-group v-model="registerUser.registerType">
                    <el-radio :label="1" >普通用户</el-radio>
                    <el-radio :label="2">管理员</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="center">
            <el-button  type="primary" @click="dialogVisible = false">注 册</el-button>
            <el-button  @click="dialogVisible = false">取 消</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        userName: '',
        passWord: ''
      },
      loginFormRole: {
        userName: {required: true, message: '请输入用户名', trigger: 'blur'},
        passWord: {required: true, message: '请输入密码', trigger: 'blur'}
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
    login () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
        //   this.$router.push({})
        } else {

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
</style>
