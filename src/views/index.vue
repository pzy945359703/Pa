<template>
  <div class="container">
    <div>
      <el-carousel height="150px">
        <el-carousel-item v-for="item in carousel" :key="item.title">
          <h3 class="small">{{ item.title }}</h3>
          <h4>{{ item.subTitle }}</h4>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="white-panel">
      <div align="center" class="pannel-title" >
        <p>
          <span>测试内容</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: [
        {
          title: 'Follow_me',
          subTitle: '通过机载摄像头'
        },
        {
          title: 'Follow_me2',
          subTitle: '通过机载摄像头'
        }
      ]
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .pannel-title {
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: normal;
    color: rgb(102, 102, 102);
    text-align: center;
    padding-top:10px;
    padding-bottom:10px;
  }
</style>
