<template>
  <div class="container user-index">
    <Head>
      <Title>个人中心 - {{ runtimeConfig.public.globalTitle }}</Title>
      <Style type="text/css" children="body { background-color: #f7f7f7; }" />
    </Head>
    <el-row :gutter="30" class="mt-20">
      <el-col :md="6" :xs="24">
        <UserInfoData />
        <el-card class="integral">
          <template #header>
            <div class="card-header">
              <div>
                金币
                <span>{{ goldData.data?.gold || 0 }}</span>
              </div>
              <el-button class="button" text size="small" @click="handleGoWalletLog">
                详情
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </div>
          </template>
          <el-button type="primary" @click="handleBuy">购买</el-button>
          <el-button type="primary" @click="handleSign">{{ signData.data ? '已签到' : '签到领金币' }}</el-button>
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
import { ElMessage } from "element-plus"
import { ArrowRight } from '@element-plus/icons-vue'
import CollectData from '@/components/user/CollectData.vue'
import UserInfoData from "~/components/user/UserInfoData.vue";
import {useToken} from "~/composables/states";

definePageMeta({
  middleware: ["auth"]
})
const runtimeConfig = useRuntimeConfig()
const token = useToken()
const activeName = ref<string>('collect')
const headers = {
  Authorization: token.value
}

const [
  { data: signData, refresh },
  { data: goldData, refresh: refreshGold }
] = await Promise.all([
  // 获取用户是否签到
  useFetch<{ data: null | number }>(runtimeConfig.public.apiBase + '/user-sign/getSign', { headers }),
  // 获取用户金币数量
  useFetch<{ data: { gold: number } }>(runtimeConfig.public.apiBase + '/user-wallet/findGold', { headers })
])

// 用户签到
async function handleSign() {
  if (signData.value?.data) return;
  const { code, msg, data } = await $fetch<{ code: number; msg: string; data: any }>(runtimeConfig.public.apiBase + '/user-sign/sign', { headers })
  ElMessage({
    message: code === 200 ? `签到成功, ${data.signReward}` : msg,
    type: code === 200 ? 'success' : 'error'
  })
  if (code === 200) {
    refresh();
    refreshGold()
  }
}

function handleBuy() {
  ElMessage({
    message: '支付功能正在开发,敬请期待...',
    type: 'info'
  })
}

function handleGoWalletLog() {
  navigateTo({ path: '/user/wallet-log' })
}
</script>

<style lang="scss" scoped>
.user-index {
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
    .integral {
      margin: 10px -15px;
    }
  }
}
</style>

