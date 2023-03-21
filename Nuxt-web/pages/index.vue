<template>
  <div class="container index">
    <div class="banner">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in banner">
          <nuxt-link v-if="+item.urlType === 0" :to="item.url">
            <el-image :src="item.img" fit="cover" />
          </nuxt-link>
          <a v-else :href="item.url">
            <el-image :src="item.img" fit="cover" />
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <movie-box type="index" :category-item="item" v-for="item in list" />
    <div class="friendly-link flex items-center mt-20">
      <img src="../assets/images/icon_26.png">
      友情链接
    </div>
    <div class="friendly-link__content">
      <a href="http://cms.yinchunyu.com" target="_blank">淳渔CMS</a>
      <a href="http://admin-cms.yinchunyu.com" target="_blank">后台管理</a>
      <a href="http://www.yinchunyu.com" target="_blank">老鹰博客</a>
    </div>
    <ClientOnly>
      <el-dialog title="温馨提示" :width="dialogWidth" v-model="visible">
        <div style="line-height: 2.5">
          <p>本站点为淳渔CMS演示站点，并不提供相关视频播放！</p>
          <p>淳渔CMS后台演示地址：<a href="http://cms-admin.yinchunyu.com" target="_blank">http://cms-admin.yinchunyu.com</a></p>
        </div>
        <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="visible = false">我知道了</el-button>
      </span>
        </template>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup>
const visible = ref(false)
const [banner, list] = await useHttp('/home')
const dialogWidth = ref('')

onMounted(() => {
  visible.value = true
  dialogWidth.value = window.innerWidth > 600 ? '30%' : '320px'
})

</script>

<style lang="scss">
.index {
  padding-top: 20px;

  .banner {
    .el-carousel__container {
      height: 380px;
    }

    .el-image {
      height: 380px;
    }

    @media (max-width: 768px){
      .el-carousel__container {
        height: 200px;
      }

      .el-image {
        height: 200px;
      }
    }
  }

  .friendly-link {
    border-bottom: #eee solid 1px;
    padding: 10px 0;
    font-size: 18px;
    > img {
      margin-right: 10px;
    }
    &__content {
      padding: 20px 0;
      a {
        padding-right: 15px;
      }
    }
  }
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.col-pd {
  li {
    a {
      font-size: 14px;
      padding: 10px 0 10px;
      border-bottom: dotted 1px #eeeeee;

      .badge {
        display: inline-block;
        margin-right: 10px;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        border-radius: 2px;
        font-size: 12px;
        background-color: #eee;
        color: #333;
      }

      .text-muted {
        color: #999;
      }
    }

    &:nth-child(1) {
      .badge {
        background-color: #ff4a4a;
        color: #fff;
      }
    }

    &:nth-child(2) {
      .badge {
        background-color: #ff7701;
        color: #fff;
      }
    }

    &:nth-child(3) {
      .badge {
        background-color: #ffb400;
        color: #fff;
      }
    }
  }
}
</style>
