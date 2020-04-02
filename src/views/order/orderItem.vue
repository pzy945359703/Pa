<template>
  <div >
    <el-card>
      <div style="margin:40px auto;width:90%;color:#999;font-size:12px">
        <span>订单号：{{ orderId }}</span>
        <el-divider direction="vertical"/>
        <span>下单时间：{{ createOrderTime }}</span>
        <div style="float:right">
          <el-button round size="small">申请售后</el-button>
          <el-button round size="small">打印测试结果</el-button>
          <el-button round size="small">评价</el-button>
        </div>
      </div>
      <el-steps :active="4" align-center finish-status="success">
        <el-step :description="createOrderTime" title="提交订单"/>
        <el-step :description="paymentTime" title="支付完成"/>
        <el-step title="测试完成" />
        <el-step :description="completeTime" title="交易完成" />
      </el-steps>
      <div style="margin-left:auto;margin-right:auto;width:90%">
        <div style="margin:20px 0px">
          商品信息
        </div>
        <el-table
          :data="tableData"
          :header-cell-style="{background:'#F5F7FA',color:'#606266',borderRight: '0px '}"
          :summary-method="getSummaries"
          style="width: 100%;margin-bottom:40px"
          show-summary>
          <el-table-column
            prop="content"
            label="测试内容"
          />
          <el-table-column
            prop="unitPrice"
            label="单价"
          />
          <el-table-column
            prop="amount"
            label="数量"/>
          <el-table-column
            prop="subTotal"
            label="小计(元)"/>
          <el-table-column
            prop="actualPayment"
            label="实付（元）"/>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: 4,
      createOrderTime: '2020-03-21 17:08:35',
      paymentTime: '2020-03-22 17:08:35',
      completeTime: '2020-03-26 17:08:35',
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
      ]
    }
  },
  methods: {
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
