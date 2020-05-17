<template>
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
        label="是否删除">
        <template slot-scope="scope">
          <span>{{ scope.row.deleted===true?'是':'否' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-dropdown split-button @click="handleViewDetail(scope.row.id)">
            详情
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllOrder, deleteOrder } from '../../api/order'
// import { getAllCommentByPrjectId } from '../../api/comment'

export default {
  data() {
    return {
      projectList: []
    }
  },
  beforeMount() {
    this.id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAllOrder().then(res => {
        if (res.data.code === '200') {
          this.projectList = res.data.data
          this.projectList.forEach(element => {
            element.createTime = new Date(new Date(element.createTime) + 8 * 1000 * 3600).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            element.orderCompleteTime = element.orderCompleteTime == null ? '无' : new Date(new Date(element.orderCompleteTime) + 8 * 1000 * 3600).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            element.testCompleteTime = element.testCompleteTime == null ? '无' : new Date(new Date(element.testCompleteTime) + 8 * 1000 * 3600).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            element.testPredictTime = element.testPredictTime == null ? '无' : new Date(new Date(element.testPredictTime) + 8 * 1000 * 3600).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          })
        } else {
          this.$notify({
            title: '提示',
            message: '获取项目列表失败'
          })
        }
      })
    },
    handleViewDetail(id) {
      this.$router.push({ name: 'orderItem', params: { id: id }})
    },
    handleDelete(item) {
      console.log(item)
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
