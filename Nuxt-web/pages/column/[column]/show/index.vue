<template>
  <div class="container mt-20 show">
    <Head>
      <Title>{{ title }}{{ info.data.name }} - {{ globalTitle }}</Title>
      <Meta name="description" :content="`最新最全的${title}${info.data.name}尽在淳渔影视。`" />
    </Head>

    <el-row :gutter="40">
      <el-col :span="18" :xs="24">
        <div class="panel_hd between items-center">
          <div class="panel_hd__left">
            <h3 class="title items-center">
              <el-icon><ElIconVideoCamera /></el-icon><a href="/">筛选</a>
            </h3>
          </div>
        </div>
        <el-form>
          <el-form-item label="按类型">
            <ul class="show__type-filter">
              <li :class="route.query.t === '' || route.query.t === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, t: '' } }">全部</nuxt-link>
              </li>
              <li v-for="item in genreList.data" :class="route.query.t === item.name ? 'active' : ''" :key="item.id">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, t: item.name } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按地区">
            <ul class="show__type-filter">
              <li :class="route.query.c === '' || route.query.c === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, c: '' } }">全部</nuxt-link>
              </li>
              <li v-for="item in countryList.data" :class="+route.query.c === +item.id ? 'active' : ''" :key="item.id">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, c: item.id } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按年份">
            <ul class="show__type-filter">
              <li :class="route.query.y === '' || route.query.y === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, y: '' } }">全部</nuxt-link>
              </li>
              <li v-for="item in yearList" :class="+route.query.y === item ? 'active' : ''" :key="item">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, y: item } }">{{ item }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按语言">
            <ul class="show__type-filter">
              <li :class="route.query.l === '' || route.query.l === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, l: '' } }">全部</nuxt-link>
              </li>
              <li v-for="item in languageList.data" :class="route.query.l === item.name ? 'active' : ''" :key="item.id">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, l: item.name } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
        </el-form>
        <el-tabs v-model="orderBy" @tab-change="handleTabChange">
          <el-tab-pane label="按时间" name="createTime" :disabled="pending"></el-tab-pane>
          <el-tab-pane label="按人气" name="pv" :disabled="pending"></el-tab-pane>
          <el-tab-pane label="按评分" name="rate" :disabled="pending"></el-tab-pane>
        </el-tabs>
        <div class="video-list" v-loading="pending">
          <el-row :gutter="20" v-if="movieList.total !== 0">
            <el-col :sm="4" :xs="8" v-for="item in movieList.rows">
              <div class="video-list__block">
                <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="img-box">
                  <el-image class="video-list__block__img" :src="item.poster || runtimeConfig.public.apiBase + '/default.jpg'" fit="cover" />
                  <span v-if="item.movieRate">{{ +item.movieRate.rate === 0 ? '暂无评分' : item.movieRate.rate.toFixed(1) }}</span>
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
          <div class="pagination" v-if="movieList.total !== 0">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-size="30"
                :pager-count="5"
                :total="movieList.total"
                @current-change="handleCurrentChange"
            />
          </div>
          <el-empty description="未找到相关数据" v-if="movieList.total === 0"></el-empty>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down">
        <!--   周榜单     -->
        <Ranking title="周榜单" :list="weekList.rows" />
        <!--   月榜单     -->
        <Ranking title="月榜单" :list="monthList.rows" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { IResData, IResPage } from "~/global";
import {useServerRequest} from "~/composables/useServerRequest";
import {useClientRequest} from "~/composables/useClientRequest";

const dayjs = useDayjs()

definePageMeta({
  key: route => route.fullPath
})

const runtimeConfig = useRuntimeConfig()
const { public: publicConfig } = runtimeConfig
const { globalTitle } = publicConfig
const route = useRoute()
const { query, params } = route
const currentPage = ref<number>((route.query.page && +route.query.page) || 1)
const orderBy = ref(route.query.orderBy || 'createTime')
const yearList = ref<number[]>([])
const y = new Date().getFullYear();
for (let i = 0 ; i <= 15; i++){
  yearList.value.push(y-i)
}

const title = computed(() => {
  let html = ''
  if (route.query.y) {
    html += route.query.y
    html += '_'
  }
  if (route.query.t) {
    html += route.query.t
    html += '_'
  }
  return html
})

const currTime = dayjs().format('YYYY-MM-DD')
const weekStartTime = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
const mouthStartTime = dayjs().subtract(30, 'day').format('YYYY-MM-DD')

const [
  { data: genreList },
  { data: countryList },
  { data: languageList },
  { data: weekList },
  { data: monthList },
  { data: info },
  { data: movieList, pending, refresh }
] = await Promise.all([
  useServerRequest<IResData<{name: string; id: number}[]>>('/basic/genre/all', {
    query: {
      columnValue: params.column
    }
  }),
  useServerRequest<IResData<{name: string; id: number}[]>>('/basic/country/all'),
  useServerRequest<IResData<{name: string; id: number}[]>>('/basic/language/all'),
  useServerRequest<IResPage<any[]>>('/movie/list', {
    query: {
      columnValue: params.column,
      pageNum: query.page || 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [weekStartTime, currTime]
    }
  }),
  useServerRequest<IResPage<any[]>>('/movie/list', {
    query: {
      columnValue: params.column,
      pageNum: query.page || 1,
      pageSize: 20,
      orderBy: 'pv',
      date: [mouthStartTime, currTime]
    }
  }),
  useServerRequest<any>(`/column`, {
    query: {
      value: params.column
    }
  }),
  useAsyncData<IResPage<any[]>>('data', () => useClientRequest('/movie/list', {
    query: {
      columnValue: params.column,
      genres: query.t,
      country: query.c,
      language: query.l,
      year: query.y,
      pageNum: query.page || 1,
      pageSize: 30,
      orderBy: orderBy.value
    }
  })),
])

async function handleCurrentChange(page: number) {
  await navigateTo({
    path: route.path,
    query: {
      ...route.query,
      orderBy: orderBy.value,
      page
    }
  })
  if (process.client) {
    window.scrollTo(0, 0)
  }
}

async function handleTabChange() {
  refreshNuxtData('data')
}

</script>

<style lang="scss" scoped>
.show {
  .title {
    .el-icon {
      margin-right: 15px;
    }
  }
  &__type-filter {
    li {
      display: inline-block;
      margin-right: 15px;
      padding: 0 10px;
      height: 24px;
      line-height: 24px;
      &.active {
        background: #FF9900;
        a {
          color: #ffffff;
        }
      }
    }
  }
  @media (max-width: 768px) {
    &__type-filter {
      white-space: nowrap;
      width: 300px;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .pagination {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
