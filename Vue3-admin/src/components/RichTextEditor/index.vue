<template>
  <div>
    <Editor
        v-model="html"
        :api-key="TINY_KEY"
        :init="init"
    />
  </div>
</template>
<script setup name="RichTextEditor">
import Editor from "@tinymce/tinymce-vue";
import request from "@/utils/request";

const emit = defineEmits()
const TINY_KEY = import.meta.env.VITE_APP_TINY_KEY || ''
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const imagesUploadHandler = (blobInfo) => new Promise(async (resolve, reject) => {
  const formData = new FormData();
  formData.append('file', blobInfo.blob(), blobInfo.filename())
  try {
    const res = await request({
      url: '/common/upload',
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: formData
    })
    resolve(res.fileName)
  } catch (e) {
    reject('上传失败:' + e);
  }
});

const init = computed(() => ({
  language: 'zh_CN',
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount'
  ],
  toolbar: 'undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
  height: 650,
  min_height: 400,
  images_upload_handler: imagesUploadHandler,
  ...props.options
}))

const html = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
