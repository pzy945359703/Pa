<template>
  <div >
    <el-tabs type="border-card">
      <el-tab-pane label="全部订单">
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
              <el-button split-button @click="orderDetail(scope.row.id)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getAllOrderByUserId } from '../../api/order'

export default {
  data() {
    return {
      orderList: [],
      url: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    orderDetail(id) {
      this.$router.push({ name: 'orderItem', params: { id: id }})
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
    fetchData() {
      var userId = JSON.parse(sessionStorage.getItem('userInfo')).id
      getAllOrderByUserId(parseInt(userId)).then(res => {
        this.orderList = res.data.data
        this.orderList.forEach(element => {
          element.createTime = this.timefilters(element.createTime)
          element.orderCompleteTime = this.timefilters(element.orderCompleteTime)
          element.testCompleteTime = this.timefilters(element.testCompleteTime)
          element.testPredictTime = this.timefilters(element.testPredictTime)
        })
      })
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
</style>
