<template>
  <div>
    <el-card>
      <span style="color: rgb(102, 102, 102);font-size: 16px;font-family: 'Microsoft YaHei';font-weight: 800;padding-left: 10px;">修改密码</span>
      <el-divider/>
      <div class="container">
        <el-form ref="changePasswordFrom" :model="changePasswordFrom" label-width="140px" style="padding:0 25%">
          <el-form-item label="原密码">
            <el-input v-model="changePasswordFrom.originPassword"/>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="changePasswordFrom.newPassword"/>
          </el-form-item>
          <el-form-item label="请确认新密码">
            <el-input v-model="changePasswordFrom.confirmPassword"/>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button class="theme-color__background white-word" style="width:300px;" @click="register()">修改密码</el-button>
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
export default {
  data() {
    return {
      changePasswordFrom: {
        originPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      centerDialogVisible: false
    }
  },
  methods: {
  }
}
</script>
