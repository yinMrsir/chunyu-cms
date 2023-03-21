<template>
  <el-row :gutter="20" class="mt-20">
    <el-col :sm="18">
      <div class="panel_hd between items-center">
        <div class="panel_hd__left">
          <h3 class="title items-center">
            <i :class="categoryItem.cssClass" class="icon-movie-box"></i>
            <a href="/">最新{{ categoryItem.name }}</a>
          </h3>
        </div>
        <div class="panel_hd__right items-center">
          <ul class="items-center">
            <li class="hidden-sm-and-down" v-for="item in categoryItem.genres"><nuxt-link :to="`/${categoryItem.value}/show?t=${item.name}`">{{ item.name }}</nuxt-link></li>
            <li>
              <nuxt-link :to="`/${categoryItem.value}`" class="items-center">
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
                <el-image lazy class="video-list__block__img" :src="item.poster || runtimeConfig.public.apiBase + '/default.jpg'" fit="cover" />
              </nuxt-link>
              <div class="video-list__detail">
                <h4 class="title">{{ item.title }}</h4>
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
    <el-col :span="6" class="hidden-sm-and-down">
      <div class="panel_hd items-center">
        <h3 class="title items-center">
          <img src="../assets/images/icon_12.png" alt="">
          {{ categoryItem.name }}榜单
        </h3>
      </div>
      <ul class="col-pd">
        <li v-for="(item, index) in categoryItem.ranks">
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
</template>

<script setup name="MovieBox">
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({
  categoryItem: {
    type: Object,
    default: () => ({})
  }
})

const runtimeConfig = useRuntimeConfig()

</script>

<style lang="scss">
.panel_hd {
  border-bottom: #eeeeee solid 1px;
  height: 46px;
  margin-bottom: 15px;
  .title {
    font-size: 18px;
    line-height: 24px;

    img {
      margin-right: 10px;
    }
  }
  &__right {
    li {
      position: relative;
      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 10px;
        background: #eee;
        position: absolute;
        top: 50%;
        transform: translateY(-30%);
        right: 0;
      }
      &:last-child::before {
        display: none;
      }
      a {
        padding: 0 10px;
        color: #999;
        font-size: 14px;
      }
    }
  }
}

.video-list {
  &__block {
    padding: 10px 0;
    &__img {
      width: 100%;
      height: 218px;
    }
  }

  &__detail {
    .title {
      font-size: 14px;
      color: #333;
      padding-top: 10px;
    }

    p {
      min-height: 19px;
      font-size: 12px;
      margin-bottom: 0;
      margin-top: 5px;
      color: #999;
    }
  }
}

@media only screen and (max-width:991px){
  .video-list {
    &__block {
      &__img {
        height: 170px;
      }
    }
  }
}

.icon-movie-box {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background: url("../assets/images/icon_1.png") no-repeat;
  background-size: cover;

  &.new-movie {
    background: url("../assets/images/icon_1.png") no-repeat;
    background-size: cover;
  }

  &.new-tv {
    background: url("../assets/images/icon_2.png") no-repeat;
    background-size: cover;
  }
}
</style>
