<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="中文简称" prop="keyword">
        <el-input
            v-model="queryParams.keyword"
            placeholder="请输入中文简称"
            clearable
            style="width: 240px"
            @keyup.enter="handleQuery"
        />
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
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
        >删除</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="id" min-width="100" label="ID" />
      <el-table-column prop="name" min-width="100" label="中文简称" />
      <el-table-column prop="fullname" min-width="100" label="中文全称" />
      <el-table-column prop="country.name" min-width="100" label="所属国家" />
      <el-table-column prop="nameEn" min-width="100" label="英文简称" />
      <el-table-column prop="fullnameEn" min-width="100" label="英文全称" />
      <el-table-column prop="movieCount" min-width="100" label="影视数量" />
      <el-table-column
          prop="brief"
          label="简介"
          min-width="180"
          show-overflow-tooltip
      />
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

    <el-dialog
        :title="title"
        v-model="open"
        width="800px"
        append-to-body>
      <el-form ref="languageRef" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="中文简称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入语言简称" />
        </el-form-item>

        <el-form-item label="中文全称：" prop="fullname">
          <el-input v-model="form.fullname" placeholder="请输入语言全称" />
        </el-form-item>

        <el-form-item label="所属国家：" prop="countryId">
          <remote-select
              v-model="form.countryId"
              :options="country"
              type="country"
              placeholder="语言所属国家/地区"
          />
        </el-form-item>

        <el-form-item label="英文简称：" prop="name_en">
          <el-input v-model="form.nameEn" placeholder="请输入语言英文简称" />
        </el-form-item>

        <el-form-item label="英文全称：" prop="fullname_en">
          <el-input v-model="form.fullnameEn" placeholder="请输入语言英文全称" />
        </el-form-item>

        <el-form-item label="原名简称：" prop="original_name">
          <el-input
              v-model="form.originalName"
              placeholder="请输入语言原名简称"
          />
        </el-form-item>

        <el-form-item label="原名全称：" prop="original_fullname">
          <el-input
              v-model="form.originalFullname"
              placeholder="请输入语言原名全称"
          />
        </el-form-item>

        <el-form-item label="简介：" prop="brief">
          <el-input
              type="textarea"
              v-model="form.brief"
              :autosize="{ minRows: 2, maxRows: 5 }"
              maxlength="200"
              show-word-limit
              placeholder="语言简介"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Language">
  import { getLanguageList, createLanguage, updateLanguage, deleteLanguage } from './services'
  const { proxy } = getCurrentInstance()

  const list = ref([])
  const ids = ref([]);
  const single = ref(true)
  const multiple = ref(true)
  const loading = ref(true)
  const showSearch = ref(true)
  const total = ref(0)
  const title = ref("")
  const open = ref(false)
  const country = ref([])
  const data = reactive({
    form: {},
    queryParams: {
      keyword: undefined,
      pageNum: 1,
      pageSize: 10,
    }
  })
  const rules = {
    name: [
      { required: true, message: '语言简称不能为空' }
    ]
  }

  const { queryParams, form } = toRefs(data);

  /** 查询国家列表 */
  async function getList() {
    loading.value = true;
    const data = await getLanguageList(queryParams.value)
    list.value = data.rows;
    total.value = data.total;
    loading.value = false;
  }
  /** 取消按钮 */
  function cancel() {
    open.value = false;
    reset();
  }
  /** 表单重置 */
  function reset() {
    form.value = {};
    proxy.resetForm("languageRef");
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
  /** 新增按钮操作 */
  function handleAdd() {
    reset();
    open.value = true;
    title.value = "添加语言";
  }
  /** 多选框选中数据 */
  function handleSelectionChange(selection) {
    ids.value = selection.map(item => item.id);
    single.value = selection.length !== 1;
    multiple.value = !selection.length;
  }
  /** 修改按钮操作 */
  function handleUpdate(row) {
    reset();
    const id = row.id || ids.value[0];
    open.value = true;
    const item = row.id ? row : list.value.find(value => value.id === id);
    form.value = { ...item };
    country.value = item.country ? [item.country] : [];
    title.value = "修改语言";
  }
  /** 提交按钮 */
  function submitForm() {
    proxy.$refs["languageRef"].validate(valid => {
      if (valid) {
        if (!form.value.countryId) {
          form.value.countryId = null
        }
        if (form.value.id) {
          updateLanguage(form.value).then(() => {
            proxy.$modal.msgSuccess("修改成功");
            open.value = false;
            getList();
          });
        } else {
          createLanguage(form.value).then(() => {
            proxy.$modal.msgSuccess("新增成功");
            open.value = false;
            getList();
          });
        }
      }
    });
  }
  /** 删除按钮操作 */
  function handleDelete(row) {
    const id = row.id || ids.value;
    proxy.$modal.confirm('是否确认删除"' + id + '"的数据项？').then(async () => {
      await deleteLanguage(id);
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
  }
  getList()
</script>
