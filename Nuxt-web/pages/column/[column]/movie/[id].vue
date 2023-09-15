<template>
  <div class="container mt-20">
    <Head>
      <Title>{{ $titleRender(`${ detailRes?.data.title }在线观看`) }}</Title>
      <Meta name="description" :content="detailRes?.data.summary"/>
    </Head>

    <div class="items-center">
      <span class="mr-10">当前位置</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
            :to="{ path: `/column/${detailRes?.data.columnValue}/show`, query: { t: detailRes?.data.genres?.split(',')[0] } }">
          {{ detailRes?.data.genres?.split(',')[0] }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="detailRes">
          {{ detailRes.data.title.length > 12 ? detailRes.data.title.substr(0, 12) + '...' : detailRes.data.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="40" class="mt-20">
      <el-col :span="18" :xs="24">
        <h1 class="movie-detail-title hidden-sm-and-up">
          {{ detailRes?.data.title }}
          <span
            :class="detailRes?.data.movieRate?.rateUserCount > 0 ? 'rate' : ''">
            {{detailRes?.data.movieRate?.rateUserCount > 0 ? detailRes?.data.movieRate.rate.toFixed(1) : '暂无评分' }}
          </span>
        </h1>
        <div class="clearfix">
          <div class="movies-pic">
            <el-image :src="detailRes?.data.poster" fit="cover" style="width: 100%"></el-image>
          </div>
          <div class="movies-info">
            <h1 class="hidden-sm-and-down">
              {{ detailRes?.data.title }}
              <span
                :class="detailRes?.data.movieRate?.rateUserCount > 0 ? 'rate' : ''">
                {{detailRes?.data.movieRate?.rateUserCount > 0 ? detailRes?.data.movieRate.rate.toFixed(1) : '暂无评分' }}
              </span>
            </h1>
            <el-form :inline="true" label-position="right">
              <el-form-item label="类型:">{{ detailRes?.data.genres }}</el-form-item>
              <el-form-item label="地区:">
                <template v-for="item in detailRes?.data.country">
                  {{ item.name }} &nbsp;
                </template>
              </el-form-item>
              <el-form-item label="年份:">{{ detailRes?.data.year || '-' }}</el-form-item>
            </el-form>
            <el-form label-position="right">
              <el-form-item label="别名:" v-if="detailRes?.data.akas">
                <div class="text-overflow">{{ detailRes?.data.akas.split(',').join('/') }}</div>
              </el-form-item>
              <el-form-item label="标签:" v-if="detailRes?.data.tags">
                <div class="text-overflow">{{ detailRes?.data.tags.split(',').join('/') }}</div>
              </el-form-item>
              <div>
                <nuxt-link :to="`/column/${detailRes?.data.columnValue}/video/${detailRes?.data.movieVideos?.[0].id}`" v-if="detailRes?.data.movieVideos?.[0]">
                  <el-button :icon="ElIconVideoPlay" type="primary" class="mr-10">播放</el-button>
                </nuxt-link>
                <el-button :loading="collectLoading" :icon="isCollect ? ElIconStarFilled : ElIconStar" @click="handleCollect">
                  {{ isCollect ? '已收藏' : '收藏' }}
                </el-button>
                <ClientOnly>
                  <el-popover v-if="!isUserRate" placement="right" trigger="click">
                    <template #reference>
                      <el-button :icon="ElIconEdit">评分</el-button>
                    </template>
                    <el-rate allow-half v-model="rate" @change="onRatechange"/>
                  </el-popover>
                </ClientOnly>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mt-20" v-if="detailRes?.data.movieVideos && detailRes.data.movieVideos.length">
          <div class="panel_hd between items-center">
            <div class="panel_hd__left">
              <h3 class="title items-center">
                <i class="icon-movie-box"></i>相关视频
              </h3>
            </div>
          </div>
          <div class="related_video">
            <ul class="clearfix">
              <li v-for="item in detailRes.data.movieVideos">
                <nuxt-link :to="`/column/${detailRes.data.columnValue}/video/${item.id}`">
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
          <div class="desc" v-html="detailRes?.data.summary || ''"></div>
        </div>
        <!--  演员    -->
        <div class="mt-20" v-if="castsRes?.rows && castsRes?.rows.length">
          <div class="panel_hd between items-center">
            <div class="panel_hd__left">
              <h3 class="title items-center">
                <i class="icon-movie-box"></i>演员
              </h3>
            </div>
          </div>
          <div class="actor">
            <ul>
              <li v-for="item in castsRes.rows">
                <el-image style="width: 110px; height: 156px;" fit="cover" :src="item.actorAvatar"></el-image>
                <div>{{ item.actorName }}</div>
                <div class="grey" v-if="item.role">饰 {{ item.role }}</div>
                <div class="grey" v-else>{{ item.professionName }}</div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down">
        <div class="qr_code items-center column mb-20">
          <qrcode-vue :value="qrcodeUrl" :size="160" level="H"/>
          <p class="mt-10">扫描二维码用手机观看</p>
        </div>
        <!--   周榜单     -->
        <Ranking title="周榜单" :list="rank?.data.weekRank" />
        <!--   月榜单     -->
        <Ranking title="月榜单" :list="rank?.data.mouthRank" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { useLoginDialogVisible, useToken} from "~/composables/states";
import { useServerRequest } from "~/composables/useServerRequest";
import { FetchOptions, useClientRequest } from "~/composables/useClientRequest";
import { UserMovieBase, UserRate } from "~/types/column/movie";

const route = useRoute()
const token = useToken()
const loginDialogVisible = useLoginDialogVisible()

const id = route.params.id
const qrcodeUrl = ref<string>('')
const isCollect = ref<boolean>(false)
const isUserRate = ref<boolean>(false)
const rate = ref<number>()
const collectLoading = ref<boolean>(false)

onMounted(() => {
  qrcodeUrl.value = window.location.href
})

const [
  { data: detailRes, refresh },
  { data: castsRes },
] = await Promise.all([
  useServerRequest<ResData<MovieItem>>(`/movie/${id}`),
  useServerRequest<ResPage<CastListItem[]>>(`/movie/cast/list?movieId=${id}&pageNum=1&pageSize=50`)
])

if (!detailRes.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
    fatal: true
  })
}

// 获取榜单
const { data: rank } = await useServerRequest<ResData<LeaderboardItem>>('/movie/leaderboard', {
  query: {
    columnValue: detailRes.value?.data.columnValue,
    pageNum: 1,
    pageSize: 20,
  }
})

/** 更新访问量 */
useServerRequest(`/movie/updatePv/${id}`, { lazy: true })

/** 登录状态发生改变 重新获取收藏和评分状态 */
watch(token, () => {
  getUserCollect()
  getUserRate()
})

/** 获取用户收藏状态 */
getUserCollect()
async function getUserCollect() {
  if (!token.value) {
    isCollect.value = false
  } else {
    const { data: userCollect } = await useServerRequest<ResData<UserMovieBase>>('/user-collect/find', {
      query: { movieId: id }
    })
    isCollect.value = !!userCollect.value?.data
  }
}

/** 收藏 */
async function handleCollect() {
  if (!token.value) {
    loginDialogVisible.value = true
  } else {
    const requestUrl: string = !isCollect.value ? '/user-collect' : `/user-collect/cancel?movieId=${id}`
    const requestOpts: FetchOptions = !isCollect.value ? {
          body: { movieId: id },
          method: 'POST'
        } : {}
    collectLoading.value = true
    try {
      let { code } = await useClientRequest<Pick<ResOptions<unknown>, 'code' | 'msg'>>(requestUrl, requestOpts)
      if (code === 200) {
        isCollect.value = !isCollect.value
      }
    } finally {
      collectLoading.value = false
    }
  }
}

/** 获取用户评分状态 */
getUserRate()
async function getUserRate() {
  if (!token.value) {
    isUserRate.value = false
  } else {
    const { data: userRate } = await useServerRequest<ResData<UserRate>>('/user-rate', {
      query: { movieId: id },
    })
    isUserRate.value = !!userRate.value?.data
  }
}

/** 设置评分 */
async function onRatechange(value: number) {
  if (!value) return
  if (!token.value) {
    loginDialogVisible.value = true
    rate.value = 0
  } else {
    const { code } = await useClientRequest<Pick<ResOptions<unknown>, 'code'>>('/user-rate', {
      method: 'post',
      body: { movieId: id, rate: rate.value }
    })
    if (code === 200) {
      await refresh()
      isUserRate.value = true
    }
  }
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

.movies-info {
  h1 {
    color: #333;
    font-size: 22px;
    margin-bottom: 10px;
    line-height: 1.2;
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
        background: rgba(0, 0, 0, 0.6);
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

@media only screen and (max-width: 991px) {
  .movies-pic {
    width: 120px;
    margin-right: 10px;
  }
}
</style>
