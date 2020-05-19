<template>
  <div >
    <el-card>
      <span style="color: rgb(102, 102, 102);font-size: 16px;font-family: 'Microsoft YaHei';font-weight: 800;padding-left: 10px;">订单详情</span>
      <el-divider/>
      <div style="margin:40px auto;width:90%;color:#999;font-size:12px">
        <span>订单号：{{ orderId }}</span>
        <el-divider direction="vertical"/>
        <span>下单时间：{{ createOrderTime }}</span>
        <div style="float:right">
          <!-- <el-button round size="small">申请售后</el-button> -->
          <el-button round size="small">打印测试结果</el-button>
          <el-button round size="small" @click="dialogVisible = true">评价</el-button>
        </div>
      </div>
      <el-steps :active="4" align-center finish-status="success">
        <el-step :description="createOrderTime" title="提交订单"/>
        <el-step :description="testCompleteTime" title="测试完成"/>
        <!-- <el-step title="测试完成" /> -->
        <el-step :description="orderCompleteTime" title="订单完成" />
      </el-steps>
      <div style="margin-left:auto;margin-right:auto;width:90%">
        <el-table
          :data="contentList"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="测试内容">
            <template slot-scope="scope">
              <img :src="scope.row.picture" class="rowImg">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="测试类型"/>
          <el-table-column
            prop="place"
            label="测试场地"/>
        </el-table>
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        title="评价"
        width="30%">
        <!-- <div style="margin-top:20px">
          <span class="metaTitle">测试名称</span>
          <el-input v-model="CommentParams.name" type="text" />
        </div> -->
        <div style="margin-top:20px">
          <div class="metaTitle">本次测试是否让您满意：</div>
          <el-select v-model="CommentParams.type" style="padding-top:5px" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
        <div style="margin-top:20px">
          <span class="metaTitle">评价打分：</span>
          <el-rate v-model="CommentParams.numbers" style="padding-top:5px"/>
        </div>
        <div style="margin-top:20px">
          <span class="metaTitle">评价晒单</span>
          <el-input
            v-model="CommentParams.description"
            type="textarea"
            placeholder="分享体验心得，给万千想买的人一个参考~"
            maxlength="100"
            show-word-limit/>
        </div>
        <div style="margin-top:20px">
          <el-upload
            ref="upload"
            :on-success="handleSuccess"
            :file-list="fileList"
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
    </el-card>
  </div>
</template>

<script>

import { getOrderInfo } from '../../api/order'
import { getPorjectInfo } from '../../api/project'
import { addComment } from '../../api/comment'

export default {
  data() {
    return {
      dialogVisible: false,
      projectId: 0,
      orderId: 0,
      createOrderTime: '2020-03-21 17:08:35',
      testCompleteTime: '2020-03-22 17:08:35',
      orderCompleteTime: '2020-03-26 17:08:35',
      contentList: [],
      tableData: [
        {
          content: '悬停精度',
          unitPrice: 200,
          amount: 1,
          subTotal: 200,
          actualPayment: 200
        },
        {
          content: '最大高度',
          unitPrice: 100,
          amount: 1,
          subTotal: 100,
          actualPayment: 100
        },
        {
          content: '爬升率',
          unitPrice: 200,
          amount: 2,
          subTotal: 400,
          actualPayment: 200
        },
        {
          content: '下降率',
          unitPrice: 300,
          amount: 1,
          subTotal: 300,
          actualPayment: 200
        }
      ],
      CommentParams: {
        userId: JSON.parse(sessionStorage.getItem('userInfo')).id,
        type: '',
        projectId: 0,
        numbers: 0,
        picture: '',
        description: ''
      },
      fileList: [],
      options: [{
        value: '好评',
        label: '好评'
      }, {
        value: '中评',
        label: '中评'
      }, {
        value: '差评',
        label: '差评'
      }]
    }
  },
  mounted() {
    this.orderId = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      getOrderInfo(this.orderId).then(res => {
        var orderItem = res.data.data
        this.projectId = orderItem.projectId
        this.CommentParams.projectId = this.projectId
        this.createOrderTime = new Date(new Date(orderItem.createTime) + 8 * 1000 * 3600).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        this.testCompleteTime = orderItem.testCompleteTime == null ? '' : new Date(new Date(orderItem.testCompleteTime) + 8 * 1000 * 3600).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        this.orderCompleteTime = orderItem.orderCompleteTime == null ? '' : new Date(new Date(orderItem.orderCompleteTime) + 8 * 1000 * 3600).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        getPorjectInfo({ id: this.projectId }).then(res => {
          this.projectInfo = res.data.data
          this.contentList = this.projectInfo.contentList
        })
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
    createComment() {
      addComment(this.CommentParams).then(res => {
        this.CommentParams = {}
        this.dialogVisible = false
      })
    },
    handleSuccess(res, file, fileList) {
      if (res.code === '200') {
        this.$notify({
          title: '提示',
          message: '附件上传成功'
        })
        this.CommentParams.picture = this.CommentParams.picture ? this.CommentParams.picture + '||' + res.data : res.data
      }
    }
  }
}
</script>

<style>
.el-card__header{
    background-color: whitesmoke;
}
.el-card__body{
    background-color:#fdfdfd;
}
.rowImg {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>

