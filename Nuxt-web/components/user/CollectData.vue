<template>
  <div>
    <ClientOnly>
      <el-empty description="您还未收藏视频噢~" v-if="movieList.length === 0" />
      <div class="video-list" v-else>
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
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const movieList = ref<any[]>([])
const currentPage = ref<number>(1)
const total = ref(0)

async function getList() {
  const userInfo = useCookie<{token: string}>('userInfo')
  const { data } = await useFetch<{ rows:any[]; total: number }>('/api/user/collect/list', {
    query: {
      page: currentPage.value,
      size: 12
    },
    headers: {
      Authorization: userInfo.value ? 'Bearer ' + userInfo.value.token : ''
    }
  })
  console.log(data)
  if (data.value) {
    movieList.value = data.value.rows
    total.value = data.value.total
  }
}
getList()

function handleCurrentChange(page: number) {
  currentPage.value = page
  getList()
}
</script>

<style scoped>
.pagination {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>