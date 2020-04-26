<template>
  <div style="padding:20px 15%">
    <!-- <div>
      <el-carousel height="150px">
        <el-carousel-item v-for="item in carousel" :key="item.title">
          <h3 class="small">{{ item.title }}</h3>
          <h4>{{ item.subTitle }}</h4>
        </el-carousel-item>
      </el-carousel>
    </div> -->
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
        <el-col v-for="item in porjectList" :span="7" :offset="1" :key="item.id" style="padding:20px" >
          <el-card :body-style="{ padding: '0px' }" @click.native="detailView(item.id)">
            <img :src="item.showPictureList[0]" class="image">
            <div style="padding: 14px;">
              <span>{{ item.name }}</span>
              <div class="bottom clearfix">
                <span>{{ item.description }}</span>
              </div>
              <span>{{ item.price }}</span>
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
        {
          title: 'Follow_me',
          subTitle: '通过机载摄像头'
        },
        {
          title: 'Follow_me2',
          subTitle: '通过机载摄像头'
        }
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
          this.porjectList = res.data.data
          this.porjectList.forEach(element => {
            element.detailPictureList = element.detailPicture.split('||')
            element.showPictureList = element.showPicture.split('||')
          })
        })
      } else {
        getPorjectsByName(this.$route.params.queryName).then(res => {
          this.porjectList = res.data.data
          this.porjectList.forEach(element => {
            element.detailPictureList = element.detailPicture.split('||')
            element.showPictureList = element.showPicture.split('||')
          })
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
          this.porjectList = res.data.data
          this.porjectList.forEach(element => {
            element.detailPictureList = element.detailPicture.split('||')
            element.showPictureList = element.showPicture.split('||')
          })
        })
      } else {
        getPorjectsByType({ type: item }).then(res => {
          this.porjectList = res.data.data
          this.porjectList.forEach(element => {
            element.detailPictureList = element.detailPicture.split('||')
            element.showPictureList = element.showPicture.split('||')
            this.number = index
          })
        })
      }
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
</style>
