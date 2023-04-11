<template>
  <div class="container user-index">
    <Head>
      <Title>1</Title>
    </Head>
    <el-row :gutter="10">
     <el-col :span="6">
       <div class="over-avatar">5</div>
       <div class="user-index__personal-name">542968439@qq.com</div>
     </el-col>
      <el-col :span="18"></el-col>
    </el-row>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: false
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
}
</style>
