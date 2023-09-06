<template>
  <div class="container mt-20">
    <Head>
      <Title>{{ $titleRender(`${detail.movie.title}_${detail.title}在线观看`) }}</Title>
      <Meta name="description" :content="detail.movie.summary" />
    </Head>

    <div class="items-center">
      <span class="mr-10">当前位置</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/column/${detail.movie.columnValue}/show`, query: { t: detail.movie.genres.split(',')[0] } }">{{ detail.movie.genres.split(',')[0] }}</el-breadcrumb-item>
        <el-breadcrumb-item class="hidden-sm-and-down">{{ detail.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="40" class="mt-20">
      <el-col :span="18" :xs="24">
        <div id="mse"></div>
        <div>
          <h1 class="mb-10 mt-10 video-detail__title">
            {{ detail.movie.title }} {{ detail.title }}
            <span :class="detail.movie.movieRate?.rateUserCount > 0 ? 'rate' : ''">
              {{ detail.movie.movieRate?.rateUserCount > 0 ? detail.movie.movieRate.rate.toFixed(1) : '暂无评分' }}
            </span>
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
                <el-icon><ElIconVideoCamera /></el-icon>相关视频
              </h3>
            </div>
          </div>
          <div class="related_video" v-if="detail.videos.length">
            <ul class="clearfix">
              <li v-for="item in detail.videos">
                <nuxt-link :to="`/column/${detail.movie.columnValue}/video/${item.id}`">
                  <el-image class="img" fit="cover" :src="item.cover || item.video?.poster || ''"></el-image>
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
                <el-icon><ElIconVideoCamera /></el-icon><a href="/">猜你喜欢</a>
              </h3>
            </div>
          </div>
          <div class="video-list">
            <el-row :gutter="20">
              <el-col :sm="4" :xs="8" v-for="item in likeRows.rows">
                <div class="video-list__block">
                  <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`">
                    <el-image class="video-list__block__img" :src="item.poster" fit="cover" />
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
        <Ranking title="周榜单" :list="rank.data.weekRank" />
        <!--   月榜单     -->
        <Ranking title="月榜单" :list="rank.data.mouthRank" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import QrcodeVue from 'qrcode.vue'
import 'xgplayer/dist/index.min.css'
import 'xgplayer/es/plugins/danmu/index.css'
import PresetPlayer from "xgplayer";
import { useServerRequest } from "~/composables/useServerRequest";
import { useClientRequest } from "~/composables/useClientRequest";
import { MovieVideoInfo } from "~/types/column/video";
import { UserMovieBase } from "~/types/column/movie";
import '~/plugins/xgplayer/payTip/index.css'
import PayTip from "~/plugins/xgplayer/payTip";

const token = useToken()
const loginDialogVisible = useLoginDialogVisible()

const route = useRoute()
const id = route.params.id
const qrcodeUrl = ref('')
// 是否购买了影片
const isUserBuy = ref(false)
// 视频支付提示插件
let payTipInstance: PayTip | null = null
// 视频组件
let player: PresetPlayer | null = null

const { data: detailRes } = await useServerRequest<ResData<MovieVideoInfo | null>>(`/movie/videos/${id}`)

if (!detailRes.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    fatal: true
  })
}
const detail = detailRes.value.data

/** 查询用户是否购买影片 */
getUserMovie()
async function getUserMovie() {
  if (token.value) {
    const { data: userBuy } = await useServerRequest<ResData<UserMovieBase>>(`/user-movie`, {
      query: { movieId: detail.movieId }
    })
    isUserBuy.value = !!userBuy.value?.data
  }
}

watch(token, async () => {
  await getUserMovie()
  payTipInstance?.hide()
  player?.play()
})

onMounted(async () => {
  qrcodeUrl.value = window.location.href

  const [Player, Mp4Plugin, Danmu, PayTip] = await Promise.all([
    import('xgplayer'),
    import("xgplayer-mp4"),
    import('xgplayer/es/plugins/danmu'),
    import('~/plugins/xgplayer/payTip')
  ])
  player = new Player.default({
    id: 'mse',
    controls: {
      autoHide: false
    },
    autoplay: true,
    volume: 0.3,
    url: process.env.NODE_ENV === 'development' ? detail.videoInfo?.url.replace('http://[::1]:4000', '/server') : detail.videoInfo?.url,
    playsinline: true,
    height: '100%',
    width: '100%',
    plugins: [Mp4Plugin.default, Danmu.default, PayTip.default],
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
    payTip: {
      tip: `此为付费视频，支付${detail.movie.paymentAmount}金币继续观看？`,
      lookTime: detail.movie.freeDuration * 60,
      arriveTime () {
        if (isUserBuy.value) return
        // 影片设置了需要购买才能观看并且是正片
        if (+detail.movie.isPay === 1 && +detail.typeId === 1) {
          player?.pause()
          payTipInstance?.show('flex')
        }
      },
      clickButton () {
        if (!token.value) {
          loginDialogVisible.value = true
        } else {
          player && buyMovie(player)
        }
      }
    }
  })
  payTipInstance = player.getPlugin('payTip')
})

/** 购买影视 */
function buyMovie(player: PresetPlayer) {
  ElMessageBox.confirm(
      `确定要支付${detail.movie.paymentAmount}金币购买此影片吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(async () => {
    const { code, msg } = await useClientRequest<ResData<UserMovieBase>>(`/user-movie`, {
      method: 'post',
      body: { movieId: detail.movieId }
    })
    if (code === 200) {
      isUserBuy.value = true
      player.play()
      payTipInstance?.hide()
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
  { data: rank },
] = await Promise.all([
  useServerRequest<ResPage<MovieItem[]>>(`/movie/list`, {
    query: {
      genres: detail.movie.genres.split(',')[0],
      pageNum: 1,
      pageSize: 18,
    }
  }),
  useServerRequest<ResData<LeaderboardItem>>('/movie/leaderboard', {
    query: {
      columnValue: detail.movie.columnValue,
      pageNum: 1,
      pageSize: 20,
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
