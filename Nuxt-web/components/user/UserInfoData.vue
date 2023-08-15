<template>
  <div class="bg-fff user-index__head flex">
    <img src="../../assets/images/toux.png" alt="">
    <div>
      {{ userData.data?.email }}
      <p class="grey">ID: {{ userData.data?.userId }}</p>
      <a class="lv lv1"></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useServerRequest } from "~/composables/useServerRequest";

// 获取用户信息
const { data: userData } = await useServerRequest<{ data: { email: string; userId: number } }>('/web/user/info')
</script>

<style lang="scss">
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
}
@media (max-width: 768px){
  .user-index {
    margin-top: -60px;
    &__head {
      margin: 0 -15px;
    }
  }
}
</style>
