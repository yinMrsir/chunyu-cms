<template>
  <div>
    <ClientOnly>
      <el-empty description="您还未收藏视频噢~" v-if="movieList.length === 0" />
      <div class="video-list" v-else>
        <el-row :gutter="20">
          <el-col :sm="4" :xs="8" v-for="item in movieList">
            <div class="video-list__block">
              <nuxt-link :to="`/column/${item.movie.columnValue}/movie/${item.movie.id}`">
                <el-image class="video-list__block__img" :src="item.movie.poster || runtimeConfig.public.apiBase + '/default.jpg'" fit="cover" />
              </nuxt-link>
              <div class="video-list__detail">
                <h4 class="title text-overflow">{{ item.movie.title }}</h4>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="pagination">
          <el-pagination
              background
              layout="prev, pager, next"
              :current-page="currentPage"
              :page-size="12"
              :pager-count="5"
              :total="total"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { useServerRequest } from "~/composables/useServerRequest";

const runtimeConfig = useRuntimeConfig()
const movieList = ref<any[]>([])
const currentPage = ref<number>(1)
const total = ref(0)

async function getList() {
  const { data: collectData, error } = await useServerRequest<{ rows:any[]; total: number;  code: number }>('/user-collect/findByPage', {
    query: {
      pageNum: currentPage.value,
      pageSize: 12
    }
  })
  if (!error.value && collectData.value?.code === 200) {
    movieList.value = collectData.value.rows
    total.value = collectData.value.total
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
