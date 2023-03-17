<template>
  <div class="container mt-20">
    <div class="items-center">
      <span class="mr-10">当前位置</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/${detail.movie.columnValue}/show`, query: { t: detail.movie.genres.split(',')[0] } }">{{ detail.movie.genres.split(',')[0] }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ detail.movie.title }} - {{ detail.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="40" class="mt-20">
      <el-col :span="18" :xs="24">
        <video style="width: 100%" :src="`/server/common/stream/${detail.videoInfo?.name}`" controls></video>
        <div>
          <h1 class="mb-10 mt-10">{{ detail.movie.title }} - {{ detail.title }}</h1>
          <el-form :inline="true">
            <el-form-item label="类型：">{{ detail.movie.genres }}</el-form-item>
            <el-form-item label="地区：">
              <template v-for="item in detail.country">{{ item.name }}&nbsp;</template>
            </el-form-item>
            <el-form-item label="年份：">{{ detail.movie.year }}</el-form-item>
          </el-form>
        </div>
        <div>
          <div class="panel_hd between items-center">
            <div class="panel_hd__left">
              <h3 class="title items-center">
                <el-icon><VideoCamera /></el-icon>相关视频
              </h3>
            </div>
          </div>
          <div class="related_video" v-if="detail.videos.length">
            <ul class="clearfix">
              <li v-for="item in detail.videos">
                <nuxt-link :to="`/${detail.movie.columnValue}/video/${item.id}`">
                  <el-image class="img" fit="cover" :src="item.cover || item.video?.poster"></el-image>
                  <p>{{+item.id === +route.params.id ? '正在播放: ' : '' }}{{ item.title }}</p>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-20">
          <div class="panel_hd between items-center">
            <div class="panel_hd__left">
              <h3 class="title items-center">
                <el-icon><VideoCamera /></el-icon><a href="/">猜你喜欢</a>
              </h3>
            </div>
          </div>
          <div class="video-list">
            <el-row :gutter="20">
              <el-col :sm="4" :xs="8" v-for="item in likeRows">
                <div class="video-list__block">
                  <nuxt-link :to="`/${item.columnValue}/movie/${item.id}`">
                    <el-image class="video-list__block__img" :src="item.poster || runtimeConfig.public.apiBase + '/default.jpg'" fit="cover" />
                  </nuxt-link>
                  <div class="video-list__detail">
                    <h4 class="title text-overflow">{{ item.title }}</h4>
                    <p class="text-overflow">
                      <template v-for="actor in item.casts">
                        {{ actor.actor.name }}
                      </template>
                    </p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down">
        <div class="qr_code items-center column mb-20">
          <qrcode-vue :value="qrcodeUrl" :size="160" level="H" />
          <p class="mt-10">扫描二维码用手机观看</p>
        </div>
        <!--   周榜单     -->
        <div class="panel_hd items-center">
          <h3 class="title items-center">
            周榜单
          </h3>
        </div>
        <ul class="col-pd mb-20">
          <li v-for="(item, index) in weekList">
            <nuxt-link :to="`/${item.columnValue}/movie/${item.id}`" class="between">
              <div>
                <span class="badge">{{ index + 1 }}</span>
                {{ item.title }}
              </div>
              <span class="text-muted">{{ +item.theEnd === 0 ? '未完结' : '已完结' }}</span>
            </nuxt-link>
          </li>
        </ul>
        <!--   月榜单     -->
        <div class="panel_hd items-center">
          <h3 class="title items-center">
            月榜单
          </h3>
        </div>
        <ul class="col-pd">
          <li v-for="(item, index) in monthList">
            <nuxt-link :to="`/${item.columnValue}/movie/${item.id}`" class="between">
              <div>
                <span class="badge">{{ index + 1 }}</span>
                {{ item.title }}
              </div>
              <span class="text-muted">{{ +item.theEnd === 0 ? '未完结' : '已完结' }}</span>
            </nuxt-link>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { VideoCamera } from '@element-plus/icons-vue'
import QrcodeVue from 'qrcode.vue'

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const id = route.params.id

const qrcodeUrl = ref('')

onMounted(() => {
  qrcodeUrl.value = window.location.href
})

const { detail, likeRows, weekList, monthList } = await useHttp('/video', { query: { id } })
if (!detail) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    fatal: true
  })
}
</script>

<style lang="scss" scoped>
.title {
  .el-icon {
    margin-right: 15px;
  }
}
.related_video {
  overflow-x: auto;
  width: 100%;
  overflow-y: hidden;
  .img {
    width: 160px;
    height: 100px;
  }
  ul {
    white-space: nowrap;
    li {
      display: inline-block;
      margin-right: 20px;
      position: relative;
      p {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0,0,0,0.6);
        color: #ffffff;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
