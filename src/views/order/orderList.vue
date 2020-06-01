<template>
  <div>
    <el-table
      :data="orderList"
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
        label="订单ID"
      />
      <el-table-column
        align="center"
        prop="createTime"
        label="订单创建时间"
      />
      <el-table-column
        align="center"
        prop="testCompleteTime"
        label="测试完成时间"
      />
      <el-table-column
        align="center"
        prop="orderCompleteTime"
        label="订单完成时间"/>
      <el-table-column
        align="center"
        prop="phone"
        label="客户电话"/>
      <el-table-column
        align="center"
        prop="deleted"
        label="订单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='1'">等待商家确认</span>
          <span v-if="scope.row.status=='2'">测试中</span>
          <span v-if="scope.row.status=='3'">测试完成</span>
          <span v-if="scope.row.status=='4'">订单完成</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-dropdown split-button @click="handleViewDetail(scope.row.id)">
            详情
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.status=='2'" @click.native="openEnterDialog(scope.row)">录入结果</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.status=='1'" @click.native="confirmOrder(scope.row.id)">商家确认</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      :show-close="false"
      title="我是标题">
      <el-form ref="form" :model="inputResultBody" label-width="80px">
        <div v-for="(item,index) in inputResultBody.parameters" :key="index">
          <el-form-item :label="item.param">
            <el-input v-model="item.value" @input="updateView($event)"/>
          </el-form-item>
        </div>
        <div>
          <span class="metaTitle">请上传附件(限制4张)：</span>
          <el-upload
            ref="upload"
            :on-success="handleSuccess"
            :file-list="fileList"
            :limit="4"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF"
            class="upload-demo"
            action="http://120.26.88.248:8082/common/uploadFile"
            list-type="picture-card">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </div>
        <el-form-item>
          <el-button type="primary" @click="inputTestResult">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getPorjectInfo } from '../../api/project'
import { getAllOrder, deleteOrder, uploadStatus } from '../../api/order'
import { enterTestResult } from '../../api/param'
import { getUserInfo } from '../../api/user'

export default {
  data() {
    return {
      orderList: [],
      drawer: false,
      inputResultBody: {},
      fileList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除该图片码？`)
    },
    handleRemove(file, fileList) {
      this.inputResultBody.photos = fileList.map(item => {
        return item.url
      }).join('||')
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 4 个文件`)
    },
    handleSuccess(res, file, fileList) {
      if (res.code === '200') {
        this.$notify({
          title: '提示',
          message: '附件上传成功'
        })
        this.inputResultBody.photos = this.inputResultBody.photos ? this.inputResultBody.photos + '||' + res.data : res.data
      }
    },
    timefilters(val) {
      if (val === null || val === '') {
        return '暂无时间'
      } else {
        const d = new Date(val) // val 为表格内取到的后台时间
        const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
        const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
        const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
        const times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
        return times
      }
    },
    openEnterDialog(orderItem) {
      this.inputResultBody = {}
      this.inputResultBody.orderId = orderItem.id
      getPorjectInfo({ id: orderItem.projectId }).then(res => {
        var contentList = res.data.data.contentList
        var paramList = []
        contentList.forEach(element => {
          paramList.push({
            param: element.name, value: ''
          })
        })
        paramList.push({ param: '结论', value: '' })
        this.inputResultBody.parameters = paramList
        this.drawer = true
      })
    },
    fetchData() {
      getAllOrder().then(res => {
        if (res.data.code === '200') {
          this.orderList = res.data.data
          this.orderList.forEach(element => {
            getUserInfo(element.userId).then(res => {
              element.phone = res.data.data.phone
            })
            element.createTime = this.timefilters(element.createTime)
            element.orderCompleteTime = this.timefilters(element.orderCompleteTime)
            element.testCompleteTime = this.timefilters(element.testCompleteTime)
            element.testPredictTime = this.timefilters(element.testPredictTime)
          })
          console.log(this.orderList)
        } else {
          this.$notify({
            title: '提示',
            message: '获取项目列表失败'
          })
        }
      })
    },
    confirmOrder(id) {
      uploadStatus({ id: id, status: '2' }).then(res => {
        if (res.data.code === '200') {
          this.$message({
            type: 'success',
            message: '确认成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.data
          })
        }
        this.fetchData()
      })
    },
    handleViewDetail(id) {
      this.$router.push({ name: 'orderItem', params: { id: id }})
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrder(item.id).then(res => {
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
    inputTestResult() {
      enterTestResult(this.inputResultBody).then(res => {
        if (res.data.code === '200') {
          this.$message({
            type: 'success',
            message: '录入成功!'
          })
          this.fetchData()
          this.drawer = false
        } else {
          this.$message({
            type: 'error',
            message: res.data.data
          })
        }
      })
    },
    updateView(e) {
      this.$forceUpdate()
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
