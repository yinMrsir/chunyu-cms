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
        <el-form-item style="text-align: right">
          还没有账号？去<a href="javascript:void(0)" class="link-color" @click="handleShowRegDialog">注册</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(formRef)" style="width: 100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="注册" width="360" v-model="regDialogVisible">
      <el-form ref="formRegRef" :model="regForm" :rules="regRules">
        <el-form-item prop="email">
          <el-input v-model="regForm.email" placeholder="请输入邮箱" :prefix-icon="UserFilled"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="regForm.password" placeholder="请输入密码" :prefix-icon="Lock"></el-input>
        </el-form-item>
        <el-form-item prop="twoPassword">
          <el-input type="password" v-model="regForm.twoPassword" placeholder="请再次输入密码" :prefix-icon="Lock"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          已有账号？去<a href="javascript:void(0)" class="link-color" @click="handleShowLoginDialog">登录</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleReg(formRegRef)" style="width: 100%">注 册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup name="LoginPop">
import { ComponentInternalInstance } from "@vue/runtime-core";
import { ElMessage, FormInstance } from 'element-plus';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import {reactive} from "#imports";

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const visible = ref(false)
const regDialogVisible = ref(false)
const formRef = ref<FormInstance>()
const formRegRef = ref<FormInstance>()
const form = reactive({
  email: '542968439@qq.com',
  password: '123456'
})
const regForm =reactive({
  email: '',
  password: '',
  twoPassword: ''
})
const rules = ref({
  email: [{ required: true, message: '请输入邮箱地址' }],
  password: [{ required: true, message: '请输入密码' }]
})
const regRules = ref({
  email: [{ required: true, message: '请输入邮箱地址' }],
  password: [{ required: true, message: '请输入密码' }],
  twoPassword: [{
    required: true,
    validator: (rule: any, value: any, callback: any) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if(regForm.password !== regForm.twoPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
  }]
})

// 登录
async function login(formEl: FormInstance | undefined) {
  if (!process.client) return;
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const data = await $fetch<any>('/api/user/login', { method: 'post', body: form })
      if (data.code === 200) {
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        proxy?.$emit('success', data.token)
      } else {
        ElMessage.error(data?.msg)
      }
    }
  })
}

// 注册
async function handleReg(formEl: FormInstance | undefined) {
  if (!process.client) return;
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const data = await $fetch<any>('/api/user/reg', { method: 'post', body: regForm })
      if (data.code === 200) {
        ElMessage({
          message: '注册成功',
          type: 'success',
        })
        regDialogVisible.value = false
      } else {
        ElMessage.error(data?.msg)
      }
    }
  })
}

// 隐藏登录弹层，显示注册弹层
function handleShowRegDialog() {
  visible.value = false
  regDialogVisible.value = true
}

// 隐藏注册弹层，显示登录弹层
function handleShowLoginDialog() {
  visible.value = true
  regDialogVisible.value = false
}

defineExpose({
  setVisible(value: boolean) {
    visible.value = value
  }
})

</script>
