<template>
  <div>
    <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
      <el-form-item label="照片类型" prop="type">
        <el-select v-model="queryParams.type" clearable placeholder="请选择照片类型">
          <el-option
              v-for="item in movieImgType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="照片状态" prop="status">
        <el-select v-model="queryParams.status" clearable placeholder="请选择照片状态">
          <el-option
              v-for="item in movieImgStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        <el-button type="primary" plain icon="Plus" @click="showUploadImgDialog">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 图片列表区域 START -->
    <div class="list" ref="list" v-loading="loading">
      <ul class="photo-list" v-if="photos.length">
        <photo-item
            v-for="item in photos"
            :key="item.id"
            :photo="item"
            :is-batch="isBatch"
            @on-preview="showPreviewModal"
            @on-delete="showDeleteModal"
            @on-audit="showStatusModal"
        />
      </ul>
      <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
      />

      <div v-if="!photos.length">
        <p class="no-data">暂无数据</p>
      </div>
    </div>

    <!-- 图片预览 -->
    <el-image-viewer
        v-if="showPreview"
        @close="closePreView"
        :url-list="previewList"
    />

    <!--  图片上传  -->
    <el-dialog
        title="图片上传"
        v-model="uploadImgDialogVisible"
        width="600px">
      <el-form ref="imgFormRef" :model="imgForm" :rules="rules" label-width="80px">
        <el-form-item prop="type" label="图片类型">
          <el-select v-model="imgForm.type" clearable placeholder="请选择照片类型">
            <el-option
                v-for="item in movieImgType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="imgs" label="图片">
          <image-upload ref="imageUploadRef" v-model="imgForm.imgs" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="imgForm.status" clearable placeholder="请选择照片状态">
            <el-option
                v-for="item in movieImgStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="uploadImgDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleUploadImg(imgFormRef)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Photos">
import { ElMessageBox } from 'element-plus'
import { createPhotosMovie, photosMovieList, deletePhotosMovie } from '../services'
import PhotoItem from "@/components/Photo/PhotoItem";
import ImageUpload from "@/components/ImageUpload";

const { proxy } = getCurrentInstance()

const props = defineProps({
  currTab: {
    type: String,
    default: ''
  }
})
const {
  movie_img_type: movieImgType,
  movie_img_status: movieImgStatus
} = proxy.useDict('movie_img_type', 'movie_img_status')
const imageUploadRef = ref()
const uploadImgDialogVisible = ref(false)
const queryParams = ref({
  movieId: +proxy.$route.query.id,
  type: undefined,
  status: undefined,
  pageNum: 1,
  pageSize: 10,
})
const isBatch = ref(false);
const loading = ref(false);
const showPreview = ref(false);
const previewList = ref([]);
const photos = ref([]);
const total = ref(0)
const imgForm = reactive({
  movieId: +proxy.$route.query.id,
  type: undefined,
  imgs: []
})
const rules = ref({
  type: [{ required: true, message: '请选择图片类型' }],
  imgs: [{ required: true, message: '请选择图片', trigger: "change" }]
})
const imgFormRef = ref()

function showPreviewModal(photo) {
  previewList.value = [photo];
  showPreview.value = true;
}

function showUploadImgDialog() {
  uploadImgDialogVisible.value = true
}

function showDeleteModal(item) {
  ElMessageBox.prompt('请输入删除原因', '确定删除？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPlaceholder: '请输入删除原因'
  })
  .then(async ({ value }) => {
    await deletePhotosMovie({
      id: item.id,
      remark: value || ''
    })
    proxy.$modal.msgSuccess('删除成功')
    await getList()
  })
}

function showStatusModal() {

}

function closePreView() {
  showPreview.value = false
}

// 提交图片
async function handleUploadImg(formEl) {
  if (!formEl) return
  await formEl.validate(async valid => {
    if (valid) {
      const arr = []
      proxy.$refs['imageUploadRef'].originalFileList.forEach(value => {
        arr.push(createPhotosMovie({
          ...imgForm,
          img: value.url,
          imgWidth: value.width,
          imgHeight: value.height,
          imgSize: value.size
        }))
      })
      await Promise.all(arr)
      proxy.$modal.msgSuccess('上传成功')
      uploadImgDialogVisible.value = false
      getList()
    }
  })
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

async function getList() {
  const { data } = await photosMovieList(queryParams.value)
  photos.value = data.rows.map(value => ({...value, categoryZh: '影视'}));
  total.value = data.total;
}

defineExpose({
  getList
})
</script>

<style scoped lang="scss">
.list {
  height: calc(100vh - 250px);
  padding: 10px;
  overflow: auto;
  .photo-list {
    padding: 0;
    margin: 0;
  }
  .no-data {
    height: calc(100vh - 300px);
    line-height: calc(100vh - 300px);
    text-align: center;
    font-size: 14px;
    color: #999;
  }
}
</style>
