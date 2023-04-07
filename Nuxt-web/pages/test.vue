<script setup lang="ts">

definePageMeta({
  layout: false
})

const user = useCookie<{ name: string }>('user')
const logins = useCookie<number>('logins')

const name = ref('')

const login = () => {
  logins.value = (logins.value || 0) + 1
  user.value = { name: name.value }
}

const logout = () => {
  user.value = null
}
</script>

<template>
  <div class="h-50">
    <template v-if="user">
      <h1 class="text-3xl mb-3">
        Welcome, {{ user.name }}! 👋
      </h1>
      <div class="mt-3">
        <el-button @click="logout">
          Log out
        </el-button>
      </div>
    </template>
    <template v-else>
      <h1 class="text-3xl mb-3">
        Login
      </h1>
      <el-input v-model="name" class="w-100 m-auto" placeholder="Enter your name..." @keypress.enter="login()" />
      <div class="mt-3">
        <el-button :disabled="!name" @click="login">
          Log in
        </el-button>
      </div>
    </template>
  </div>
</template>
