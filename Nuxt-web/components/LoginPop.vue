<template>
  <client-only>
    <el-dialog title="登录" width="360" v-model="props.visible">
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

<script lang="ts" setup name="LoginPop">
import {ComponentInternalInstance} from "@vue/runtime-core";
import { ElMessage, FormInstance } from 'element-plus';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import {useFetch} from "#app";

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const token = useCookie<string>('token')
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
      const { data } = await useFetch<any>('/api/common/login', { method: 'post', body: form })
      if (data.value?.code === 200) {
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        data.value?.token && (token.value = data.value.token)
        proxy?.$emit('success')
      } else {
        ElMessage.error(data.value?.msg)
      }
    }
  })
}

</script>