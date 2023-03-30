<template>
  <div class="container mt-20 show">
    <Head>
      <Title>{{ title }}{{ info.name }} - {{ runtimeConfig.globalTitle }}</Title>
      <Meta name="description" :content="`最新最全的${title}${info.name}尽在淳渔影视。`" />
    </Head>

    <el-row :gutter="40">
      <el-col :span="18" :xs="24">
        <div class="panel_hd between items-center">
          <div class="panel_hd__left">
            <h3 class="title items-center">
              <el-icon><VideoCamera /></el-icon><a href="/">筛选</a>
            </h3>
          </div>
        </div>
        <el-form>
          <el-form-item label="按类型">
            <ul class="show__type-filter">
              <li :class="route.query.t === '' || route.query.t === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, t: '' } }">全部</nuxt-link>
              </li>
              <li v-for="(item, index) in genreList" :class="route.query.t === item.name ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, t: item.name } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按地区">
            <ul class="show__type-filter">
              <li :class="route.query.c === '' || route.query.c === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, c: '' } }">全部</nuxt-link>
              </li>
              <li v-for="(item, index) in countryList" :class="+route.query.c === +item.id ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, c: item.id } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按年份">
            <ul class="show__type-filter">
              <li :class="route.query.y === '' || route.query.y === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, y: '' } }">全部</nuxt-link>
              </li>
              <li v-for="(item, index) in yearList" :class="route.query.y === item ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, y: item } }">{{ item }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按语言">
            <ul class="show__type-filter">
              <li :class="route.query.l === '' || route.query.l === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, l: '' } }">全部</nuxt-link>
              </li>
              <li v-for="(item, index) in languageList" :class="route.query.l === item.name ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, l: item.name } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
        </el-form>
        <el-tabs v-model="activeName">
          <el-tab-pane label="按时间" name="first"></el-tab-pane>
          <el-tab-pane label="按人气" name="second"></el-tab-pane>
          <el-tab-pane label="按评分" name="third"></el-tab-pane>
        </el-tabs>
        <div class="video-list">
          <el-row :gutter="20">
            <el-col :sm="4" :xs="8" v-for="item in movieList">
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
          <div class="pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-size="30"
                :pager-count="5"
                :total="total"
                @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down">
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
import { onMounted } from "../../../.nuxt/imports";

definePageMeta({
  key: route => route.fullPath
})

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const currentPage = ref(+route.query.page || 1)
const activeName = ref('first')
const yearList = ref([])
const y = new Date().getFullYear();
for (let i = 0 ; i <= 15 ; i++){
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

const [
  genreList,
  countryList,
  languageList,
  movieList,
  total,
  weekList,
  monthList,
  info
] = await useHttp('/show', {
  query: {
    ...route.query,
    columnValue: route.params.column
  }
})

async function handleCurrentChange(page) {
  await navigateTo({
    path: route.path,
    query: {
      ...route.query,
      page
    }
  })
  if (process.client) {
    window.scrollTo(0, 0)
  }
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
