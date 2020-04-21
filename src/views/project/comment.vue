<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="1" :offset="6">
          <div style="display:inline"><el-avatar :src="circleUrl" size="large"/></div>
        </el-col>
        <el-col :span="6">
          <div style="display:inline">{{ userName }}</div>
          <div style="font-size:12px;color:#999999">{{ commomentDateTime }} | {{ testType }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="7">
          <div>{{ commomentContent }}</div>
          <el-divider/>
          <el-input placeholder="评论一下吧">
            <template slot="append">回复</template>
          </el-input>
          <div style="padding:10px 0">
            <span>评价回复</span>
            <span>{{ commomentReply.length }}</span>
          </div>
          <div v-for="item in commomentReply " :key="item.index" style="margin-top:20px">
            <el-row>
              <el-col :span="2" >
                <div style="display:inline"><el-avatar :src="circleUrl" size="large"/></div>
              </el-col>
              <el-col :span="22">
                <div>{{ item.replyUser }}</div>
                <div>{{ item.replyContent }}</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      userName: '李某',
      commomentContent: '测试效率很快，昨天下单今天就收到了，下次还来',
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
  }
}
</script>
