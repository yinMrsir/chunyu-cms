<template>
  <div class="container mt-20">
    <Head>
      <Title>{{ detail.title }}在线观看 - {{ globalTitle }}</Title>
      <Meta name="description" :content="detail.summary" />
    </Head>

    <div class="items-center">
     <span class="mr-10">当前位置</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/${detail.columnValue}/show`, query: { t: detail.genres?.split(',')[0] } }">{{ detail.genres?.split(',')[0] }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ detail.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="40" class="mt-20">
     <el-col :span="18" :xs="24">
       <div class="clearfix">
         <div class="movies-pic">
           <el-image :src="detail.poster" fit="cover"></el-image>
         </div>
         <div class="movies-info">
           <h1>{{ detail.title }}</h1>
           <el-form :inline="true" label-position="right">
             <el-form-item label="类型：">{{ detail.genres }}</el-form-item>
             <el-form-item label="地区：">
               <template v-for="item in detail.country">
                 {{ item.name }} &nbsp;
               </template>
             </el-form-item>
             <el-form-item label="年份：">{{ detail.year }}</el-form-item>
           </el-form>
           <el-form label-position="right">
             <el-form-item label="别名：" v-if="detail.akas">
               <el-tag v-for="(tag, index) in detail.akas.split(',')" :key="index" class="mr-10">{{ tag }}</el-tag>
             </el-form-item>
             <el-form-item label="标签：" v-if="detail.tags">
               <el-tag v-for="(tag, index) in detail.tags.split(',')" :key="index" class="mr-10">{{ tag }}</el-tag>
             </el-form-item>
             <el-form-item label="更新：">{{ $dayjs(detail.updateTime).format('YYYY-MM-DD') }}</el-form-item>
             <div>
               <nuxt-link :to="`/${detail.columnValue}/video/${detail.movieVideos[0].id}`" v-if="detail.movieVideos[0]">
                <el-button :icon="VideoPlay" type="primary">立即播放</el-button>
               </nuxt-link>
               <el-button :icon="Star" class="ml-10" @click="handleCollect">收藏</el-button>
             </div>
           </el-form>
         </div>
       </div>
       <div class="mt-20" v-if="detail.movieVideos && detail.movieVideos.length">
         <div class="panel_hd between items-center">
           <div class="panel_hd__left">
             <h3 class="title items-center">
               <i class="icon-movie-box"></i>相关视频
             </h3>
           </div>
         </div>
         <div class="related_video">
           <ul class="clearfix">
             <li v-for="item in detail.movieVideos">
               <nuxt-link :to="`/${detail.columnValue}/video/${item.id}`">
                 <el-image class="img" :src="item.cover || item.video?.poster"></el-image>
                 <p>{{ item.title }}</p>
               </nuxt-link>
             </li>
           </ul>
         </div>
       </div>
       <div class="mt-20">
         <div class="panel_hd between items-center">
           <div class="panel_hd__left">
             <h3 class="title items-center">
               <i class="icon-movie-box"></i>剧情简介
             </h3>
           </div>
         </div>
         <div class="desc" v-html="detail.summary">
         </div>
       </div>
       <!--  演员    -->
       <div class="mt-20" v-if="casts && casts.length">
         <div class="panel_hd between items-center">
           <div class="panel_hd__left">
             <h3 class="title items-center">
               <i class="icon-movie-box"></i>演员
             </h3>
           </div>
         </div>
         <div class="actor">
            <ul>
              <li v-for="item in casts">
                <el-image style="width: 110px; height: 156px;" fit="cover" :src="item.actorAvatar"></el-image>
                <div>{{ item.actorName }}</div>
                <div class="grey">{{ item.professionName }}</div>
              </li>
            </ul>
         </div>
       </div>
       <!--  角色   -->
       <div class="mt-20" v-if="roles && roles.length">
         <div class="panel_hd between items-center">
           <div class="panel_hd__left">
             <h3 class="title items-center">
               <i class="icon-movie-box"></i>角色
             </h3>
           </div>
         </div>
         <div class="actor">
           <ul>
             <li v-for="item in roles">
               <el-image style="width: 110px; height: 156px;" fit="cover" :src="item.avatar || item.role.avatar"></el-image>
               <div>{{ item.role.name }}</div>
             </li>
           </ul>
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
import { Star, VideoPlay } from '@element-plus/icons-vue'
import QrcodeVue from 'qrcode.vue'
import {useFetch} from "nuxt/app";
import {ElMessage} from "element-plus";

const { globalTitle } = useRuntimeConfig()
const route = useRoute()
const userInfo = useStore('userInfo')
const id = route.params.id
const qrcodeUrl = ref('')
const detail = ref({})
const roles = ref([])
const casts = ref([])
const weekList = ref([])
const monthList = ref([])

onMounted(() => {
  qrcodeUrl.value = window.location.href
})

const { data } = await useFetch('/api/movie', { query: { id } })
detail.value = data.value.detail
roles.value = data.value.roles
casts.value = data.value.casts
weekList.value = data.value.weekList
monthList.value = data.value.monthList

if (!detail) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    fatal: true
  })
}

// 收藏
function handleCollect() {
  if (!userInfo.value) {
    ElMessage({
      message: '请先登录',
      type: 'warning'
    })
  }
}

</script>

<style lang="scss" scoped>
.movies-pic {
  width: 190px;
  margin-right: 20px;
  float: left;
}
.movies-info {
  h1 {
    color: #333;
    font-size: 22px;
    margin-bottom: 10px;
    padding-top: 10px;
  }
  .el-form-item {
    margin-bottom: 5px;
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
.title {
  .el-icon {
    margin-right: 15px;
  }
}
.desc {
  line-height: 28px;
}
.actor {
  overflow-x: auto;
  width: 100%;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  ul {
    white-space: nowrap;
    li {
      display: inline-block;
      margin-right: 20px;
      width: 110px;
    }
  }
}

@media only screen and (max-width:991px) {
  .movies-pic {
    width: 100px;
    margin-right: 10px;
  }
}
</style>
