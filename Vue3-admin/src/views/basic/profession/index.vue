<template>
  <div class="app-container">
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
            type="info"
            plain
            icon="Sort"
            @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
        v-if="refreshTable"
        v-loading="loading"
        :data="list"
        row-key="id"
        :default-expand-all="isExpandAll"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
          prop="name"
          label="职务名称"
          header-align="center"
          align="left"
      />
      <el-table-column prop="nameEn" label="英文名称" align="center" />
      <el-table-column prop="movieCount" label="相关影人数" align="center" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160" align="center">
        <template #default="scope">
          <el-button link type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button link type="primary" @click="handleAdd(scope.row)">新增</el-button>
          <el-button link type="primary" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        :title="title"
        v-model="open"
        width="600px"
        append-to-body>
      <el-form ref="languageRef" :model="form" label-width="100px" :rules="rules">
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <el-tree-select
                v-model="form.parentId"
                :data="menuOptions"
                :props="{ value: 'id', label: 'name', children: 'children' }"
                value-key="id"
                placeholder="选择上级菜单"
                check-strictly
                :default-expanded-keys="defaultExpandedKeys"
            />
          </el-form-item>
        </el-col>

        <el-form-item label="中文名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入职务名称" />
        </el-form-item>

        <el-form-item label="英文简称：" prop="name_en">
          <el-input v-model="form.nameEn" placeholder="请输入职务英文名称" />
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

        <el-form-item label="简介：" prop="brief">
          <el-input
              type="textarea"
              v-model="form.brief"
              :autosize="{ minRows: 2, maxRows: 5 }"
              maxlength="200"
              show-word-limit
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

<script setup name="Profession">
  import {createProfession, deleteProfession, getProfessionAll, updateProfession} from './services'

  const { proxy } = getCurrentInstance()
  const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

  const list = ref([])
  const ids = ref([]);
  const single = ref(true)
  const multiple = ref(true)
  const loading = ref(true)
  const showSearch = ref(true)
  const total = ref(0)
  const title = ref("")
  const open = ref(false)
  const isExpandAll = ref(true);
  const refreshTable = ref(true);
  const menuOptions = ref([]);

  const defaultExpandedKeys = ref([]);

  const data = reactive({
    form: {}
  })
  const rules = {
    name: [
      { required: true, message: '语言简称不能为空' }
    ]
  }

  const { queryParams, form } = toRefs(data);

  /** 展开/折叠操作 */
  function toggleExpandAll() {
    refreshTable.value = false;
    isExpandAll.value = !isExpandAll.value;
    nextTick(() => {
      refreshTable.value = true;
    });
  }
  /** 查询影人职务列表 */
  async function getList() {
    loading.value = true;
    const { data } = await getProfessionAll();
    list.value =  proxy.handleTree(data, "id");
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
  async function handleAdd(row) {
    reset();
    await getTreeselect();
    open.value = true;
    if (row && row.id) {
      defaultExpandedKeys.value = ['0'].concat(row.mpath.split('.'))
      form.value.parentId = row.id;
    } else {
      form.value.parentId = '0';
    }
    title.value = "添加影人";
  }
  /** 修改按钮操作 */
  async function handleUpdate(row) {
    reset();
    await getTreeselect();
    const id = row.id || ids.value[0];
    open.value = true;
    const item = row.id ? row : list.value.find(value => value.id === id);
    form.value = { ...item };
    defaultExpandedKeys.value = item.mpath.split('.')
    title.value = "修改影人";
  }
  /** 提交按钮 */
  function submitForm() {
    proxy.$refs["languageRef"].validate(valid => {
      if (valid) {
        if (!form.value.countryId) {
          form.value.countryId = null
        }
        if (form.value.id) {
          updateProfession(form.value).then(() => {
            proxy.$modal.msgSuccess("修改成功");
            open.value = false;
            getList();
          });
        } else {
          createProfession(form.value).then(() => {
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
      await deleteProfession(id);
      getList();
      proxy.$modal.msgSuccess("删除成功");
    })
  }
  /** 查询菜单下拉树结构 */
  function getTreeselect() {
    menuOptions.value = [];
    getProfessionAll().then(response => {
      const menu = { id: '0', name: "主类目", children: [] };
      menu.children = proxy.handleTree(response.data, "id");
      menuOptions.value.push(menu);
    });
  }

  getList()
</script>
