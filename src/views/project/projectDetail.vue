<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="6" :offset="3">
          <div class="goodDetails_name_img">
            <div style="width: 300px;height: 300px"> <el-image :src="ImgUrl" style="width: 100%;height: 100%" /> </div>
          </div>
        </el-col>
        <el-col :span="12" :offset="1" >
          <div style="">
            <span class="projectTitle">
              {{ projectInfo.name }}
            </span>
            <span style="float:right;font-size:28px;font-weight:700;text-decoration:none;color:#F04844;">{{ projectInfo.price }}</span>
            <span style="padding-top:15px;float:right;font-family:'微软雅黑';font-weight:400;font-size:14px;text-decoration:none;color:#F04844;">¥</span>
          </div>
          <div class="price">
            <span class="metaTitle">
              <div style="margin-top:20px">
                <span class="metaTitle">测试内容:</span>
                <span v-for="item in contentList" :key="item.id">
                  <el-image
                    :src="item.picture"
                    :title="item.name"
                    :style="uncheckStyle"
                    fit="fill"
                    @click="getIndex(item)"/>
                </span>
              </div>
              <!-- <div style="margin-top:20px">
                <span class="metaTitle">测试场地</span>
                <span class="metaBody">{{ testPlace }}</span>
              </div> -->
              <!-- <div style="margin-top:20px">
                <span class="metaTitle">测试结果</span>
                <span v-for="item in testResult" :key="item" class="metaBody">{{ item }}</span>
              </div> -->
              <div style="margin-top:20px;margin-left:10%">
                <el-button class="theme-color__background white-word" @click="submitOrder">提交测试申请</el-button>
              </div>
              <div style="margin:20px 0">
                <span class="metaTitle">服务承诺</span>
                <span class="metaBody">
                  <i class="el-icon-circle-check" style="color:red" />   先付定金后付尾款
                  <i class="el-icon-circle-check" style="color:red" />   快速退款
                </span>
              </div>
            </span>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        :visible.sync="dialogVisible"
        title="测试内容"
        width="30%">
        <el-image
          :src="testContent.picture"
          :title="testContent.name"
          fit="fill"
        />
        <div style="margin-top:20px">
          <span class="metaTitle">测试名称</span>
          <el-input v-model="testContent.name" type="text" />
        </div>
        <div style="margin-top:20px">
          <span class="metaTitle">测试场地</span>
          <el-input v-model="testContent.place" type="text" />
        </div>
        <div style="margin-top:20px">
          <span class="metaTitle">测试类型</span>
          <el-input v-model="testContent.type" type="text" />
        </div>
        <div style="margin-top:20px">
          <span class="metaTitle">测试描述</span>
          <el-input
            v-model="testContent.description"
            type="textarea"
            placeholder="请输入内容"
            maxlength="40"
            show-word-limit/>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <div class="test-detail">
      <el-row>
        <el-tabs type="border-card">
          <!-- <el-tab-pane label="测试详情">
            <div style="text-align:center">
              <div v-for="(url, index) in detailPictures" :key="index" style="width:100%">
                <el-image :src="url"/>
              </div>
            </div>
          </el-tab-pane> -->
          <el-tab-pane label="1">
            <el-table
              :data="contentList"
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
                prop="place"
                label="场地"
              />
              <el-table-column
                align="center"
                prop="description"
                label="详情"/>
              <el-table-column align="center" label="操作" >
                <template slot="header" >
                  <el-button type="primary" @click="addTestContent">新增测试内容</el-button>
                </template>
                <template slot-scope="scope">
                  <el-dropdown split-button @click="handleEdit(scope.row.id)">
                    编辑
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="handleDelete(scope.$index, scope.row)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getPorjectInfo } from '../../api/project'
import { getAllCommentByPrjectId } from '../../api/comment'

export default {
  data() {
    return {
      dialogVisible: false,
      id: 0,
      projectInfo: {},
      testContent: {},
      contentList: [],
      commomentList: [],
      detailPictures: [],
      ImgUrl: '',
      uncheckStyle: { width: '38px', height: '38px', border: '2px solid #666', marginLeft: '10px' },
      commentPicStyle: { width: '38px', height: '38px', marginRight: '10px' },
      testPlace: '',
      testResult: ['记录飞行用时', '记录到达目标数量'],
      testTitle: '疯狂降落',
      testCost: 100,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      commentCount: 0,
      userName: '李某',
      commomentDateTime: '2020-01-30 14:33:33',
      testType: '目标识别',
      commomentReply: [{
        replyUser: '客服小彭',
        replyContent: '我们是专业的无人机测试团队，欢迎再次使用本测试平台哦！'
      },
      {
        replyUser: '赵某',
        replyContent: '我也觉得他家的速度很快！'
      }]
    }
  },
  beforeMount() {
    this.id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      getPorjectInfo({ id: this.id }).then(res => {
        this.projectInfo = res.data.data
        this.contentList = this.projectInfo.contentList
        this.detailPictures = this.projectInfo.detailPicture.split('||')
      })
      getAllCommentByPrjectId(parseInt(this.id)).then(res => {
        this.commomentList = res.data.data
        this.commomentList.forEach(item => {
          item.pictureList = item.picture.split('||')
        })
        this.commentCount = this.commomentList.length
      })
    },
    addTestContent() {
      this.dialogVisible = true
      document.body.style = ''
    },
    fixBug() {
      document.body.style = ''
    },
    submitOrder() {
      this.$router.push({ name: 'submitOrder', params: { projectId: this.id }})
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
    height: 250px;
    padding-left: 20px;
    padding-top: 10px;
    background-color: #f3f3f3;
}
</style>
