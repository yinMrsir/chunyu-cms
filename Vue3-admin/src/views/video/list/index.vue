<template>
  <div class="app-container">
    <table-pro
        dialog-title="视频"
        :columns="columns"
        form-dialog-width="800px"
        :table-request-fn="getVideoList"
        :create-fn="createVideoMethod"
        :update-fn="updateVideoMethod"
        :delete-fn="deleteVideo"
        :close-modal-callback="closeModal"
        :add-btn-callback="addBtnCallback"
    >
      <template #video="props">
        <div style="width: 100%">
          <!-- 视频编辑 -->
          <div class="preview-video" v-if="isEdit">
            <video controls class="video" preload="auto" ref="videoRef" :src="form.url" />
            <div class="tool">
              <el-button type="primary" size="small" v-if="form.url" @click="getCurrentTime()">
                设置当前画面为封面
              </el-button>
              <el-button type="" link size="small" @click="handleReUpload">重新上传</el-button>
            </div>
          </div>
          <div class="upload-field" v-else>
            <el-input v-model="form.url" style="display: none" />
            <video-upload
                ref="videoUploadRef"
                :replace-url="replaceUrl"
                @on-success="uploadSuccessHandle"
                @on-poster-change="posterChangeHandle"
            />
          </div>
        </div>
      </template>
      <template #poster>
        <el-input v-model="form.poster" style="display: none" />
        <div class="poster">
          <img :src="form.poster" />
        </div>
      </template>
    </table-pro>
    <div class="copy-element">{{ copyData }}</div>
  </div>
</template>

<script setup>
import useClipboard from "vue-clipboard3";
import VideoUpload from '@/components/VideoUpload'
import { createVideo, getVideoList, updateVideo, deleteVideo } from './services'
import request from "@/utils/request";
import { base64toFile } from "@/utils";

const { toClipboard } = useClipboard();
const { proxy } = getCurrentInstance()

const copyData = ref('')
const isEdit = ref(false)
const form = reactive({
  url: '',
  poster: '',
  duration: 0,
  width: 0,
  height: 0,
  size: 0
})
const columns = ref([
  { title: '标题', field: 'title', add: [ { required: true, message: '请输入标题' } ], sort: 2  },
  {
    title: '视频',
    field: 'video',
    add: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!form.url) {
            callback('请选择视频')
            return
          }
          callback()
        }
      }
    ],
    formSlot: 'video',
    hidden: true
  },
  {
    title: '封面',
    field: 'poster',
    type: 'img',
    add: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!form.poster) {
            callback('请先上传视频后生成封面')
            return
          }
          callback()
        }
      }
    ],
    formSlot: 'poster',
    sort: 1
  },
  { title: '时长', field: 'duration' },
  { title: '大小/M', field: 'size', render: ({ size }) => `${parseFloat(String(size / 1024 / 1024)).toFixed(1)}MB` },
  { title: '比例', field: 'wh', render: ({width, height}) => `${width} * ${height}` },
  { title: '影视关联数', field: 'movieVideoCount' },
  { title: '创建时间', field: 'createTime', type: 'dateTime' },
  {
    actions: [
      {
        text: '复制链接',
        click: async ({ url }) => {
          try {
            await toClipboard(url);
            proxy.$message.success('复制成功');
          } catch (e) {
            proxy.$message.error('复制失败');
          }
        }
      },
      {
        type: 'edit',
        beforeCallback: (row) => {
          form.poster = row.poster
          form.url = row.url
          form.width = row.width
          form.height = row.height
          form.duration = row.duration
          form.size = row.size
          isEdit.value = true
          return row
        }
      },
      {
        type: 'delete'
      }
    ],
    props: {
      width: 300
    }
  }
])

function getCurrentTime() {
  const videoDom = proxy.$refs.videoRef;
  const currentTime = videoDom.currentTime || 1;

  let dataURL = '';
  let video = document.createElement("video");
  video.setAttribute('src', replaceUrl(form.url));
  video.setAttribute('width', form.width);
  video.setAttribute('height', form.height);
  video.setAttribute('controls', 'controls');
  video.setAttribute('crossOrigin','anonymous');
  video.currentTime = currentTime  //截取的时长
  video.addEventListener('loadeddata', function(e) {
    let canvas = document.createElement("canvas"),
        width = video.width, //canvas的尺寸和图片一样
        height = video.height;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
    dataURL = canvas.toDataURL('image/jpeg',0.8); //转换为base64
    uploadPoster(dataURL)
  });
}

function uploadSuccessHandle(video) {
  form.url = video.fileName
  form.duration = video.duration
  form.width = video.width
  form.height = video.height
  form.size = video.size
  form.path = video.path
  form.name = video.name
}

function replaceUrl(str) {
  if (import.meta.env.VITE_APP_ENV === 'development') {
    return str.replace('[::1]:4000', 'localhost:4001/dev-api')
  }
  return str
}

function posterChangeHandle(posterUrl) {
  uploadPoster(posterUrl)
}



async function uploadPoster(base64) {
  let imgFile = base64toFile(base64)

  const formData = new FormData()
  formData.append('file', imgFile)
  const res = await request({
    url: '/common/upload',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formData,
  })
  form.poster = res.fileName
}

function createVideoMethod(formData) {
  return createVideo({
    ...formData,
    ...form,
  })
}

function updateVideoMethod(formData) {
  return updateVideo({
    ...formData,
    ...form,
  })
}

function addBtnCallback() {
  isEdit.value = false
  closeModal()
  proxy.$nextTick(() => {
    proxy.$refs.videoUploadRef.reset()
  })
}

// 关闭弹层清空插槽数据
function closeModal() {
  form.url = ''
  form.poster = ''
  form.duration = 0
  form.width = 0
  form.height = 0
  form.size = 0
}

// 重新上传
function handleReUpload() {
  isEdit.value = false
}

</script>

<style lang="scss" scoped>
.preview-video {
  height: 270px;
  .video {
    width: 100%;
    height: 230px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
  .tool {
    margin-top: -6px;
    text-align: right;
  }
}
.poster {
  width: 100%;
  height: 230px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
