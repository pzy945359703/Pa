<template>
  <div >
    <div class="top-nav">
      <!-- <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">登陆</el-menu-item>
        <el-menu-item index="2">个人中心</el-menu-item>
        <el-menu-item index="3" >消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu> -->
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
      activeIndex: '1',
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
    height: 50px;
    background-color: #333333;
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
