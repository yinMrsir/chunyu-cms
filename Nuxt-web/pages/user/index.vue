<template>
  <div class="container user-index">
    <Head>
      <Title>{{ $titleRender('个人中心') }}</Title>
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
                <el-icon><ElIconArrowRight /></el-icon>
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
import CollectData from '@/components/user/CollectData.vue'
import UserInfoData from "~/components/user/UserInfoData.vue";
import { useToken } from "~/composables/states";
import { useServerRequest } from "~/composables/useServerRequest";
import { useClientRequest } from "~/composables/useClientRequest";

definePageMeta({
  middleware: ["auth"]
})

const token = useToken()
const activeName = ref<string>('collect')

const [
  { data: signData, refresh },
  { data: goldData, refresh: refreshGold }
] = await Promise.all([
  // 获取用户是否签到
  useServerRequest<{ data: null | number }>('/user-sign/getSign'),
  // 获取用户金币数量
  useServerRequest<{ data: { gold: number } }>('/user-wallet/findGold')
])

// 用户签到
async function handleSign() {
  if (signData.value?.data) return;
  const { code, data } = await useClientRequest<{ code: number; msg: string; data: any }>('/user-sign/sign')
  if (code === 200) {
    refresh();
    refreshGold()
    ElMessage({
      message: `签到成功, ${data.signReward}`,
      type: 'success'
    })
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

