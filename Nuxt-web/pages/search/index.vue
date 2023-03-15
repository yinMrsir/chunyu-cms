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
                <el-button type="primary" @click="handleSearch">搜 索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="搜索结果" name="first">
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
                      :pager-count="5"
                      :total="total"
                      @current-change="handleCurrentChange"
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="6" class="hidden-sm-and-down">
          <div class="panel_hd items-center">
            <h3 class="title items-center">
              最新影视
            </h3>
          </div>
          <ul class="col-pd mb-20">
            <li v-for="(item, index) in newList">
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
    </ClientOnly>
  </div>
</template>

<script setup>
const route = useRoute()

const activeName = ref('first')
const form = reactive({
  keyword: undefined
})
const movieList = ref([])
const newList = ref([])
const total = ref(0)

form.keyword = route.query.keyword

const newRes = await useHttp('/common/movie-list', { query: { pageSize: 20 } })
newList.value = newRes.rows

handleSearch()
async function handleSearch() {
  const data = await useHttp('/common/movie-list', { query: { keyword: form.keyword } })
  movieList.value = data.rows
  total.value = data.total
}

async function handleCurrentChange(page) {
  await navigateTo({
    path: route.path,
    query: {
      keyword: form.keyword,
      page
    }
  })
  if (process.client) {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  padding: 20px 0;
}
</style>
