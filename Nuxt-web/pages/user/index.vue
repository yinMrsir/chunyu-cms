<template>
  <div class="container user-index">
    <Head>
      <Title>个人中心 - {{ globalTitle }}</Title>
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
        <el-card class="integral">
          <template #header>
            <div class="card-header">
              <div>
                金币
                <span>50</span>
              </div>
              <el-button class="button" text size="small">
                详情
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </div>
          </template>
          <el-button type="primary">购买</el-button>
          <el-button type="primary">签到领金币</el-button>
        </el-card>
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
import { ArrowRight } from '@element-plus/icons-vue'
import CollectData from '@/components/user/CollectData.vue'

definePageMeta({
  middleware: ["auth"]
})
const { globalTitle } = useRuntimeConfig()
const userInfo = useCookie('userInfo')
const activeName = ref<string>('collect')

const { data: user } = await useFetch('/api/user/info', {
  headers: {
    Authorization: 'Bearer ' + userInfo.value.token
  },
  pick: ['email', 'userId']
})

// 获取用户是否签到
const { data } = await useFetch('/api/user/sign/getSign', {
  headers: {
    Authorization: 'Bearer ' + userInfo.value.token
  }
})
console.log(data)

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
  .el-card.is-always-shadow {
    box-shadow: none;
    border-radius: 0;
    border: 0;
  }
  .integral {
    margin: 10px 0;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #F66C25;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
}
@media (max-width: 768px){
  .user-index {
    margin-top: -60px;
    &__head {
      margin: 0 -15px;
    }
    .integral {
      margin: 10px -15px;
    }
  }
}
</style>
