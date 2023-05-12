<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属栏目" prop="columnValue">
        <el-select
            v-model="queryParams.columnValue"
            placeholder="请选择所属栏目"
            clearable
            style="width: 240px"
        >
          <el-option
              v-for="dict in allColumn"
              :key="+dict.id"
              :label="dict.name"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
            v-model="queryParams.status"
            placeholder="请选择状态"
            clearable
            style="width: 240px"
        >
          <el-option
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
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
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="columnValue" label="所属栏目">
        <template #default="scope">
          <dict-tag :options="allColumnOptions" :value="scope.row.columnValue" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="类型名称" />
      <el-table-column prop="nameEn" label="英文名称" />
      <el-table-column prop="count" label="相关影视数" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" align="center">
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
        width="600px"
        append-to-body>
      <el-form ref="languageRef" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="分类名称：" prop="category">
          <el-select
              v-model="form.columnValue"
              placeholder="请选择所属栏目"
              clearable
              style="width: 240px"
          >
            <el-option
                v-for="dict in allColumn"
                :key="+dict.id"
                :label="dict.name"
                :value="dict.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="中文名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入中文名称" />
        </el-form-item>

        <el-form-item label="英文名称：" prop="name_en">
          <el-input v-model="form.nameEn" placeholder="请输入英文名称" />
        </el-form-item>

        <el-form-item label="类型状态" prop="status">
          <el-select
              v-model="form.status"
              placeholder="状态"
              clearable
              style="width: 240px"
          >
            <el-option
                v-for="dict in sys_normal_disable"
                :key="+dict.value"
                :label="dict.label"
                :value="+dict.value"
            />
          </el-select>
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

<script setup name="Genre">
  import { getGenreList, createGenre, updateGenre, deleteGenre } from './services';
  import {getColumnAll} from "@/views/column/services";
  const { proxy } = getCurrentInstance();
  const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
  const allColumn = ref([])

  const list = ref([])
  const ids = ref([]);
  const single = ref(true)
  const multiple = ref(true)
  const loading = ref(true)
  const showSearch = ref(true)
  const total = ref(0)
  const title = ref("")
  const open = ref(false)
  const data = reactive({
    form: {},
    queryParams: {
      status: undefined,
      pageNum: 1,
      pageSize: 10,
    }
  })
  const rules = {
    columnValue: [
      { required: true, message: '请选择栏目' }
    ],
    name: [
      { required: true, message: '请输入中文名称' }
    ]
  }

  const allColumnOptions = computed({
    get: () => allColumn.value.map(value => ({ label: value.name, value: value.value }))
  })

  const { queryParams, form } = toRefs(data);

  /** 查询国家列表 */
  async function getList() {
    loading.value = true;
    const data = await getGenreList(queryParams.value)
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
    title.value = "修改语言";
  }
  /** 提交按钮 */
  function submitForm() {
    proxy.$refs["languageRef"].validate(valid => {
      if (valid) {
        if (form.value.id) {
          updateGenre(form.value).then(() => {
            proxy.$modal.msgSuccess("修改成功");
            open.value = false;
            getList();
          });
        } else {
          createGenre(form.value).then(() => {
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
      await deleteGenre(id);
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
  }
  /** 获取栏目 */
  async function getColumns() {
    const { data } = await getColumnAll({ type: 1 })
    allColumn.value = data
  }

  getList()
  getColumns()
</script>
