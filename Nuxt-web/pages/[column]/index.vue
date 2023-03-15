<template>
  <div class="container">
    <el-row :gutter="20" class="mt-20" v-for="categoryItem in list">
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
                <nuxt-link :to="`/${route.params.column}/show?t=${categoryItem.name}`" class="items-center">
                  更多 <el-icon><ArrowRight /></el-icon>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="video-list">
          <el-row :gutter="20">
            <el-col :sm="4" :xs="8" v-for="item in categoryItem.rows">
              <div class="video-list__block">
                <nuxt-link :to="`/${item.columnValue}/movie/${item.id}`">
                  <el-image class="video-list__block__img" :src="item.poster || runtimeConfig.public.apiBase + '/default.jpg'" fit="cover" />
                </nuxt-link>
                <div class="video-list__detail">
                  <h4 class="title text-overflow">{{ item.title }}</h4>
                  <p class="text-overflow">
                    <template v-for="actor in item.casts">
                      {{ actor.actor.name }}&nbsp;
                    </template>
                  </p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :sm="6" class="hidden-sm-and-down">
        <div class="panel_hd items-center">
          <h3 class="title items-center">
            <img src="../../assets/images/icon_12.png" alt="">
            {{ categoryItem.name }}榜单
          </h3>
        </div>
        <ul class="col-pd">
          <li v-for="(item, index) in categoryItem.ranks">
            <nuxt-link to="/" class="between">
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
import { ArrowRight } from '@element-plus/icons-vue'

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const list = ref([])

const res = await useHttp('/type', { query: { columnValue: route.params.column } })
list.value = res

</script>
