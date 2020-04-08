<template>
  <div >
    <div class="top-nav container">
      <div style="float:right">
        <el-menu :default-active="activeIndex" mode="horizontal" background-color="white" router @select="handleSelect">
          <!-- <el-menu-item index="1">登陆</el-menu-item> -->
          <el-menu-item index="personalCenter/changePassword">个人中心</el-menu-item>
          <el-submenu index="personalCenter">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" >消息中心</el-menu-item>
          <el-menu-item index="orderList">我的订单</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="search-nav">
      <el-input v-model="input3" placeholder="请输入内容" class="input-with-select">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="what"/>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 'orderList',
      input3: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    what() {
      console.log(1)
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
.el-input__icon .el-icon-search{
  cursor:pointer;
}
</style>
