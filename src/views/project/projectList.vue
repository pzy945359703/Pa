<template>
  <div>
    <div style="padding:10px;float:right">
      <el-button @click="dialogVisible=true">添加主题</el-button>
    </div>
    <div>
      <el-table
        :data="projectList"
        border
        style="width: 100%">
        <!-- <el-table-column
          align="center"
          prop="date"
          label="日期"
        /> -->
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
            <el-dropdown split-button @click="handleViewDetail(scope.row)">
              编辑
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
                <el-dropdown-item @click.native="setContent(scope.row)">设置测试内容</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="新增测试项目"
      width="30%">
      <div style="margin-top:20px">
        <span class="metaTitle">请上传封面：</span>
        <el-upload
          ref="upload"
          :on-success="handleSuccessForCover"
          :file-list="fileList"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF"
          class="upload-demo"
          action="http://120.26.88.248:8082/common/uploadFile">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
          :file-list="detailList"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF"
          class="upload-demo"
          action="http://120.26.88.248:8082/common/uploadFile">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createComment">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer
      :visible.sync="drawer"
      :show-close="false"
      title="我是标题">
      <el-checkbox-group v-model="projectParam.contentIdList">
        <el-checkbox v-for="item in contentList" :key="item.id" :label="item.name"/>
      </el-checkbox-group>
    </el-drawer>
  </div>
</template>

<script>
import { getAllPorject, addPorject, getAllPorjectType, deletePorject } from '../../api/project'
import { getAllContent } from '../../api/content'

export default {
  data() {
    return {
      drawer: false,
      dialogVisible: false,
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
    fetchData() {
      getAllPorject().then(res => {
        if (res.data.code === '200') {
          // console.log(res.data.data)
          this.projectList = res.data.data
        } else {
          this.$notify({
            title: '提示',
            message: '获取项目列表失败'
          })
        }
      })
      getAllPorjectType().then(res => {
        res.data.data.forEach(element => {
          this.projectTypeList.push(element)
        })
      })
      getAllContent().then(res => {
        if (res.data.code === '200') {
          this.contentList = res.data.data
          console.log(this.contentList)
        } else {
          this.$notify({
            title: '提示',
            message: '获取项目列表失败'
          })
        }
      })
    },
    handleViewDetail(id) {
      // this.$router.push({ name: 'projectDetail', params: { id: id }})
      this.dialogVisible = true
      this.projectParam = id
    },
    createComment() {
      addPorject(this.projectParam).then(res => {
        this.projectParam = {}
        this.dialogVisible = false
        this.fetchData()
      })
    },
    handleSuccessForCover(res, file, fileList) {
      if (res.code === '200') {
        this.$notify({
          title: '提示',
          message: '附件上传成功'
        })
        this.projectParam.showPicture = this.projectParam.showPicture ? this.projectParam.showPicture + '||' + res.data : res.data
        console.log(this.projectParam)
      }
    },
    handleSuccessForDetail(res, file, fileList) {
      if (res.code === '200') {
        this.$notify({
          title: '提示',
          message: '附件上传成功'
        })
        this.projectParam.detailPicture = this.projectParam.detailPicture ? this.projectParam.detailPicture + '||' + res.data : res.data
        console.log(this.projectParam)
      }
    },
    handleDelete(item) {
      console.log(item)
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
