<template>
  <!-- 上下布局  -->
  <div id="index" >
    <router-view class="view header" name="header"/>
    <div class="content container" >
      <router-view class="view menu" name="content"/>
    </div>
    <div style="background-color:#333333;" >
      <router-view class="view" name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
#index {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.flex_left_right{
  display: flex;
  flex: 1;
}
.flex_left_right .menu{width:200px;height:100%;background-color:paleturquoise;}
.flex_left_right .content{height:100%;background-color:palegoldenrod;flex: 1;}

.content {
  background-color: rgb(245,245,245);
  margin-bottom: 20px;
}
</style>
