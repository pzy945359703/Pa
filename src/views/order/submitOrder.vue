<template>
  <div>
    <el-card>
      <el-card header="联系信息">
        <div> 发起人：{{ userInfo.name }} </div>
        <div> 联系方式：{{ userInfo.phone }} </div>
      </el-card>
      <el-card style="margin:20px 0">
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
      </el-card>
      <el-card header="测试明细">
        <div style="padding-left:80%">
          <div >
            测试数量：{{ testContentCount }}
          </div>
          <div>
            测试总价：{{ projectInfo.price }}
          </div>
        </div>
      </el-card>
      <div style="margin-top:20px;padding-left:80%">
        <el-button type="danger" @click="submitOrder">提交订单</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addOrder } from '../../api/order'
import { getPorjectInfo } from '../../api/project'

export default {
  data() {
    return {
      userInfo: {},
      orderInfo: {
        userId: '',
        projectId: 0
      },
      projectInfo: {},
      contentList: [],
      testContentCount: 0
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.orderInfo.userId = this.userInfo.id
    this.orderInfo.projectId = this.$route.params.projectId
    getPorjectInfo({ id: this.$route.params.projectId }).then(res => {
      this.projectInfo = res.data.data
      this.orderInfo.price = this.projectInfo.price
      this.contentList = this.projectInfo.contentList
      this.testContentCount = this.contentList.length
      this.detailPictures = this.projectInfo.detailPicture.split('||')
    })
  },
  methods: {
    submitOrder() {
      addOrder(this.orderInfo).then(res => {
        if (res.data.code === '200') {
          this.$notify({
            title: '提示',
            message: '订单提交成功'
          })
        }
        this.$router.push({ name: 'index', params: { showAll: 'true', queryName: 'a' }})
      })
    }
  }
}
</script>

<style scoped>
.rowImg {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>
