<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="6" :offset="3">
          <div class="goodDetails_name_img">
            <div style="width: 300px;height: 300px"> <el-image :src="ImgUrl" style="width: 100%;height: 100%" /> </div>
          </div>
        </el-col>
        <!-- style="border:1px solid #666" -->
        <el-col :span="12" :offset="1" >
          <div style="">
            <span class="projectTitle">
              疯狂降落
            </span>
          </div>
          <div class="price" >
            <span class="metaTitle">价格</span>
          </div>
          <div style="margin-top:20px">
            <span class="metaTitle">测试内容:</span>
            <span v-for="img in urls" :key="img.src">
              <el-image
                :src="img.src"
                :title="img.title"
                :style="uncheckStyle"
                fit="fill"
                @click="getIndex(img.src)"/>
            </span>
          </div>
          <div style="margin-top:20px">
            <span class="metaTitle">测试场地</span>
            <span class="metaBody">室内/室外/测试场</span>
          </div>
          <div style="margin-top:20px">
            <span class="metaTitle">测试结果</span>
          </div>
          <div style="margin-top:20px;margin-left:25%">
            <el-button class="theme-color__background white-word" >提交测试申请</el-button>
          </div>
          <div style="margin:20px 0">
            <span class="metaTitle">服务承诺</span>
            <span class="metaBody">
              <i class="el-icon-circle-check" style="color:red" />   先付定金后付尾款
              <i class="el-icon-circle-check" style="color:red" />   快速退款
            </span>
          </div>
        </el-col>
      </el-row>

    </el-card>
    <div class="test-detail">
      <el-row>
        <el-card :body-style="{ padding: '0px' }">
          <div style="color: rgb(102, 102, 102);font-size: 16px;font-family: 'Microsoft YaHei';font-weight: 800;padding:10px;border:1px solid #EBEEF5;background-color:#F9F9F9">测试详情</div>
          <div style="text-align:center">
            <span v-for="url in urls" :key="url.src">
              <el-image :src="url.src"/>
            </span>
          </div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urls: [
        { title: '21', src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg' },
        { title: '22', src: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg' },
        { title: '23', src: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg' },
        { title: '24', src: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg' },
        { title: '25', src: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg' },
        { title: '26', src: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg' },
        { title: '27', src: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg' }
      ],
      ImgUrl: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
      uncheckStyle: { width: '38px', height: '38px', border: '2px solid #666', marginLeft: '10px' }
    }
  },
  methods: {
    getIndex(imgUrl) {
      this.ImgUrl = imgUrl
      document.body.style = ''
    }
  }
}
</script>

<style scoped>
.test-detail {
    margin-top: 20px;
}
.metaTitle {
    color: #838383;
    font-size:12px
}
.metaBody{
    margin-left: 10px;
}
.projectTitle {
    margin-top:20px;
    padding-bottom: .2em;
    line-height: 1;
    font-size: 16px;
    font-weight: 700;
    color: #000;
}
.price {
    margin:20px 0;
    height: 100px;
    background-color: #f3f3f3;
}
</style>
