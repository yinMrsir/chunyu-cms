<template>
  <div class="app-container">
    <el-tabs tab-position="top" type="border-card" v-model="currTab">
      <el-tab-pane label="基本信息">
        <basic @success="setTitle" />
      </el-tab-pane>
      <el-tab-pane label="上映时间" v-if="id">
        <pub-date ref="pub-date" v-if="+currTab === 1" />
      </el-tab-pane>
      <el-tab-pane label="家长引导" v-if="id">
        <level v-if="+currTab === 2" />
      </el-tab-pane>
      <el-tab-pane label="影人列表" v-if="id">
        <cast v-if="+currTab === 3" />
      </el-tab-pane>
      <el-tab-pane label="相关视频" v-if="id">
        <videos v-if="+currTab === 4" />
      </el-tab-pane>
      <el-tab-pane label="影片相册" v-if="id">
        <photos v-if="+currTab === 5" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="Movie-add">
import Basic from './components/Basic'
import PubDate from './components/PubDate'
import Level from './components/Level'
import Videos from './components/Videos'
import Photos from './components/Photos'
import Cast from './components/Cast'

const { proxy } = getCurrentInstance()
const id = ref(null)
const currTab = ref(null)
const basicRef = ref(null)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
  setTitle(proxy.$route.query.id)
  isMounted.value = false
})

onActivated(() => {
  if (!isMounted.value) {
    setTitle(proxy.$route.query.id)
  }
})

function setTitle(paramId) {
  id.value = paramId || null
  const obj = Object.assign({}, proxy.$route, { title: id.value ? "编辑影视" : "新增影视" })
  proxy.$tab.updatePage(obj)
  proxy.$router.replace({ path: proxy.$route.path, query: { id: paramId } })
}
</script>
