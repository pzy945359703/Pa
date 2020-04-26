<template>
  <div >
    <el-tabs type="border-card">
      <el-tab-pane label="全部订单">
        <div v-for="item in orderList" :key="item.id">
          <el-table
            :show-header="true"
            :data="item.orderItem"
            :header-cell-style="{background:'#F5F7FA',color:'#606266',borderRight: '0px '}"
            border
            style="width: 100%;margin:30px 0px">
            <el-table-column>
              <template slot="header" >
                <span style="margin-right:10px">下单时间：{{ item.orderTime }}</span> <span>订单编号：{{ item.id }}</span>
              </template>
              <template slot-scope="scope">
                <div style="margin: auto;display:inline;vertical-align: top">{{ scope.row.testName }}</div>
                <!-- <el-image
                  :src="url"
                  fit="fill"
                  style="width: 100px; height: 100px;"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"/>
                  </div>
                </el-image> -->
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              align="center">
              <template slot-scope="scope">
                <div>{{ scope.row.name }}</div>
                <div>{{ item.state }}</div>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              align="center">
              <template slot-scope="scope">
                <div>
                  ￥{{ scope.row.money }}
                </div>
                <div>
                  {{ scope.row.paymentMethod }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="150px"
              align="center">
              <template >
                <div>
                  <span>查看详情</span>
                </div>
                <div v-if="item.state=='已完成'">
                  <span>申请售后</span>
                </div>
                <div v-if="item.state=='测试中'">
                  <span>取消订单</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待测试">3</el-tab-pane>
      <el-tab-pane label="待收货">2</el-tab-pane>
      <el-tab-pane label="已完成">1</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getAllOrderByUserId } from '../../api/order'

export default {
  data() {
    return {
      orderList: [
        {
          id: 1,
          orderTime: '2020-01-02 21:50:32',
          orderItem: [{
            testName: '高空飞行测试-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            tag: '家',
            money: 400
          }, {
            testName: '高空飞行测试-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            tag: '公司',
            money: 400
          }, {
            testName: '高空飞行测试-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            tag: '家',
            money: 200
          }, {
            testName: '高空飞行测试-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            tag: '公司',
            money: 299
          }],
          state: '已完成'
        }, {
          id: 2,
          orderTime: '2020-01-03 21:50:32',
          orderItem: [{
            testName: '高空飞行测试-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            tag: '家',
            money: 500,
            state: '已完成'
          }, {
            testName: '高空飞行测试-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            tag: '家',
            money: 400,
            state: '已完成'
          }, {
            testName: '高空飞行测试-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            tag: '公司',
            money: 100
          }],
          state: '测试中'
        }
      ],
      url: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var userId = JSON.parse(sessionStorage.getItem('userInfo')).id
      getAllOrderByUserId(parseInt(userId)).then(res => {
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex !== 0) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else {
          return {
            rowspan: 4,
            colspan: 1
          }
        }
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
</style>
