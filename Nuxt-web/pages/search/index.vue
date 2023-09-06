<template>
  <div class="container mt-20 show">
    <ClientOnly>
      <el-row :gutter="40">
        <el-col :span="18" :xs="24">
          <div class="search-form">
            <el-form :model="form" :inline="true">
              <el-form-item>
                <el-input v-model="form.keyword" placeholder="请输入搜索的影视名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="refresh">搜 索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="搜索结果" name="first">
              <div class="video-list">
                <el-row :gutter="20">
                  <el-col :sm="4" :xs="8" v-for="item in data.rows">
                    <div class="video-list__block">
                      <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="img-box">
                        <el-image class="video-list__block__img" :src="item.poster" fit="cover" />
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
                <div class="pagination">
                  <el-pagination
                      background
                      layout="prev, pager, next"
                      :current-page="currentPage"
                      :page-size="30"
                      :pager-count="5"
                      :total="data.total"
                      @current-change="handleCurrentChange"
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="6" class="hidden-sm-and-down">
          <Ranking title="最新影视" :list="newMovie.rows" />
        </el-col>
      </el-row>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useClientRequest } from "~/composables/useClientRequest";
import { useServerRequest } from "~/composables/useServerRequest";

const route = useRoute()
const activeName = ref('first')
const form = reactive<{ keyword: string | undefined }>({
  keyword: undefined
})
const currentPage = ref<number>(1)

form.keyword = route.query.keyword as string
if (route.query.page) {
  currentPage.value = +route.query.page
}

const [{ data, refresh }, { data: newMovie }] = await Promise.all([
  useAsyncData('data', () => useClientRequest<ResPage<MovieItem[]>>(
      'movie/list',
      {
        query: {
          keyword: form.keyword,
          pageNum: currentPage.value,
          pageSize: 30
        }
      }
  )),
  useServerRequest<ResPage<MovieItem[]>>('movie/list', { query: { pageSize: 15 } })
])

function handleCurrentChange(page: number) {
  currentPage.value = page
  refresh()
  if (process.client) {
    window.scrollTo(0, 0)
  }
}

</script>

<style lang="scss" scoped>
.search-form {
  padding: 20px 0;
}
.pagination {
  padding: 20px;
  display: flex;
  justify-content: center;
}

</style>
