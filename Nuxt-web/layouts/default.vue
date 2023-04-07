<template>
  <div>
    <header class="header">
      <div class="container between">
        <div class="header__left">
          <nuxt-link to="/" class="logo">淳渔影视</nuxt-link>
          <nav class="hidden-sm-and-down">
            <ul>
              <li :class="route.path === '/' ? 'active' : ''"><NuxtLink to="/">首页</NuxtLink></li>
              <li v-for="item in navigation" :class="route.params.column === item.value ? 'active' : ''">
                <nuxt-link :to="`/${item.value}`">{{item.name}}</nuxt-link >
              </li>
            </ul>
          </nav>
        </div>
        <div class="header__right items-center" v-if="route.path !== '/search'">
          <el-input
              class="w-50 m-2 mr-20"
              placeholder="请输入关键词..."
              :suffix-icon="Search"
              v-model="searchValue"
              @keyup.enter.native="handleSearch"
          />
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
        </div>
      </div>
      <div class="mobile-nav hidden-sm-only hidden-sm-and-up">
        <ul>
          <li :class="route.params.column === item.value ? 'active' : ''" :key="index" v-for="(item, index) in navigation">
            <nuxt-link :to="`/${item.value}`">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </header>
    <div class="header__height__placeholder"></div>
    <slot />
    <footer>
      Copyright 2023 淳渔影视网 Inc. All Rights Reserved.
    </footer>
    <LoginPop :visible="visible" @success="handleSuccess"/>
  </div>
</template>

<script setup>
import { Search, UserFilled } from '@element-plus/icons-vue'
import { useFetch } from "nuxt/app";

const userInfo = useCookie('userInfo')
const route = useRoute()
const searchValue = ref('')
const visible = ref(false)

const { data: navigation } = await useFetch('/api/common/navigation')
function handleSearch() {
  navigateTo('/search?keyword=' + searchValue.value)
}

function goLogin() {
  visible.value = true
}

function handleCommand(command) {
  switch (command) {
    case 'logOut':
      logOut()
      break;
    default:
      break;
  }
}

function logOut() {
  userInfo.value = null
}

function handleSuccess(token) {
  userInfo.value = { token }
  visible.value = false
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
