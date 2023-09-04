<template>
  <div>
    <el-form :model="movie" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="状态：" prop="status">
        <el-radio-group v-model="movie.status">
          <el-radio
              v-for="status in statusList"
              :label="status.value"
              :key="status.value"
          >{{ status.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>

      <!-- 上映相关 -->
      <el-form-item label="上映状态：">
        <el-radio-group v-model="movie.releaseStatus">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">即将上映</el-radio>
          <el-radio :label="2">正在热映</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="上映日期：" prop="releaseDate">
        <el-input
            v-model="movie.releaseDate"
            clearable
            placeholder="例：2021-12-01"
        />
      </el-form-item>

      <el-form-item label="中文名：" prop="title">
        <el-input v-model="movie.title" placeholder="请填写影视名称" />
      </el-form-item>

      <el-form-item label="海报：" prop="poster">
        <image-upload v-model="movie.poster" :limit="1" />
      </el-form-item>

      <el-form-item label="背景色：">
        <div class="bgcolor">
          <div class="bgcolor-picker">
            <el-color-picker size="small" v-model="movie.bgColor" />
          </div>
          <div class="bgcolor-input">
            <el-input
                v-model="movie.bgColor"
                clearable
                placeholder="背景色 16进制 例：#ffffff"
            />
          </div>
        </div>
      </el-form-item>

      <el-form-item label="英文名：">
        <el-input v-model="movie.titleEn" clearable placeholder="影视英文名" />
      </el-form-item>

      <el-form-item label="原名：">
        <el-input
            v-model="movie.titleOriginal"
            clearable
            placeholder="影视原名"
        />
      </el-form-item>

      <el-form-item label="别名：">
        <tag-group
            size="large"
            effect="plain"
            type="info"
            v-model="movie.akas"
            placeholder="添加别名"
        />
      </el-form-item>

      <div class="sub-form">
        <el-form-item label="影视栏目：" prop="columnValue">
          <el-radio-group
              v-model="movie.columnValue"
              @change="columnValueChangeHandle"
          >
            <el-radio :label="dict.value" v-for="dict in allColumn">{{ dict.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 与分类联动 -->
        <el-form-item label="已选类型：">
          <el-checkbox-group v-model="movie.genres">
            <el-checkbox
                v-for="genre in movie.genres"
                :key="genre"
                :label="genre"
            >
              {{ genre }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="所属类型：">
          <el-checkbox-group v-model="movie.genres" v-loading="genresLoading">
            <el-checkbox v-for="genre in genres" :key="genre.id" :label="genre.name">
              {{ genre.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>

      <div class="sub-form">
        <el-form-item label="年代：" prop="year">
          <el-input type="number" v-model.number="movie.year" />
        </el-form-item>

        <el-form-item label="首映时间：">
          <el-input v-model="movie.pubdate" />
        </el-form-item>

        <el-form-item label="片长">
          <el-input
              type="number"
              v-model="movie.duration"
              placeholder="上映版片长"
          />
        </el-form-item>
      </div>

      <el-form-item label="银幕：">
        <el-checkbox-group v-model="movie.versions">
          <el-checkbox
              v-for="version in versions"
              :key="version"
              :label="version"
          >
            {{ version }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="彩蛋个数：">
        <el-input-number v-model="movie.eggHunt" placeholder="彩蛋个数" />
      </el-form-item>

      <el-form-item label="色彩：">
        <el-radio-group v-model="movie.color">
          <el-radio :label="0">彩色</el-radio>
          <el-radio :label="1">黑白</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 电视剧/动漫/纪录片等类型额外字段 -->
      <div class="sub-form">
        <el-form-item label="总季数：">
          <el-input-number v-model="movie.seasonCount" />
        </el-form-item>

        <el-form-item label="当前季：">
          <el-input-number v-model="movie.currentSeason" />
        </el-form-item>

        <el-form-item label="总集数：">
          <el-input-number v-model="movie.episodeCount" />
        </el-form-item>

        <el-form-item label="当前集数：">
          <el-input-number v-model="movie.currentEpisode" />
        </el-form-item>

        <el-form-item label="是否完结：">
          <el-radio-group v-model="movie.theEnd">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="sub-form">

        <el-form-item label="国家/地区：">
          <remote-select
              v-model="movie.countryIds"
              :options="movie.countryList"
              type="country"
              multiple
              placeholder="请选择国家"
          />
        </el-form-item>

        <el-form-item label="语言：">
          <remote-select
              v-model="movie.languages"
              type="language"
              multiple
              placeholder="请选择语言"
          />
        </el-form-item>
      </div>

      <el-form-item label="标签：">
        <tag-group size="large" v-model="movie.tags" placeholder="添加标签" />
      </el-form-item>

      <el-form-item label="简介：">
        <rich-text-editor v-model="movie.summary"></rich-text-editor>
      </el-form-item>

      <el-form-item label="是否付费">
        <el-switch v-model="movie.isPay" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>

      <el-form-item label="支付金币" v-if="+movie.isPay === 1">
        <el-input-number v-model="movie.paymentAmount" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="免费时长" v-if="+movie.isPay === 1">
        <el-input v-model="movie.freeDuration" placeholder="请输入" oninput="value=value.replace(/^\.+|[^\d.]/g,'')">
          <template #append>分钟</template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit(formRef)">提 交</el-button>
        <el-button @click="proxy.$tab.closeOpenPage({ path: '/movie/movie-list' })">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup name="Basic">
import { scrollTo } from '@/utils/scroll-to'
import ImageUpload from "@/components/ImageUpload";
import RichTextEditor from '@/components/RichTextEditor';
import { getGenreAll } from "@/views/basic/genre/services";
import { createMovie, getMovie, updateMovie } from '../services'
import { getColumnAll } from "@/views/column/services";

const { proxy } = getCurrentInstance()
const emit = defineEmits()
const { movie_category_type } = proxy.useDict("movie_category_type");

const id = ref('')
let movie = ref({
  columnValue: 'movie',
  summary: undefined,
  countryList: [],
  countryIds: [],
  languages: [],
  akas: [],
  tags: [],
  genres: [],
  versions: [],
  isPay: 0,
  paymentAmount: 0
})
const rules = ref({
  title: [{ required: true, message: "请填写片名", trigger: "blur" }],
  poster: [{ max: 128, message: "请选择图片", trigger: "blur" }],
  year: [
    {
      required: true,
      type: "number",
      message: "请填写上映年份",
      trigger: "blur",
    },
  ],
})
const genresLoading = ref(false)
const genres = ref([])
const statusList = ref([
  {
    label: "处理中",
    value: -9,
  }, {
    label: "待完善",
    value: -8,
  }, {
    label: "待审核",
    value: -7,
  }, {
    label: "隐藏",
    value: -1,
  }, {
    label: "正常",
    value: 0,
  }, {
    label: "锁定",
    value: 1,
  },
])
const versions = ref(["2D", "3D", "iMax", "iMax3D"])
const formRef = ref()
const allColumn = ref([])
const isMounted = ref(false)

onMounted(async () => {
  isMounted.value = true
  id.value = proxy.$route.query.id
  if (id.value) {
    await getMovieData()
  } else {
    clearMovieData()
  }
  await getGenresSimple()
  isMounted.value = false
})

onActivated(async () => {
  if (!isMounted.value) {
    id.value = proxy.$route.query.id
    if (id.value) {
      await getMovieData()
    } else {
      clearMovieData()
    }
    await getGenresSimple()
  }
})

/** 获取影视详情 */
async function getMovieData() {
  const { data } = await getMovie(id.value);
  movie.value = {
    ...data,
    genres: data.genres?.split(',')|| [],
    versions: data.versions?.split(',')|| [],
    languages: data.languages?.split(',')|| [],
    countryIds: data.countryIds?.split(',').map(value => Number(value)) || [],
    countryList: data.country,
    akas: data.akas?.split(',') || [],
    tags: data.tags?.split(',') || []
  }
}

function clearMovieData() {
  movie.value = {
    columnValue: 'movie',
    summary: undefined,
    countryList: [],
    countryIds: [],
    languages: [],
    akas: [],
    tags: [],
    genres: [],
    versions: []
  }
}

/** 获取影视类型 */
async function getGenresSimple() {
  if (!movie.value.columnValue) return;

  let params = {
    columnValue: movie.value.columnValue,
  };

  genresLoading.value = true;
  const { code, data } = await getGenreAll(params);
  genresLoading.value = false;

  if (code === 200) {
    genres.value = data;
  }
}

/** 分类改变时，请求类型列表 */
function columnValueChangeHandle() {
  movie.value.genres = []
  getGenresSimple()
}

async function handleSubmit(formEl) {
  if (!formEl) return
  await formEl.validate(async valid => {
    if (valid) {
      const params = { ...movie.value }
      params.languages = movie.value.languages.length ? movie.value.languages.join(',') : null
      params.countryIds = movie.value.countryIds.length ? movie.value.countryIds.join(',') : null
      params.genres = movie.value.genres.length ? movie.value.genres.join(',') : null
      params.versions = movie.value.versions.length ? movie.value.versions.join(',') : null
      params.akas = movie.value.akas.length ? movie.value.akas.join(',') : null
      params.tags = movie.value.tags.length ? movie.value.tags.join(',') : null
      if (params.id) {
        await updateMovie(params)
        proxy.$modal.msgSuccess('修改成功')
      } else {
        const { data } = await createMovie(params)
        proxy.$modal.msgSuccess('新增成功')
        emit('success', data.id)
        id.value = data.id
        scrollTo(0, 800)
      }
    }
  })
}

/** 获取栏目 */
async function getColumns() {
  const { data } = await getColumnAll()
  allColumn.value = data
}

getColumns()

</script>

<style lang="scss">
.poster-item {
  position: relative;
  width: 100px;
  height: 140px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  .delete-poster {
    display: none;
    z-index: 9;
    position: absolute;
    top: -8px;
    right: -8px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background-color: #ccc;
    &:hover {
      background-color: red;
      cursor: pointer;
    }
  }
  .poster-none {
    color: #bbb;
  }
  > img {
    max-width: 100px;
    max-height: 140px;
  }
  &:hover {
    .delete-poster {
      display: block;
    }
    .poster-edit {
      opacity: 1;
      visibility: visible;
    }
  }
}
.poster-edit {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background: rgba(#000, 0.65);
  transition: visibility 0.2s, opacity 0.2s;
}
.bgcolor {
  display: flex;
  .bgcolor-picker {
    ::v-deep .el-color-picker__trigger {
      width: 100px;
      border-color: #dcdfe6;
    }
  }
  .bgcolor-input {
    margin-left: 10px;
    flex: 1;
  }
}
.sub-form {
  margin-bottom: 10px;
  padding-top: 18px;
  padding-right: 20px;
  border-radius: 4px;
  border: 1px dashed #dcdfe6;
  background-color: #f7f7f7;
}
</style>
