<template>
  <div class="container mt-20 show">
    <Head>
      <Title>{{ $titleRender(`${title}_${info?.data?.name}`) }}</Title>
      <Meta name="description" :content="`最新最全的${title}${info?.data?.name}尽在淳渔影视。`" />
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
              <li v-for="item in genreList?.data" :key="item.id" :class="route.query.t === item.name ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, t: item.name } }">{{
                  item.name
                }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按地区">
            <ul class="show__type-filter">
              <li :class="route.query.c === '' || route.query.c === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, c: '' } }">全部</nuxt-link>
              </li>
              <li
                v-for="item in countryList?.data"
                :key="item.id"
                :class="route.query.c && +route.query.c === +item.id ? 'active' : ''"
              >
                <nuxt-link :to="{ path: route.path, query: { ...route.query, c: item.id } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按年份">
            <ul class="show__type-filter">
              <li :class="route.query.y === '' || route.query.y === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, y: '' } }">全部</nuxt-link>
              </li>
              <li
                v-for="item in yearList"
                :key="item"
                :class="route.query.y && +route.query.y === item ? 'active' : ''"
              >
                <nuxt-link :to="{ path: route.path, query: { ...route.query, y: item } }">{{ item }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按语言">
            <ul class="show__type-filter">
              <li :class="route.query.l === '' || route.query.l === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, l: '' } }">全部</nuxt-link>
              </li>
              <li
                v-for="item in languageList?.data"
                :key="item.id"
                :class="route.query.l === item.name ? 'active' : ''"
              >
                <nuxt-link :to="{ path: route.path, query: { ...route.query, l: item.name } }">{{
                  item.name
                }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
        </el-form>
        <el-tabs v-model="orderBy" @tab-change="handleTabChange">
          <el-tab-pane label="按时间" name="createTime" :disabled="pending"></el-tab-pane>
          <el-tab-pane label="按人气" name="pv" :disabled="pending"></el-tab-pane>
          <el-tab-pane label="按评分" name="rate" :disabled="pending"></el-tab-pane>
        </el-tabs>
        <div v-loading="pending" class="video-list">
          <el-row v-if="movieList?.total !== 0" :gutter="20">
            <el-col v-for="item in movieList?.rows" :key="item.id" :sm="4" :xs="8">
              <div class="video-list__block">
                <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="img-box">
                  <el-image class="video-list__block__img" :src="item.poster" fit="cover" />
                  <span v-if="item.movieRate">{{
                    +item.movieRate.rate === 0 ? '暂无评分' : item.movieRate.rate.toFixed(1)
                  }}</span>
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
          <div v-if="movieList?.total !== 0" class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="currentPage"
              :page-size="30"
              :pager-count="5"
              :total="movieList?.total"
              @current-change="handleCurrentChange"
            />
          </div>
          <el-empty v-if="movieList?.total === 0" description="未找到相关数据"></el-empty>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down">
        <!--   周榜单     -->
        <Ranking title="周榜单" :list="rank?.data.weekRank" />
        <!--   月榜单     -->
        <Ranking title="月榜单" :list="rank?.data.mouthRank" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { useServerRequest } from '~/composables/useServerRequest';
  import { useClientRequest } from '~/composables/useClientRequest';

  definePageMeta({
    key: route => route.fullPath
  });

  const route = useRoute();
  const { query, params } = route;
  const currentPage = ref<number>((route.query.page && +route.query.page) || 1);
  const orderBy = ref<string>((query.orderBy as string) || 'createTime');
  const yearList = ref<number[]>([]);
  const y = new Date().getFullYear();
  for (let i = 0; i <= 15; i++) {
    yearList.value.push(y - i);
  }

  const title = computed(() => {
    let html = '';
    if (query.y) {
      html += query.y;
      html += '年';
    }
    if (query.t) {
      html += '最新最全的';
      html += query.t;
      html += '在线观看';
    }
    return html;
  });

  const [
    { data: genreList },
    { data: countryList },
    { data: languageList },
    { data: rank },
    { data: info },
    { data: movieList, pending, refresh }
  ] = await Promise.all([
    useServerRequest<ResData<Item[]>>('/basic/genre/all', {
      query: {
        columnValue: params.column
      }
    }),
    useServerRequest<ResData<Item[]>>('/basic/country/all'),
    useServerRequest<ResData<Item[]>>('/basic/language/all'),
    useServerRequest<ResData<LeaderboardItem>>('/movie/leaderboard', {
      query: {
        columnValue: params.column,
        pageNum: 1,
        pageSize: 20
      }
    }),
    useServerRequest<ResData<ColumnItem>>(`/column`, {
      query: {
        value: params.column
      }
    }),
    useAsyncData<ResPage<MovieItem[]>>('data', () =>
      useClientRequest('/movie/list', {
        query: {
          columnValue: params.column,
          genres: query.t,
          country: query.c,
          language: query.l,
          year: query.y,
          pageNum: currentPage.value,
          pageSize: 30,
          orderBy: orderBy.value
        }
      })
    )
  ]);

  async function handleCurrentChange(page: number) {
    const route = useRoute();
    await navigateTo({
      path: route.path,
      query: {
        ...route.query,
        orderBy: orderBy.value,
        page
      }
    });
    if (process.client) {
      window.scrollTo(0, 0);
    }
  }

  async function handleTabChange() {
    await refresh();
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
          background: #ff9900;
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
