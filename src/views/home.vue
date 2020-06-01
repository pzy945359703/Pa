<template>
  <div style="padding:20px 15%">
    <div>
      <el-carousel type="card" height="330px">
        <el-carousel-item v-for="(item,index) in carousel" :key="index" @click.native="detailView(item.id)">
          <!-- <h3 class="small">{{ item.title }}</h3> -->
          <img :src="'http://'+item.src" class="carousel-image" >
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div class="white-panel">
      <div align="center" class="pannel-title" >
        <p>
          <span>测试内容</span>
        </p>
      </div>
    </div> -->
    <el-card style="margin:20px 0">
      <span>测试内容分类：</span>
      <span v-for="(item,index) in projectTypeList" :key="index" :class="{active:index===number,}" class="projectType" @click="searchProjectByType(item,index)">{{ item }}</span>
    </el-card>
    <el-card>
      <el-row>
        <el-col v-for="item in porjectList" :span="7" :offset="1" :key="item.id" style="padding:20px;height:500px" >
          <el-card :body-style="{ padding: '0px',height: '400px' }" @click.native="detailView(item.id)">
            <img :src="item.showPictureList[0]" class="image">
            <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588934478372&di=866ae1654006c083f0fe46d00cf242fa&imgtype=0&src=http%3A%2F%2Fcss.chinawj.com.cn%2Fpic%2Fimg.gif" class="image"> -->
            <div style="padding: 14px;">
              <div class="projetcName">{{ item.name }}</div>
              <div class="bottom clearfix" style="height:100px">
                <span>{{ item.description }}</span>
              </div>
              <div style="float:right;color:green;padding-bottom:20px">￥{{ item.price }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getAllPorject, getAllPorjectType, getPorjectsByType, getPorjectsByName } from '../api/project'

export default {
  data() {
    return {
      number: 0,
      carousel: [
        { src: '120.26.88.248/photo/a03e62ed-60a2-4657-b135-171329166017.jpg', id: 10 },
        { src: '120.26.88.248/photo/16220329-f75a-43fa-baeb-88b1b59ae725.jpg', id: 16 },
        { src: '120.26.88.248/photo/fd5635b7-52db-41e8-b57e-88cd0ad8bf23.jpg', id: 4 }
      ],
      porjectList: [],
      projectTypeList: ['全部']
    }
  },
  watch: {
    '$route' (to, from) {
      this.projectTypeList = ['全部']
      // 对路由变化作出响应...
      this.fetchData()
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.$route.params.showAll === 'true') {
        getAllPorject().then(res => {
          this.handlePictures(res)
        })
      } else {
        getPorjectsByName(this.$route.params.queryName).then(res => {
          this.handlePictures(res)
        })
      }
      getAllPorjectType().then(res => {
        res.data.data.forEach(element => {
          this.projectTypeList.push(element)
        })
      })
    },
    searchProjectByType(item, index) {
      if (item === '全部') {
        getAllPorject().then(res => {
          this.handlePictures(res)
        })
      } else {
        getPorjectsByType({ type: item }).then(res => {
          this.handlePictures(res)
        })
        this.number = index
      }
    },
    handlePictures(res) {
      this.porjectList = res.data.data
      this.porjectList.forEach(element => {
        element.showPictureList = element.showPicture ? element.showPicture.split('||') : []
        element.showPictureList.forEach(function(pic, index, arr) {
          if (pic.indexOf('http') === -1) {
            arr[index] = 'http://' + pic
          }
        })
      })
    },
    detailView(id) {
      this.$router.push({ name: 'projectItem', params: { id: id }})
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
  .image{
    padding-top: 10px;
    padding-left:10%;
    width: 200px;
    height: 200px;
  }
  .active{
    color:teal
  }
  .projectType{
    padding-left:10px;
    cursor:pointer;
  }
  .projetcName{
    font-weight: 700;
    padding-bottom: 10px;
  }
  .carousel-image {
    width: 100%;
  }
</style>
