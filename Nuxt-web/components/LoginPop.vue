<template>
  <client-only>
    <el-dialog v-model="loginDialogVisible" title="登录" width="360">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" :prefix-icon="ElIconUserFilled"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="ElIconLock"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          还没有账号？去<a href="javascript:void(0)" class="link-color" @click="handleShowRegDialog">注册</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login(formRef)">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog v-model="regDialogVisible" title="注册" width="360">
      <el-form ref="formRegRef" :model="regForm" :rules="regRules">
        <el-form-item prop="email">
          <el-input v-model="regForm.email" placeholder="请输入邮箱" :prefix-icon="ElIconUserFilled"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="regForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="ElIconLock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="twoPassword">
          <el-input
            v-model="regForm.twoPassword"
            type="password"
            placeholder="请再次输入密码"
            :prefix-icon="ElIconLock"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          已有账号？去<a href="javascript:void(0)" class="link-color" @click="handleShowLoginDialog">登录</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleReg(formRegRef)">注 册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup name="LoginPop">
  import { FormInstance } from 'element-plus';
  import { reactive } from '#imports';
  import { useLoginDialogVisible, useRegDialogVisible } from '~/composables/states';
  import { useClientRequest } from '~/composables/useClientRequest';

  const token = useToken();
  const regDialogVisible = useRegDialogVisible();
  const loginDialogVisible = useLoginDialogVisible();
  const tokenCookie = useCookie<string | undefined>('token');

  const formRef = ref<FormInstance>();
  const formRegRef = ref<FormInstance>();
  const form = reactive({
    email: '542968439@qq.com',
    password: '123456'
  });
  const regForm = reactive({
    email: '',
    password: '',
    twoPassword: ''
  });
  const rules = ref({
    email: [{ required: true, message: '请输入邮箱地址' }],
    password: [{ required: true, message: '请输入密码' }]
  });
  const regRules = ref({
    email: [{ required: true, message: '请输入邮箱地址' }],
    password: [{ required: true, message: '请输入密码' }],
    twoPassword: [
      {
        required: true,
        validator: (_rule: any, value: any, callback: any) => {
          if (!value) {
            callback(new Error('请再次输入密码'));
          } else if (regForm.password !== regForm.twoPassword) {
            callback(new Error('两次密码输入不一致'));
          } else {
            callback();
          }
        }
      }
    ]
  });

  // 登录
  async function login(formEl: FormInstance | undefined) {
    if (!process.client) return;
    if (!formEl) return;
    await formEl.validate(async valid => {
      if (valid) {
        const data = await useClientRequest<{ code: number; token: string; msg?: string }>('/web/user/login', {
          method: 'post',
          body: form
        });
        if (data.code === 200) {
          ElMessage({
            message: '登录成功',
            type: 'success'
          });
          // 设置cookie
          tokenCookie.value = data.token;
          // 更新state
          token.value = 'Bearer ' + data.token;
          // 关闭登录弹层
          loginDialogVisible.value = false;
        }
      }
    });
  }

  // 注册
  async function handleReg(formEl: FormInstance | undefined) {
    if (!process.client) return;
    if (!formEl) return;
    await formEl.validate(async valid => {
      if (valid) {
        const data = await useClientRequest<{ code: number; msg?: string }>('/web/user/reg', {
          method: 'post',
          body: regForm
        });
        if (data.code === 200) {
          ElMessage({
            message: '注册成功',
            type: 'success'
          });
          regDialogVisible.value = false;
        }
      }
    });
  }

  // 隐藏登录弹层，显示注册弹层
  function handleShowRegDialog() {
    loginDialogVisible.value = false;
    regDialogVisible.value = true;
  }

  // 隐藏注册弹层，显示登录弹层
  function handleShowLoginDialog() {
    loginDialogVisible.value = true;
    regDialogVisible.value = false;
  }
</script>
