<template>
  <div >
    <div class="top-nav container">
      <div >
        <el-menu :default-active="activeIndex" mode="horizontal" background-color="white" router >
          <!-- <el-menu-item index="1">登陆</el-menu-item> -->
          <el-menu-item index="/home/index/true/1">主页</el-menu-item>
          <!-- <el-menu-item index="/personalCenter/changePassword">个人中心</el-menu-item> -->
          <el-menu-item index="/login" style="float:right">退出</el-menu-item>
          <el-submenu index="personalCenter" style="float:right">
            <template slot="title">{{ userName }}</template>
            <el-menu-item index="/home/myOrderList">我的订单</el-menu-item>
            <el-menu-item index="/home/personalCenter/changePassword">修改密码</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="hasPermission" index="/home/projectList">项目管理</el-menu-item>
          <el-menu-item v-if="hasPermission" index="/home/orderList">订单管理</el-menu-item>
          <el-menu-item v-if="hasPermission" index="/home/contentList">测试内容管理</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="search-nav">
      <el-input v-model="input3" placeholder="请输入内容" class="input-with-select">
        <i slot="suffix" style="cursor:pointer" class="el-input__icon el-icon-search" @click="queryProject"/>
      </el-input>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeIndex: 'myOrderList',
      input3: '',
      userName: '',
      hasPermission: true
    }
  },
  mounted() {
    var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.userName = userInfo.nikename
    this.hasPermission = userInfo.permission === 'admin'
  },
  methods: {
    queryProject() {
      // this.$router.push({ name: 'index', params: { showAll: 'false', queryName: this.input3 }})
      this.$router.replace({
        name: 'index',
        params: {
          showAll: 'false', queryName: this.input3
        }
      })
      // this.$router.push({ name: 'index', query: { showAll: 'true' }})
    }
  }
}
</script>

<style>
.top-nav {
    height: 61px;
    background-color: white;
    color:#666666;
}
.search-nav {
    color: #666666;
    width: 40%;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>
