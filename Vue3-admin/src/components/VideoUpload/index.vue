<template>
  <div class="upload-wrapper">
    <div class="upload-container">
      <div class="progress" v-if="uploadPercent">
        <div class="thumb" :style="`width: ${uploadPercent}%`">
          <span class="tool-tip">{{ uploadPercent }}%</span>
        </div>
      </div>

      <!-- 视频预览 -->
      <div class="video-wrapper" v-if="url">
        <video controls class="video" preload="auto" ref="videoRef">
          <source :src="url" type="video/mp4" />
        </video>
      </div>

      <!-- 选择视频 -->
      <div v-else class="choose-btn">
        <el-button
            type="primary"
            icon="Camera"
            @click="chosenFileHandle"
        >选择视频</el-button
        >
        <p>视频大小不超过{{ maxSize }}MB</p>
        <p>当前只支持 {{ acceptTypeStr }} 格式视频</p>
      </div>

      <!-- 文件选择器 -->
      <input
          type="file"
          name="file"
          accept="video/*"
          ref="fileInput"
          class="upload-input"
          @change="fileChangeHandle"
      />
    </div>

    <div class="tool">
      <el-button
          v-if="isUploadSuccess"
          type="primary"
          size="small"
          @click="getCurrentTime()"
      >设置当前画面为封面</el-button>

      <!-- 上传与取消按钮组 -->
      <template v-if="file">
        <el-button
            type="primary"
            v-if="!isUploading"
            size="small"
            @click="startUpload()"
        >开始上传</el-button>
        <el-button type="warning" v-else size="small" @click="cancleUpload()">取消上传</el-button>
      </template>
    </div>

  </div>
</template>

<script setup name="VideoUpload">
import request from '@/utils/request'
import {computed} from "vue";
const { proxy } = getCurrentInstance()

const props = defineProps({
  // 最大尺寸/MB
  maxSize: {
    type: Number,
    default: 500,
  },
  maxMinute: {
    // 最大时长/分钟
    type: Number,
    default: 15,
  },
  acceptType: {
    type: Array,
    default: () => ["video/mp4"],
  },
  replaceUrl: {
    type: Function,
    default: {}
  }
})

const acceptTypeStr = computed(() => {
  return props.acceptType.map(value => value.substring(value.lastIndexOf('/') + 1)).join('、')
})

const url = ref('')
const isUploading = ref(false)
const isUploadSuccess = ref(false)
const file = ref(null)
const uploadPercent = ref(0)
const videoInfo = reactive({
  duration: 0,
  width: 0,
  height: 0
})

// 文件上传事件
function chosenFileHandle() {
  file.value = null
  let evt = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  proxy.$refs.fileInput.dispatchEvent(evt);
}

// 获取本地视频文件
function fileChangeHandle(evt) {
  if (!evt.target.files || !evt.target.files[0]) return;
  const _file = evt.target.files[0];

  if (_file.size > props.maxSize * 1024 * 1024) {
    proxy.$modal.msgWarning(`视频大小不超过${props.maxSize}MB`)
    return;
  }
  if (props.acceptType.indexOf(_file.type) === -1) {
    proxy.$modal.msgWarning(`只能上传 ${acceptTypeStr.value} 格式视频!`);
    return;
  }

  url.value = URL.createObjectURL(_file);

  proxy.$nextTick(() => {
    const video = proxy.$refs.videoRef;

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      if (video.duration < 1) {
        proxy.$modal.msgWarning("Invalid Video! video is less than 1 second");
        return;
      }
      if (video.duration > proxy.maxMinute * 60) {
        proxy.$modal.msgWarning(`视频时长不能超过${proxy.maxMinute}分钟`);
      } else {
        // 视频信息
        videoInfo.duration = video.duration
        videoInfo.width = video.videoWidth
        videoInfo.height = video.videoHeight
        file.value = _file;
      }
    };
  });
}

// 开始上传
function startUpload() {
  isUploadSuccess.value = false
  handleFileUpload()
}

// 取消上传
function cancleUpload() {
  isUploading.value = false
  uploadPercent.value = 0
}

// 上传视频
async function handleFileUpload() {
  const formData = new FormData()
  formData.append('file', file.value)
  const res = await request({
    url: '/common/upload',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formData,
    onUploadProgress (progress) {
      uploadPercent.value = Math.round(progress.loaded / progress.total * 100);
    }
  })
  proxy.$modal.msgSuccess('上传成功')
  url.value = res.fileName.indexOf('http') > -1 ? res.fileName : import.meta.env.VITE_APP_BASE_API + res.fileName
  props.replaceUrl && (url.value = props.replaceUrl(url.value))
  isUploadSuccess.value = true
  proxy.$emit("on-success", {
    ...res,
    ...videoInfo
  });

  proxy.$refs.fileInput.value = "";
}

function getCurrentTime() {
  const videoDom = proxy.$refs.videoRef;
  const currentTime = videoDom.currentTime || 1;
  let dataURL = '';
  let video = document.createElement("video");
  video.setAttribute('src', url.value);
  video.setAttribute('width', videoInfo.width);
  video.setAttribute('height', videoInfo.height);
  video.setAttribute('controls', 'controls');
  video.currentTime = currentTime  //截取的时长
  video.addEventListener('loadeddata', function(e) {
    let canvas = document.createElement("canvas"),
        width = video.width, //canvas的尺寸和图片一样
        height = video.height;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
    dataURL = canvas.toDataURL('image/jpeg',0.8); //转换为base64
    proxy.$emit("on-poster-change", dataURL)
  });
}

/* 重置 */
function reset() {
  url.value = ''
  file.value = null
  isUploading.value = false
  isUploadSuccess.value = false
  uploadPercent.value = 0
}

defineExpose({
  reset
})
</script>


<style scoped lang="scss">
.upload-wrapper {
  position: relative;
  width: 100%;

  .upload-container {
    width: 100%;
    height: 230px;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    .progress {
      z-index: 1;
      position: absolute;
      left: 0;
      right: 0;
      top: -2px;
      height: 2px;
      font-size: 16px;
      border-radius: 5px;
      .thumb {
        background: #409eff;
        height: 100%;
        position: relative;
        &::after {
          position: absolute;
          bottom: -4px;
          right: -5px;
          width: 10px;
          height: 10px;
          content: "";
          background: #fff;
          border-radius: 50%;
          border: 2px solid #409eff;
          box-sizing: border-box;
        }
        .tool-tip {
          position: absolute;
          right: -23px;
          bottom: 14px;
          display: inline-block;
          padding: 2px 6px;
          min-width: 34px;
          text-align: center;
          line-height: 20px;
          color: #fff;
          font-size: 12px;
          border-radius: 4px;
          background: #409eff;
          letter-spacing: 1px;
          &::after {
            position: absolute;
            bottom: -12px;
            left: 0;
            right: 0;
            width: 1px;
            margin: 0 auto;
            content: "";
            border-width: 6px;
            border-style: solid;
            border-color: #409eff transparent transparent transparent;
          }
        }
      }
    }

    .video-wrapper {
      height: 100%;
      .video {
        width: 100%;
        height: 100%;
      }
    }
    .choose-btn {
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      flex-direction: column;
      > p {
        padding-top: 10px;
        text-align: center;
        font-size: 12px;
        color: #777;
        height: 24px;
        line-height: 24px;
      }
    }

    .upload-input {
      display: none;
    }
  }

  .tool {
    padding: 5px 0;
    text-align: right;
  }
}
</style>
