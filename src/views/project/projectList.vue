<template>
  <div>
    <div style="padding:10px;float:right">
      <el-button @click="clickAddButton()">添加主题</el-button>
    </div>
    <div>
      <el-table
        :data="projectList"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="name"
          label="项目名称"
        />
        <el-table-column
          align="center"
          prop="type"
          label="测试类型"
        />
        <el-table-column
          align="center"
          prop="duration"
          label="难度系数"
        />
        <el-table-column
          align="center"
          prop="price"
          label="价格"/>
        <el-table-column
          align="center"
          prop="deleted"
          label="是否删除">
          <template slot-scope="scope">
            <span>{{ scope.row.deleted===true?'是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-dropdown split-button @click="setContent(scope.row)">
              编辑
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-drawer
      :visible.sync="drawer"
      :show-close="false"
      :before-close="handleClose">
      <template slot="title">
        <span v-if="projectParam.id === 0">新增测试项目</span>
        <span v-else>修改测试项目</span>
      </template>
      <div>
        <span class="metaTitle">请上传封面(限制4张)：</span>
        <el-upload
          ref="upload"
          :on-success="handleSuccessForCover"
          :file-list="fileList"
          :limit="4"
          :on-exceed="handleExceed"
          :on-remove="handleRemoveForShowPic"
          :before-remove="beforeRemove"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF"
          class="upload-demo"
          action="http://120.26.88.248:8082/common/uploadFile"
          list-type="picture-card">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </div>
      <div style="margin-top:20px">
        <div class="metaTitle">请设置测试名称:</div>
        <el-input
          v-model="projectParam.name"/>
      </div>
      <div style="margin-top:20px">
        <div class="metaTitle">请设置难度系数：</div>
        <el-input-number
          v-model="projectParam.duration"
          :min="0"/>
      </div>
      <div style="margin-top:20px">
        <div class="metaTitle">请选择测试类型:</div>
        <el-select v-model="projectParam.type" style="padding-top:5px" >
          <el-option
            v-for="(item, index) in projectTypeList"
            :key="index"
            :label="item"
            :value="item"/>
        </el-select>
      </div>
      <div style="margin-top:20px">
        <div class="metaTitle">请设置价格：</div>
        <el-input-number
          v-model="projectParam.price"
          :min="0"/>
      </div>
      <div style="margin-top:20px">
        <div class="metaTitle">描述:</div>
        <el-input
          v-model="projectParam.description"
          type="textarea"
          maxlength="100"
          show-word-limit/>
      </div>
      <div style="margin-top:20px">
        <span class="metaTitle">请上传详情图片：</span>
        <el-upload
          ref="upload"
          :on-success="handleSuccessForDetail"
          :on-remove="handleRemoveForDetailPic"
          :before-remove="beforeRemove"
          :file-list="detailList"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF"
          class="upload-demo"
          action="http://120.26.88.248:8082/common/uploadFile"
          list-type="picture-card">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </div>
      <div v-if="projectParam.id!== 0" style="margin-top:20px">
        <div class="metaTitle">请选择测试内容:</div>
        <!-- <el-checkbox-group v-model="projectParam.contentIdList">
          <el-checkbox v-for="item in contentList" :key="item.id" :label="item.name"/>
        </el-checkbox-group> -->
        <el-select v-model="projectParam.contentIdList" multiple placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in contentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </div>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="submitContent">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getAllPorject, addPorject, getAllPorjectType, deletePorject, updatePorject } from '../../api/project'
import { getAllContent } from '../../api/content'

export default {
  data() {
    return {
      drawer: false,
      projectParam: {},
      projectList: [],
      fileList: [],
      detailList: [],
      projectTypeList: [],
      contentList: []
    }
  },
  beforeMount() {
    this.id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除该图片码？`)
    },
    handleRemoveForShowPic(file, fileList) {
      this.projectParam.showPicture = fileList.map(item => {
        return item.url
      }).join('||')
    },
    handleRemoveForDetailPic(file, fileList) {
      this.projectParam.detailPicture = fileList.map(item => {
        return item.url
      }).join('||')
    },
    fetchData() {
      getAllPorject().then(res => {
        if (res.data.code === '200') {
          this.projectList = res.data.data
        } else {
          this.$notify({
            title: '提示',
            message: '获取项目列表失败'
          })
        }
      })
      getAllPorjectType().then(res => {
        this.projectTypeList = res.data.data
      })
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
      this.projectParam = { id: 0, deleted: false }
    },
    handleCancel() {
      this.projectParam = {}
      this.fileList = []
      this.detailList = []
      this.fetchData()
      this.drawer = false
    },
    handleClose(done) {
      this.projectParam = { deleted: false }
      this.fileList = []
      this.detailList = []
      this.fetchData()
      done()
    },
    submitContent() {
      this.projectParam.deleted = false
      if (this.projectParam.id === 0) {
        addPorject(this.projectParam).then(res => {
          if (res.data.code === '200') {
            this.$notify({
              title: '提示',
              message: '新增测试项目成功'
            })
          }
          this.fetchData()
        })
      } else {
        updatePorject(this.projectParam).then(res => {
          if (res.data.code === '200') {
            this.$notify({
              title: '提示',
              message: '修改测试项目成功'
            })
          }
          this.fetchData()
        })
      }
      this.projectParam = { deleted: false }
      this.detailList = []
      this.fileList = []
      this.drawer = false
    },
    handleSuccessForCover(res, file, fileList) {
      if (res.code === '200') {
        this.$notify({
          title: '提示',
          message: '附件上传成功'
        })
        this.projectParam.showPicture = this.projectParam.showPicture ? this.projectParam.showPicture + '||' + res.data : res.data
      }
    },
    handleSuccessForDetail(res, file, fileList) {
      if (res.code === '200') {
        this.$notify({
          title: '提示',
          message: '附件上传成功'
        })
        this.projectParam.detailPicture = this.projectParam.detailPicture ? this.projectParam.detailPicture + '||' + res.data : res.data
      }
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePorject(item.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    setContent(item) {
      this.drawer = true
      this.projectParam = item
      var detailPictures = item.detailPicture ? item.detailPicture.split('||') : []
      var detailPictureList = this.handlePictures(detailPictures)
      var showPictures = item.showPicture ? item.showPicture.split('||') : []
      var showPictureList = this.handlePictures(showPictures)
      detailPictureList.forEach(element => {
        this.detailList.push({ url: element })
      })
      showPictureList.forEach(element => {
        this.fileList.push({ url: element })
      })
    },
    handlePictures(list) {
      list.forEach(function(pic, index, arr) {
        if (pic.indexOf('http') === -1) {
          arr[index] = 'http://' + pic
        }
      })
      return list
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 4 个文件`)
    }
  }
}
</script>

<style scoped>
.metaTitle {
    color: #838383;
    font-size:12px;
    font-weight: 700;
    margin-bottom: 5px;
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
