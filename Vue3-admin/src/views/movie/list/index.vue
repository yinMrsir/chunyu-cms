<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="中文名" prop="keyword">
        <el-input v-model="queryParams.keyword" placeholder="请输入中文名"></el-input>
      </el-form-item>
      <el-form-item label="所属栏目" prop="columnValue">
        <el-select v-model="queryParams.columnValue" @change="columnValueChange" clearable>
          <el-option
              v-for="item in allColumn"
              :key="+item.id"
              :label="item.name"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="genres">
        <el-select v-model="queryParams.genres" placeholder="请选择类型" clearable>
          <el-option
              v-for="item in genresList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-select v-model="queryParams.country" placeholder="请选择类型" clearable>
          <el-option
              v-for="item in countryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年份" prop="year">
        <el-select v-model="queryParams.year" placeholder="请选择年份" clearable>
          <el-option
              v-for="(item, index) in yearList"
              :key="index"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语言" prop="language">
        <el-select v-model="queryParams.language" placeholder="请选择语言" clearable>
          <el-option
              v-for="item in languageList"
              :key="item.id"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否付费" prop="isPay">
        <el-select v-model="queryParams.isPay" placeholder="请选择" clearable>
          <el-option label="免费" value="0"></el-option>
          <el-option label="付费" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="更新日期" prop="date">
        <el-date-picker
            type="daterange"
            v-model="queryParams.date"
            value-format="YYYY-MM-DD"
            start-placeholder="开始时间"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
        >新增</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table ref="tableRef" v-loading="loading" :data="list" style="width: 100%" :max-height="maxHeight">
      <el-table-column prop="poster" label="封面" width="100" fixed="left">
        <template #default="scope">
          <el-image
              :src="scope.row.poster"
              style="width: 70px; height: 100px"
              fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="中文名" min-width="180"></el-table-column>
      <el-table-column prop="columnValue" label="所属栏目">
        <template #default="scope">
          <dict-tag :options="allColumnOptions" :value="scope.row.columnValue" />
        </template>
      </el-table-column>
      <el-table-column prop="genres" label="类型" min-width="160px"></el-table-column>
      <el-table-column prop="address" label="国家/地区" min-width="160px">
        <template #default="scope">
          {{ scope.row.country.map(value => value.name).join(',') }}
        </template>
      </el-table-column>
      <el-table-column prop="year" label="年代"></el-table-column>
      <el-table-column prop="languages" label="语言" min-width="120px"></el-table-column>
      <el-table-column prop="movieRate.rate" label="评分"></el-table-column>
      <el-table-column prop="movieRate.rateUserCount" label="评分人数"></el-table-column>
      <el-table-column prop="duration" label="时长"></el-table-column>
      <el-table-column prop="seasonCount" label="季数"></el-table-column>
      <el-table-column prop="episodeCount" label="集数"></el-table-column>
      <el-table-column prop="moviePv.pv" label="访问量"></el-table-column>
      <el-table-column prop="userCollectsCount" label="收藏量"></el-table-column>
      <el-table-column prop="address" label="评论数"></el-table-column>
      <el-table-column prop="isPay" label="是否付费">
        <template #default="scope">
          <el-tag :type="scope.row.isPay === 1 ? 'warning' : 'success'">{{ scope.row.isPay === 1 ? '付费' : '免费'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="movieVideosCount" label="视频数"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="170px" >
        <template #default="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="170px">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="130" align="center">
        <template #default="scope">
          <el-button link type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button link type="primary" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />
  </div>
</template>

<script setup name="Movie-list">
import { getMovieList, deleteMovie } from './services';
import { getGenreAll } from "@/views/basic/genre/services";
import {getCountryAll} from "@/views/basic/country/services";
import {getLanguageAll} from "@/views/basic/language/services";
import {getColumnAll} from "@/views/column/services";
const baseUrl = import.meta.env.VITE_APP_BASE_API;
const { proxy } = getCurrentInstance()
const { movie_category_type } = proxy.useDict("movie_category_type");

const maxHeight = window.innerHeight - 280
const loading = ref(true)
const list = ref([])
const total = ref(0)
const showSearch = ref(true)
const queryParams = ref({
  keyword: undefined,
  pageNum: 1,
  pageSize: 10,
  columnValue: undefined,
  genres: undefined,
  country: undefined,
  year: undefined,
  language: undefined
})
const genresList = ref([])
const countryList = ref([])
const yearList = ref([])
const languageList = ref([])
const allColumn = ref([])

const y = new Date().getFullYear();
for (let i = 0 ; i <= 15 ; i++){
  yearList.value.push(y-i)
}

const allColumnOptions = computed({
  get: () => allColumn.value.map(value => ({ label: value.name, value: value.value }))
})

/** 新增按钮操作 */
function handleAdd() {
  proxy.$tab.openPage('/movie/add', '新增影视')
}
/** 查询国家列表 */
async function getList() {
  loading.value = true;
  const data = await getMovieList(queryParams.value)
  list.value = data.rows;
  total.value = data.total;
  loading.value = false;
  proxy.$refs['tableRef'].setScrollTop(0)
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
/** 修改按钮操作 */
function handleUpdate(row) {
  proxy.$tab.openPage('/movie/add?id=' + row.id)
}
/** 删除按钮操作 */
function handleDelete(row) {
  const id = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除"' + id + '"的数据项？').then(async () => {
    await deleteMovie(id);
    getList();
    proxy.$modal.msgSuccess("删除成功");
  })
}
/** 分类方法变化 */
async function columnValueChange(val) {
  const data = await getGenreAll({
    columnValue: val
  })
  genresList.value = data.data
}
/** 获取地区 */
async function getCountry() {
  const data = await getCountryAll()
  countryList.value = data.data
}
/** 获取语言 */
async function getLanguage() {
  const data = await getLanguageAll()
  languageList.value = data.data
}
/** 获取栏目 */
async function getColumns() {
  const { data } = await getColumnAll()
  allColumn.value = data
}

getList()
getCountry()
getLanguage()
getColumns()
</script>
