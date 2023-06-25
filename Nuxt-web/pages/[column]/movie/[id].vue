<template>
  <div class="container mt-20">
    <Head>
      <Title>{{ data.detail.title }}在线观看 - {{ runtimeConfig.public.globalTitle }}</Title>
      <Meta name="description" :content="data.detail.summary" />
    </Head>

    <div class="items-center">
     <span class="mr-10">当前位置</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/${data.detail.columnValue}/show`, query: { t: data.detail.genres?.split(',')[0] } }">{{ data.detail.genres?.split(',')[0] }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ data.detail.title.length > 12 ? data.detail.title.substr(0, 12) + '...' : data.detail.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="40" class="mt-20">
     <el-col :span="18" :xs="24">
       <h1 class="movie-detail-title hidden-sm-and-up">{{ data.detail.title }} <span :class="data.detail.rateUserCount > 0 ? 'rate' : ''">{{ data.detail.rateUserCount > 0 ? data.detail.rate.toFixed(1) : '暂无评分' }}</span></h1>
       <div class="clearfix">
         <div class="movies-pic">
           <el-image :src="data.detail.poster" fit="cover" style="width: 100%"></el-image>
         </div>
         <div class="movies-info">
           <h1 class="hidden-sm-and-down">{{ data.detail.title }} <span :class="data.detail.rateUserCount > 0 ? 'rate' : ''">{{ data.detail.rateUserCount > 0 ? data.detail.rate.toFixed(1) : '暂无评分' }}</span></h1>
           <el-form :inline="true" label-position="right">
             <el-form-item label="类型:">{{ data.detail.genres }}</el-form-item>
             <el-form-item label="地区:">
               <template v-for="item in data.detail.country">
                 {{ item.name }} &nbsp;
               </template>
             </el-form-item>
             <el-form-item label="年份:">{{ data.detail.year || '-' }}</el-form-item>
           </el-form>
           <el-form label-position="right">
             <el-form-item label="别名:" v-if="data.detail.akas">
               <div class="text-overflow">{{ data.detail.akas.split(',').join('/') }}</div>
             </el-form-item>
             <el-form-item label="标签:" v-if="data.detail.tags">
               <div class="text-overflow">{{ data.detail.tags.split(',').join('/') }}</div>
             </el-form-item>
             <div>
               <nuxt-link :to="`/${data.detail.columnValue}/video/${data.detail.movieVideos[0].id}`" v-if="data.detail.movieVideos[0]">
                <el-button :icon="VideoPlay" type="primary" class="mr-10">播放</el-button>
               </nuxt-link>
               <el-button :icon="isCollect ? StarFilled : Star" @click="handleCollect">{{ isCollect ? '已收藏' : '收藏' }}</el-button>
               <ClientOnly>
                 <el-popover v-if="!userRateData" placement="right" trigger="click">
                   <template #reference>
                     <el-button :icon="Edit">评分</el-button>
                   </template>
                   <el-rate allow-half v-model="rate" @change="onRatechange" />
                 </el-popover>
               </ClientOnly>
             </div>
           </el-form>
         </div>
       </div>
       <div class="mt-20" v-if="data.detail.movieVideos && data.detail.movieVideos.length">
         <div class="panel_hd between items-center">
           <div class="panel_hd__left">
             <h3 class="title items-center">
               <i class="icon-movie-box"></i>相关视频
             </h3>
           </div>
         </div>
         <div class="related_video">
           <ul class="clearfix">
             <li v-for="item in data.detail.movieVideos">
               <nuxt-link :to="`/${data.detail.columnValue}/video/${item.id}`">
                 <el-image class="img" :src="item.cover || item.video?.poster"></el-image>
                 <p :title="item.title">{{ item.title }}</p>
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
         <div class="desc" v-html="escapeHtml(data.detail.summary)"></div>
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
import { Star, StarFilled, VideoPlay, Edit } from '@element-plus/icons-vue'
import QrcodeVue from 'qrcode.vue'
import {useFetch} from "nuxt/app";
import {ElMessage} from "element-plus";
import {useIsLogin} from "../../../composables/states";

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const isLogin = useIsLogin()
const id = route.params.id
const qrcodeUrl = ref('')
const roles = ref([])
const casts = ref([])
const weekList = ref([])
const monthList = ref([])
const isCollect = ref(false)
const userRateData = ref(null)
const rate = ref()

onMounted(() => {
  qrcodeUrl.value = window.location.href
})

const { data, refresh } = await useFetch('/api/movie', { query: { id } })
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    fatal: true
  })
}
roles.value = data.value.roles
casts.value = data.value.casts
weekList.value = data.value.weekList
monthList.value = data.value.monthList

watch(isLogin, (value) => {
  if (value) {
    getUserCollect()
    getUserRate()
  }
})

// 获取用户收藏状态
async function getUserCollect() {
  const userInfo = useCookie('userInfo')
  if (!userInfo.value) return
  const { data: userCollect } = await useFetch('/api/user/collect/find', {
    query: { id },
    headers: {
      Authorization: userInfo.value ? 'Bearer ' + userInfo.value.token : ''
    },
  })
  isCollect.value = !!userCollect.value.data
}
getUserCollect()

// 收藏
async function handleCollect() {
  const userInfo = useCookie('userInfo')
  if (!userInfo.value) {
    ElMessage({
      message: '请先登录',
      type: 'warning'
    })
  } else {
    const { code, msg } = await $fetch(isCollect.value ? '/api/user/collect/cancel' : '/api/user/collect/add', {
      query: { id },
      headers: {
        Authorization: userInfo.value ? 'Bearer ' + userInfo.value.token : ''
      },
    })
    if (code === 200) {
      isCollect.value = !isCollect.value
    } else {
      ElMessage({
        message: msg,
        type: 'error'
      })
    }
  }
}

// 获取用户评分状态
async function getUserRate() {
  const userInfo = useCookie('userInfo')
  if (!userInfo.value) return
  const { data: userRate } = await useFetch('/api/user/rate/find', {
    query: { id },
    headers: {
      Authorization: userInfo.value ? 'Bearer ' + userInfo.value.token : ''
    },
  })
  userRateData.value = userRate.value.data
}
getUserRate()

// 设置评分
async function onRatechange(value) {
  if (!value) return
  const userInfo = useCookie('userInfo')
  if (!userInfo.value) {
    ElMessage({
      message: '请先登录',
      type: 'warning'
    })
    rate.value = 0
  } else {
    const { code, msg } = await $fetch('/api/user/rate/create', {
      method: 'post',
      body: { id, rate: rate.value },
      headers: {
        Authorization: userInfo.value ? 'Bearer ' + userInfo.value.token : ''
      },
    })
    if (code === 200) {
      refresh()
      userRateData.value = { movieId: id, rate: rate.value }
    } else {
      ElMessage({
        message: msg,
        type: 'error'
      })
    }
  }
}

function escapeHtml(str) {
  let temp = "";
  if(str.length == 0) return "";
  temp = str.replace(/&amp;/g,"&");
  temp = temp.replace(/&lt;/g,"<");
  temp = temp.replace(/&gt;/g,">");
  temp = temp.replace(/&nbsp;/g," ");
  temp = temp.replace(/&#39;/g,"\'");
  temp = temp.replace(/&quot;/g,"\"");
  return temp;
}

</script>

<style lang="scss" scoped>
.movies-pic {
  width: 190px;
  margin-right: 20px;
  float: left;
}
.movie-detail-title {
  color: #333;
  font-size: 22px;
  margin-bottom: 10px;
  line-height: 1.2 ;
  span {
    color: $light-gray;
    font-size: 14px;
    &.rate {
      font-size: 24px;
      color: #06d706;
    }
  }
}
.movies-info {
  h1 {
    color: #333;
    font-size: 22px;
    margin-bottom: 10px;
    line-height: 1.2 ;
    padding-top: 0;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  span {
    color: $light-gray;
    font-size: 14px;
    &.rate {
      font-size: 24px;
      color: #06d706;
    }
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
    width: 120px;
    margin-right: 10px;
  }
}
</style>
