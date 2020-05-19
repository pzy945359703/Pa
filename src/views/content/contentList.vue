<template>
  <div>
    <div style="padding:10px;float:right">
      <el-button @click="clickAddButton()">添加测试内容</el-button>
    </div>
    <el-table
      :data="contentList"
      border
      style="width: 100%">
      <!-- <el-table-column
        align="center"
        prop="date"
        label="日期"
      /> -->
      <el-table-column
        align="center"
        prop="id"
        label="编号"
      />
      <el-table-column
        align="center"
        prop="name"
        label="测试名称"
      />
      <el-table-column
        align="center"
        prop="place"
        label="测试场地"
      />
      <el-table-column
        align="center"
        prop="type"
        label="测试类型"
      />
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button split-button @click="handleViewDetail(scope.row)">
            修改
            <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
            </el-dropdown-menu> -->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :visible.sync="drawer"
      :show-close="false"
      :before-close="handleClose">
      <template slot="title">
        <span v-if="contentParam.id === 0">新增测试内容</span>
        <span v-else>修改测试内容</span>
      </template>
      <div style="margin-top:20px">
        <span class="metaTitle">请设置名称:</span>
        <el-input
          v-model="contentParam.name"/>
      </div>
      <div style="margin-top:20px">
        <span class="metaTitle">请设置测试类型：</span>
        <el-input
          v-model="contentParam.type"
          :min="0"/>
      </div>
      <div style="margin-top:20px">
        <span class="metaTitle">请设置测试地点：</span>
        <el-input
          v-model="contentParam.place"
          :min="0"/>
      </div>
      <div style="margin-top:20px">
        <span class="metaTitle">描述:</span>
        <el-input
          v-model="contentParam.description"
          type="textarea"
          maxlength="100"
          show-word-limit/>
      </div>
      <div style="margin:20px 0">
        <span class="metaTitle">请上传详情图片(限制1张)：</span>
        <el-upload
          ref="upload"
          :on-success="handleSuccessForDetail"
          :file-list="fileList"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF"
          class="upload-demo"
          action="http://120.26.88.248:8082/common/uploadFile"
          list-type="picture-card">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="submitContent">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getAllContent, updateContent, addContent } from '../../api/content'
// import { getAllCommentByPrjectId } from '../../api/comment'

export default {
  data() {
    return {
      contentList: [],
      drawer: false,
      contentParam: {},
      fileList: []
    }
  },
  beforeMount() {
    this.id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAllContent().then(res => {
        if (res.data.code === '200') {
          this.contentList = res.data.data
        } else {
          this.$notify({
            title: '提示',
            message: '获取项目列表失败'
          })
        }
      })
    },
    clickAddButton() {
      this.drawer = true
      this.contentParam = { id: 0 }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    handleViewDetail(item) {
      this.drawer = true
      this.contentParam = item
      this.fileList = item.picture ? [{ url: item.picture }] : []
    },
    submitContent() {
      if (this.contentParam.id === 0) {
        addContent(this.contentParam).then(res => {
          if (res.data.code === '200') {
            this.$notify({
              title: '提示',
              message: '新增测试内容成功'
            })
          }
          this.fetchData()
        })
      } else {
        updateContent(this.contentParam).then(res => {
          if (res.data.code === '200') {
            this.$notify({
              title: '提示',
              message: '修改测试内容成功'
            })
          }
          this.fetchData()
        })
      }
      this.contentParam = {}
      this.drawer = false
    },
    handleClose(done) {
      this.contentParam = {}
      this.fileList = []
      this.fetchData()
      done()
    },
    handleCancel() {
      this.contentParam = {}
      this.fileList = []
      this.fetchData()
      this.drawer = false
    },
    handleSuccessForDetail(res, file, fileList) {
      if (res.code === '200') {
        this.$notify({
          title: '提示',
          message: '附件上传成功'
        })
        this.contentParam.detailPicture = this.contentParam.detailPicture ? this.contentParam.detailPicture + '||' + res.data : res.data
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除该图片码？`)
    },
    handleRemove(file, fileList) {
      this.contentParam.picture = ''
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
    font-size:16px;
    padding-bottom: 5px;
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
    height: 250px;
    padding-left: 20px;
    padding-top: 10px;
    background-color: #f3f3f3;
}
</style>
