<template>
  <NuxtLoadingIndicator />
  <div>
    <header class="header">
      <div class="container between">
        <div class="header__left">
          <nuxt-link to="/" class="logo">淳渔影视</nuxt-link>
          <nav class="hidden-sm-and-down" v-if="route.path.indexOf('/user') === -1">
            <ul>
              <li :class="route.path === '/' ? 'active' : ''"><NuxtLink to="/">首页</NuxtLink></li>
              <li v-for="item in navigation.data" :class="route.params.column === item.value ? 'active' : ''">
                <nuxt-link :to="`/c-${item.value}`" v-if="+item.type === 1">{{item.name}}</nuxt-link>
                <nuxt-link :to="item.value" target="_blank" v-if="+item.type === 2">{{item.name}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="header__right items-center" v-if="route.path !== '/search'">
          <el-input
              class="w-50 m-2 mr-20"
              placeholder="请输入搜索的影视名"
              :suffix-icon="Search"
              v-model="searchValue"
              @keyup.enter.native="handleSearch"
          />
          <ClientOnly>
            <template v-if="userInfo">
              <el-dropdown @command="handleCommand">
                <el-button circle :icon="UserFilled" color="#155FAA"></el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="user">个人中心</el-dropdown-item>
                    <el-dropdown-item divided command="logOut">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template v-else>
              <el-button circle :icon="UserFilled" @click="goLogin"></el-button>
            </template>
          </ClientOnly>
        </div>
      </div>
      <div class="mobile-nav hidden-sm-only hidden-sm-and-up" v-if="route.path.indexOf('/user') === -1">
        <ul>
          <li :class="route.params.column === item.value ? 'active' : ''" :key="index" v-for="(item, index) in navigation.data">
            <nuxt-link :to="`/c-${item.value}`" v-if="+item.type === 1">{{item.name}}</nuxt-link>
            <nuxt-link :to="item.value" target="_blank" v-if="+item.type === 2">{{item.name}}</nuxt-link>
          </li>
        </ul>
      </div>
    </header>
    <div class="header__height__placeholder"></div>
    <slot />
    <div class="container default__text-muted">本网站为淳渔CMS演示站，提供的电视剧和电影资源均系收集于各大视频网站<br/>
      若本站收录的节目无意侵犯了贵司版权,请给542968439@qq.com留言,我们会及时逐步删除和规避程序自动搜索采集到的不提供分享的版权影视。<br/>
      本站仅供测试和学习交流。请大家支持正版。</div>
    <footer>
      Copyright {{ year }} 淳渔影视网 Inc. All Rights Reserved.
    </footer>
    <LoginPop ref="loginPopRef" @success="handleSuccess"/>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import { ComponentInternalInstance } from 'vue'
import { Search, UserFilled} from '@element-plus/icons-vue'
import { useFetch} from "nuxt/app";
import dayjs from "dayjs";

const runtimeConfig = useRuntimeConfig()
const {public: publicConfig} = runtimeConfig
const {apiBase} = publicConfig

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const userInfo = useCookie<{token: string} | null>('userInfo')
const token = useToken()
const route = useRoute()

const searchValue = ref('')
const year = dayjs().format('YYYY')

const { data: navigation } = await useFetch(apiBase + '/column/all', {
  query: { status: 0 }
})
function handleSearch() {
  navigateTo('/search?keyword=' + searchValue.value)
}

function goLogin() {
  proxy?.$refs['loginPopRef']?.setVisible(true)
}

function handleCommand(command: string) {
  switch (command) {
    case 'logOut':
      logOut()
      break;
    default:
      navigateTo('/user')
      break;
  }
}

function logOut() {
  userInfo.value = null
  token.value = ''
  if (route.path.indexOf('/user') > -1) {
    navigateTo('/')
  }
}

async function handleSuccess(tokenString: string) {
  userInfo.value = { token: tokenString }
  token.value = 'Bearer ' + tokenString
  proxy?.$refs['loginPopRef']?.setVisible(false)
}

</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 55px;
  background-color: $drak-blue;

  &__left {
    display: flex;
    .logo {
      display: flex;
      width: 150px;
      height: 55px;
      line-height: 55px;
      font-size: 24px;
      color: #FF9900;
      font-weight: bold;
      background-position: 50% 50% !important;
      background-size: cover !important;
      overflow: hidden;
    }
    nav {
      ul {
        display: flex;
        li {
          a {
            display: inline-block;
            height: 55px;
            line-height: 55px;
            font-size: 15px;
            padding: 0 20px;
            color: #fff;
          }
          &.active {
            a {
              background-color: #155FAA;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
.header__height__placeholder {
  height: 55px;
}

footer {
  padding: 40px 0;
  text-align: center;
}

.default__text-muted {
  padding: 20px 0 0;
  color: #999999;
  text-align: center;
}

@media only screen and (max-width:991px){
  .header {
    position: relative;

    .mobile-nav {
      border-top: $light-gray solid 1px;
      background: $drak-blue;
      position: absolute;
      height: 46px;
      bottom: -46px;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      box-sizing: border-box;
      padding-top: 8px;
      z-index: 9;
      &::-webkit-scrollbar {
        display: none;
      }
      ul {
        white-space: nowrap;
        li {
          display: inline-block;
          position: relative;
          &.active {
            a {
              color: #1583f3;
            }
          }
          a {
            display: inline-block;
            padding: 5px 19px;
            color: #ffffff;
            font-size: 16px;
          }
        }
      }
    }
  }
  .header__height__placeholder {
    height: 46px;
  }
}

</style>
