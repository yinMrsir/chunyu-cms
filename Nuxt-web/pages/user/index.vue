<template>
  <div class="container user-index">
    <Head>
      <Title>个人中心</Title>
      <Style type="text/css" children="body { background-color: #f7f7f7; }" />
    </Head>
    <ClientOnly>
      <el-row :gutter="30" class="mt-20">
        <el-col :span="6">
          <div class="bg-fff user-index__head flex">
            <img src="../../assets/images/toux.png" alt="">
            <div>
              {{ userInfo?.email }}
              <p class="grey">ID: 449892</p>
              <a class="lv lv1"></a>
            </div>
          </div>
        </el-col>
        <el-col :span="18" class="bg-fff">
          <el-tabs
              v-model="activeName"
              class="demo-tabs"
              @tab-click="handleClick"
          >
            <el-tab-pane label="我的收藏" name="first">我的收藏</el-tab-pane>
            <el-tab-pane label="我的点赞" name="second">我的点赞</el-tab-pane>
            <el-tab-pane label="我的评论" name="third">我的评论</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'

definePageMeta({
  middleware: ["auth"],
  layout: false
})
const activeName = ref('first')
const userInfo = ref({
  email: 11
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

if (process.client) {
  const { data } = await useFetch('/api/user/info')
  console.log(data)
  userInfo.value = data.value
}

</script>

<style lang="scss" scoped>
.user-index {
  .over-avatar {
    width: 160px;
    height: 160px;
    background: $drak-blue;
    border-radius: 50%;
    color: #FFFFFF;
    text-align: center;
    line-height: 160px;
    font-size: 60px;
    margin: 0 auto;
  }
  &__personal-name {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
  }
  &__head {
    padding: 20px;
    > img {
      width: 80px;
      margin-right: 20px;
    }
    .lv {
      background: url('../../assets/images/jlt.png') no-repeat 0 0;
      display: inline-block;
      width: 42px;
      height: 22px;
      vertical-align: middle;
      margin-top: 15px;
      &.lv1 {
        background-position: 0 -373px;
      }
    }
  }
}
</style>
