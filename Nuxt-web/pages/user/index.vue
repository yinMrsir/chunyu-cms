<template>
  <div class="container user-index">
    <Head>
      <Title>个人中心</Title>
      <Style type="text/css" children="body { background-color: #f7f7f7; }" />
    </Head>
    <el-row :gutter="30" class="mt-20">
      <el-col :md="6" :xs="24">
        <div class="bg-fff user-index__head flex">
          <img src="../../assets/images/toux.png" alt="">
          <div>
            {{ user?.email }}
            <p class="grey">ID: {{ user?.userId }}</p>
            <a class="lv lv1"></a>
          </div>
        </div>
      </el-col>
      <el-col :md="18" :xs="24" class="bg-fff">
        <el-tabs v-model="activeName">
          <el-tab-pane label="我的收藏" name="collect">
            <collect-data/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CollectData from '@/components/user/CollectData.vue'

definePageMeta({
  middleware: ["auth"]
})

const userInfo = useCookie('userInfo')
const activeName = ref<string>('collect')

const { data: user } = await useFetch('/api/user/info', {
  headers: {
    Authorization: 'Bearer ' + userInfo.value.token
  },
  pick: ['email', 'userId']
})
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
