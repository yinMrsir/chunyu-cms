<template>
  <div class="container mt-20">
    <Head>
      <Title>{{ detail.movie.title }}_{{ detail.title }}在线观看 - {{ globalTitle }}</Title>
      <Meta name="description" :content="detail.movie.summary" />
    </Head>

    <div class="items-center">
      <span class="mr-10">当前位置</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/c-${detail.movie.columnValue}/show`, query: { t: detail.movie.genres.split(',')[0] } }">{{ detail.movie.genres.split(',')[0] }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ detail.movie.title }} - {{ detail.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="40" class="mt-20">
      <el-col :span="18" :xs="24">
        <div id="mse"></div>
        <div>
          <h1 class="mb-10 mt-10 video-detail__title">
            {{ detail.title }}
            <span :class="detail.movie.rateUserCount > 0 ? 'rate' : ''">{{ detail.movie.rateUserCount > 0 ? detail.movie.rate.toFixed(1) : '暂无评分' }}</span>
          </h1>
          <el-form :inline="true">
            <el-form-item label="类型:">{{ detail.movie.genres }}</el-form-item>
            <el-form-item label="地区:">
              <template v-for="item in detail.country">{{ item.name }}&nbsp;</template>
            </el-form-item>
            <el-form-item label="年份:">{{ detail.movie.year }}</el-form-item>
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
                <nuxt-link :to="`/c-${detail.movie.columnValue}/video/${item.id}`">
                  <el-image class="img" fit="cover" :src="item.cover || item.video?.poster"></el-image>
                  <p :title="item.title"><span :class="+item.id === +route.params.id ? 'animate' : ''">{{+item.id === +route.params.id ? '正在播放: ' : '' }}{{ item.title }}</span></p>
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
              <el-col :sm="4" :xs="8" v-for="item in likeRows.rows">
                <div class="video-list__block">
                  <nuxt-link :to="`/c-${item.columnValue}/movie/${item.id}`">
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
          <li v-for="(item, index) in weekList.rows">
            <nuxt-link :to="`/c-${item.columnValue}/movie/${item.id}`" class="between">
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
          <li v-for="(item, index) in monthList.rows">
            <nuxt-link :to="`/c-${item.columnValue}/movie/${item.id}`" class="between">
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

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { VideoCamera } from '@element-plus/icons-vue'
import QrcodeVue from 'qrcode.vue'
import {useFetch} from "nuxt/app";
import dayjs from "dayjs";
import {IResData, IResPage} from "~/global";
import 'xgplayer/dist/index.min.css'
import 'xgplayer/es/plugins/danmu/index.css'
import '../../../plugins/xgplayerPlugins/payTipPlugin.css'

const userInfo = useCookie<{ token: string }>('userInfo')
const loginDialogVisible = useLoginDialogVisible()

const runtimeConfig = useRuntimeConfig()
const {public: publicConfig} = runtimeConfig
const {apiBase, globalTitle} = publicConfig

const route = useRoute()
const id = route.params.id
const qrcodeUrl = ref('')
// 是否购买了影片
const isUserBuy = ref(false)

const currTime = dayjs().format('YYYY-MM-DD')
const weekStartTime = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
const mouthStartTime = dayjs().subtract(30, 'day').format('YYYY-MM-DD')

const { data: detailRes } = await useFetch<IResData<any>>(apiBase + `/movie/videos/${id}`)
if (!detailRes.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    fatal: true
  })
}
const detail = detailRes.value.data

/** 查询用户是否购买影片 */
if (userInfo.value) {
  const { data: userBuy } = await useFetch<IResData<any>>(apiBase + `/user-movie`, {
    query: { movieId: detail.movieId },
    headers: {
      Authorization: userInfo.value ? 'Bearer ' + userInfo.value.token : ''
    },
  })
  isUserBuy.value = !!userBuy.value?.data
}

onMounted(async () => {
  qrcodeUrl.value = window.location.href

  const [Player, Mp4Plugin, Danmu, PayTip] = await Promise.all([
    import('xgplayer'),
    import("xgplayer-mp4"),
    import('xgplayer/es/plugins/danmu'),
    import('~/plugins/xgplayerPlugins/payTipPlugin')
  ])
  const player = new Player.default({
      id: 'mse',
      autoplay: true,
      volume: 0.3,
      url: `/server/common/stream/${detail.videoInfo?.name}`,
      playsinline: true,
      height: '100%',
      width: '100%',
      plugins: [Mp4Plugin.default, Danmu.default, PayTip.default],
      mp4plugin: {
        maxBufferLength: 30,
        minBufferLength: 5,
        chunkSize: 5000,
        reqOptions:{
          mode: 'cors',
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + userInfo.value?.token
          },
        }
      },
      danmu: {
        comments: [
          {
            duration: 15000,
            id: '1',
            start: 3000,
            txt: '好看，精彩！！！',
            //弹幕自定义样式
            style: {
              color: '#ff9500',
              fontSize: '20px',
              border: 'solid 1px #ff9500',
              borderRadius: '50px',
              padding: '5px 11px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }
        ],
        area: {
          start: 0,
          end: 1
        }
      },
      payTipPlugin: {
        tip: `此为付费视频，支付${detail.movie.paymentAmount}金币继续观看？`,
        lookTime: detail.movie.freeDuration * 60,
        arriveTime (callback: () => void) {
          if (isUserBuy.value) return
          if (+detail.movie.isPay === 1) {
            player.pause()
            callback()
          }
        },
        clickButton (callback: () => void) {
          if (!userInfo.value?.token) {
            loginDialogVisible.value = true
          } else {
            buyMovie(player, () => {
              callback()
            })
          }
        }
      }
    })
})

/** 购买影视 */
function buyMovie(player: any, callback: { (): void; (): void; }) {
  ElMessageBox.confirm(
    `确定要支付${detail.movie.paymentAmount}金币购买此影片吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    const { code, msg } = await $fetch<IResData<any>>(apiBase + `/user-movie`, {
      method: 'post',
      body: { movieId: detail.movieId },
      headers: {
        Authorization: userInfo.value ? 'Bearer ' + userInfo.value.token : ''
      },
    })
    if (code === 200) {
      isUserBuy.value = true
      player.play()
      callback()
      ElMessage({
        type: 'success',
        message: '购买成功',
      })
    } else {
      ElMessage({
        type: 'error',
        message: msg,
      })
    }
  })
}

