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
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table border stripe v-loading="loading" :data="list" :span-method="spanMethod">
      <el-table-column
          prop="country.name"
          label="所属国家"
          width="120"
      />
      <el-table-column
          prop="level"
          label="家长引导"
          width="120"
      />
      <el-table-column
          prop="levelZh"
          label="家长引导中文"
          width="120"
      />
      <el-table-column prop="descript" label="引导模板" align="left" />
      <el-table-column prop="status" label="类型状态" width="100">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
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
      <el-form ref="levelRef" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="国家/地区：" prop="countryId">
          <remote-select
              v-model="form.countryId"
              :options="country"
              type="country"
              placeholder="语言所属国家/地区"
          />
        </el-form-item>

        <el-form-item label="家长引导：" prop="level">
          <el-input v-model="form.level" placeholder="请输入家长引导等级" />
        </el-form-item>

        <el-form-item label="引导中文：" prop="levelZh">
          <el-input
              v-model="form.levelZh"
              placeholder="请输入家长引导中文等级"
          />
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

        <el-form-item label="引导模板：" prop="descript">
          <el-input
              type="textarea"
              v-model="form.descript"
              :autosize="{ minRows: 4, maxRows: 8 }"
              maxlength="100"
              show-word-limit
              placeholder="例：本片在${country}的评级为【${level}】，适合任何年龄观看。"
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


<script setup>
import { getLevelList, createLevel, deleteLevel, updateLevel } from './services'
const { proxy } = getCurrentInstance();
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const rules = {
  level: [
    {
      required: true,
      message: "请输入家长引导等级",
      trigger: "blur",
    },
    {
      min: 1,
      max: 16,
      message: "长度在 1 到 16 个字符",
      trigger: "blur",
    },
  ],
  levelZh: [
    {
      max: 32,
      message: "长度不能超过 32 个字符",
      trigger: "blur",
    },
  ],
  countryId: [
    {
      required: true,
      message: "请选择国家",
      trigger: "change",
    },
  ],
  descript: [
    {
      required: true,
      trigger: "blur",
    },
    {
      min: 1,
      max: 100,
      message: "长度在 1 到 100 个字符",
      trigger: "blur",
    },
  ],
}
const list = ref([])
const total = ref(0)
const loading = ref(true)
const title = ref("")
const open = ref(false)
const country = []
const data = reactive({
  form: {},
  queryParams: {
    keyword: undefined,
    pageNum: 1,
    pageSize: 10,
  }
})

const { queryParams, form } = toRefs(data);
/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加家长引导";
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["levelRef"].validate(valid => {
    if (valid) {
      if (form.value.id) {
        console.log(form.value)
        updateLevel(form.value).then(() => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        createLevel(form.value).then(() => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {};
  proxy.resetForm("levelRef");
}
/** 删除按钮操作 */
function handleDelete(row) {
  const id = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除"' + id + '"的数据项？').then(async () => {
    await deleteLevel(id);
    getList();
    proxy.$modal.msgSuccess("删除成功");
  })
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value[0];
  open.value = true;
  const item = row.id ? row : list.value.find(value => value.id === id);
  form.value = { ...item };
  country.value = item.country ? [item.country] : [];
  title.value = "修改家长引导";
}
/** 查询列表 */
async function getList() {
  loading.value = true;
  const data = await getLevelList(queryParams.value)
  list.value = data.rows;
  total.value = data.total;
  loading.value = false;
}

function spanMethod({ row, column, rowIndex, columnIndex }) {
  if (columnIndex === 0) {
    // 当 当前行与上一行内容相同时 返回0 0 意味消除
    if (
        rowIndex > 0 &&
        row.countryId === list.value[rowIndex - 1]["countryId"]
    ) {
      return {
        rowspan: 0,
        colspan: 0,
      };
    } else {
      let rows = 1;
      for (let i = rowIndex; i < list.value.length - 1; i++) {
        if (row["countryId"] === list.value[i + 1]["countryId"]) {
          rows++;
        }
      }
      // 返回相同内容的行数
      return {
        rowspan: rows,
        colspan: 1,
      };
    }
  }
}

getList()
</script>
