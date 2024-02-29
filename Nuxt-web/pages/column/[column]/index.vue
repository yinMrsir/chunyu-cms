<template>
  <div class="container">
    <Head>
      <Title>{{ $titleRender(`最新${info?.data?.name}在线观看`) }}</Title>
      <Meta name="description" :content="`最新最全的${info?.data?.name}在线观看尽在淳渔影视。`" />
    </Head>

    <el-row v-for="categoryItem in res?.data" :key="categoryItem.id" :gutter="20" class="mt-20">
      <el-col :sm="18">
        <div class="panel_hd between items-center">
          <div class="panel_hd__left">
            <h3 class="title items-center">
              <i class="icon-movie-box"></i>
              <a href="/">最新{{ categoryItem.name }}</a>
            </h3>
          </div>
          <div class="panel_hd__right items-center">
            <ul class="items-center">
              <li>
                <nuxt-link :to="`/column/${route.params.column}/show?t=${categoryItem.name}`" class="items-center">
                  更多 <el-icon><ElIconArrowRight /></el-icon>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="video-list">
          <el-row :gutter="20">
            <el-col v-for="item in categoryItem.rows" :key="item.id" :sm="4" :xs="8">
              <div class="video-list__block">
                <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="img-box">
                  <el-image lazy class="video-list__block__img" :src="item.poster" fit="cover" />
                  <span v-if="item.movieRate">{{
                    +item.movieRate.rate === 0 ? '暂无评分' : item.movieRate.rate.toFixed(1)
                  }}</span>
                </nuxt-link>
                <div class="video-list__detail">
                  <h4 class="title text-overflow">{{ item.title }}</h4>
                  <p class="text-overflow">
                    <template v-for="actor in item.casts"> {{ actor.actor.name }}&nbsp; </template>
                  </p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :sm="6" class="hidden-sm-and-down">
        <Ranking :title="categoryItem.name + '榜单'" :list="categoryItem.ranks" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { useServerRequest } from '~/composables/useServerRequest';

  const route = useRoute();

  const [{ data: res }, { data: info }] = await Promise.all([
    useServerRequest<ResData<Omit<ColumnMovieItem, 'genres'>[]>>(`/web/type/${route.params.column}`),
    useServerRequest<ResData<ColumnItem>>(`/column?value=${route.params.column}`)
  ]);

  if (!info.value?.data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
      fatal: true
    });
  }
</script>