/** 获取猜你喜欢、周榜单、月榜单数据 */
const [
  { data: likeRows },
  { data: weekList },
  { data: monthList }
] = await Promise.all([
  useFetch<IResPage<any[]>>(`${apiBase}/movie/list`, {
    query: {
      genres: detail.movie.genres.split(',')[0],
      pageNum: 1,
      pageSize: 18,
    }
  }),
  useFetch<IResPage<any[]>>(`${apiBase}/movie/list`, {
    query: {
      columnValue: detail.movie.columnValue,
      pageNum: 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [weekStartTime, currTime]
    }
  }),
  useFetch<IResPage<any[]>>(`${apiBase}/movie/list`, {
    query: {
      columnValue: detail.movie.columnValue,
      pageNum: 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [mouthStartTime, currTime]
    }
  })
])
</script>

<style lang="scss" scoped>
#mse {
  width: 100%;
  height: 500px !important;
  background: #000;
}
@media (max-width: 768px) {
  #mse {
    height: 300px !important;
  }
}
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
      overflow: hidden;
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
.animate {
  padding-left: 20px;
  white-space: nowrap;
  display: inline-block;
  animation: 15s wordsLoop linear infinite normal;
  color: #ffffff;
}

@keyframes wordsLoop {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}

@-webkit-keyframes wordsLoop {
  0% {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
  }
  100% {
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
  }
}

.video-detail__title {
  line-height: 1.2;

  span {
    color: $light-gray;
    font-size: 14px;
    &.rate {
      font-size: 24px;
      color: #06d706;
    }
  }
}
</style>
