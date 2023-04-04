<template>
  <client-only>
    <el-dialog title="登录" width="360" v-model="visible">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" :prefix-icon="UserFilled"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" :prefix-icon="Lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(formRef)" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { ElMessage, FormInstance } from 'element-plus';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import useHttp from "../composables/useHttp";

definePageMeta({
  layout: false
})

const token = useCookie<string>('token')
const visible = ref(true)
const formRef = ref<FormInstance>()
const form = reactive({
  email: '',
  password: ''
})
const rules = ref({
  email: [{ required: true, message: '请输入邮箱地址' }],
  password: [{ required: true, message: '请输入密码' }]
})

async function login(formEl: FormInstance | undefined) {
  if (!process.client) return;
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const data = await useHttp<{code: number; msg: string; token?: string}>('/common/login', {
        method: 'post',
        body: form
      })
      if (data?.code === 200) {
        visible.value = false
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        data?.token && (token.value = data.token)
      } else {
        ElMessage.error(data?.msg)
      }
    }
  })
}

</script>