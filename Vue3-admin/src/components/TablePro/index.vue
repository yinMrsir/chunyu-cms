<template>
  <div>
    <el-form v-if="filterOptions.length > 0" :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <template v-for="item in filterOptions">
        <el-form-item :label="item.title" :prop="item.field">
          <template v-if="item.type === 'select' || item.type === 'radio'">
            <el-select v-model="queryParams[item.field]" :placeholder="`请选择${item.title}`" clearable>
              <el-option
                  v-for="item in item.options"
                  :key="+item.value"
                  :label="item.label"
                  :value="+item.value">
              </el-option>
            </el-select>
          </template>
          <template v-else>
            <el-input v-model="queryParams[item.field]" :placeholder="`请输入${item.title}`" />
          </template>
        </el-form-item>
      </template>

      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5" v-if="isShowButtonList">
        <el-button
            v-if="formOptions.length > 0"
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5" v-if="isShowButtonList">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5" v-if="isShowButtonList">
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
      <el-table-column v-if="isShowIdColumn" prop="id" width="60" label="ID" align="center"  />
      <template v-for="item in TableOptions">
        <template v-if="item.slot">
          <el-table-column :prop="item.field" :label="item.title" v-bind="item.props">
            <template #default="scope">
              <slot :name="item.slot" v-bind="scope"></slot>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.actions">
          <el-table-column label="操作" align="center" v-bind="item.props">
            <template #default="scope">
              <el-button
                  link
                  type="primary"
                  v-for="act in item.actions"
                  @click="act.type === 'edit' ? handleUpdate(scope.row, act.beforeCallback) : act.type === 'delete' ? handleDelete(scope.row) : (act.click && act.click(scope.row))">
                {{ act.type === 'edit' ? '编辑' : act.type === 'delete' ? '删除' : act.text }}
              </el-button>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'img'">
          <el-table-column :prop="item.field" :label="item.title" v-bind="item.props">
            <template #default="scope">
              <el-image
                  :src="item.render ? item.render(scope.row) :
                  (
                      (scope.row[item.field]?.indexOf('http') > -1 || scope.row[item.field]?.indexOf('base64') > -1 || scope.row[item.field]?.indexOf('/external') > -1) ? scope.row[item.field] :
                      baseUrl + (scope.row[item.field] || '/default.jpg')
                  )"
                  :style="item.style || { width: '70px', maxHeight: '100px' }"
                  fit="cover"
              />
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.render">
          <el-table-column :prop="item.field" :label="item.title" v-bind="item.props">
            <template #default="scope">
              {{ item.render(scope.row) }}
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'radio' || item.type === 'select'">
          <el-table-column :prop="item.field" :label="item.title" v-bind="item.props">
            <template #default="scope">
              <dict-tag :options="item.options" :value="scope.row[item.field]" />
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'date' || item.type === 'dateTime'">
          <el-table-column :prop="item.field" :label="item.title" v-bind="item.props">
            <template #default="scope">
              <span>{{ parseTime(scope.row[item.field], item.type === 'date' ? '{y}-{m}-{d}' : item.dateFormat) }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type === 'desc'">
          <el-table-column :prop="item.field" :label="item.title" v-bind="item.props">
            <template #default="scope">
              <div class="table-pro__desc">
                {{ scope.row[item.field] }}
              </div>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column :prop="item.field" :label="item.title" v-bind="item.props" />
        </template>
      </template>
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
        :width="formDialogWidth"
        append-to-body
        :close-on-click-modal="false">
      <el-form ref="formRef" :model="form" label-width="100px" :rules="rules">
        <el-form-item :label="`${item.title}：`" :prop="item.field" v-for="item in formOptions">
          <template v-if="item.formSlot">
            <slot :name="item.formSlot" v-bind="item"></slot>
          </template>
          <template v-else-if="item.type === 'date'">
            <el-date-picker
                v-model="form[item.field]"
                type="date"
                :placeholder="`请输入${item.title}`"
                value-format="YYYY-MM-DD"
            />
          </template>
          <template v-else-if="item.type === 'radio'">
            <el-radio-group v-model="form[item.field]" v-bind="item.formProps" @change="item.change">
              <el-radio :label="radio.value" v-for="(radio, index) in item.options" :key="index">{{ radio.label }}</el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select v-model="form[item.field]" :placeholder="`请选择${item.title}`" v-bind="item.formProps">
              <el-option
                  v-for="(item, index) in item.options"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'country'">
            <remote-select
                v-model="form[item.field]"
                :options="countryOptions"
                type="country"
                :placeholder="`请选择${item.title}`"
            />
          </template>
          <template v-else-if="item.type === 'actor'">
            <remote-select
              v-model="form[item.field]"
              :options='actorOptions'
              type="actor"
              :placeholder="`请选择${item.title}`"
            />
          </template>
          <template v-else-if="item.type === 'role'">
            <remote-select
                v-model="form[item.field]"
                :options='roleOptions'
                type="role"
                :placeholder="`请选择${item.title}`"
            />
          </template>
          <template v-else-if="item.type === 'cascader'">
            <el-cascader
                :options="item.options || []"
                v-model="form[item.field]"
                v-bind="item.formProps"
            />
          </template>
          <template v-else-if="item.type === 'img'">
            <image-upload
                type="flag"
                :limit="1"
                v-model:modelValue="form[item.field]"
            />
          </template>
          <template v-else-if="item.type === 'number'">
            <el-input-number v-model="form[item.field]" :placeholder="`请输入${item.title}`" style="width: 160px" />
          </template>
          <template v-else-if="item.type === 'tag'" >
            <tag-group size="large" v-model="form[item.field]" :placeholder="`添加${item.title}`" />
          </template>
          <template v-else>
            <el-input v-model="form[item.field]" :placeholder="`请输入${item.title}`" v-bind="item.formProps" />
          </template>
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

<script setup name="TablePro">
const baseUrl = import.meta.env.VITE_APP_BASE_API;
const { proxy } = getCurrentInstance()
const props = defineProps({
  columns: {
    type: Array,
    default: []
  },
  tableRequestFn: {
    type: Function,
    default: () => {}
  },
  createFn: {
    type: Function,
    default: () => {}
  },
  updateFn: {
    type: Function,
    default: () => {}
  },
  deleteFn: {
    type: Function,
    default: () => {}
  },
  closeModalCallback: {
    type: Function,
    default: () => {}
  },
  addBtnCallback: {
    type: Function,
    default: () => {}
  },
  dialogTitle: {
    type: String,
    default: ''
  },
  tableParams: {
    type: Object,
    default: {}
  },
  formParams: {
    type: Object,
    default: {}
  },
  formDialogWidth: {
    type: String,
    default: '600px'
  },
  isShowIdColumn: {
    type: Boolean,
    default: true
  },
  isShowButtonList: {
    type: Boolean,
    default: true
  },
  isAutoFetch: {
    type: Boolean,
    default: true
  }
})
const list = ref([])
const ids = ref([])
const loading = ref(true)
const single = ref(true)
const multiple = ref(true)
const showSearch = ref(true)
const total = ref(0)
const title = ref("")
const open = ref(false)
const countryOptions = ref([])
const actorOptions = ref([])
const roleOptions = ref([])
const data = reactive({
  form: { ...props.formParams },
  queryParams: {
    status: undefined,
    pageNum: 1,
    pageSize: 10,
  }
})
const { queryParams, form } = toRefs(data);
// 新增编辑表单验证规则
const rules = computed(() => {
  const obj = {}
  props.columns.forEach(value => {
    if (Object.prototype.toString.call(value.add) === '[object Array]') {
      obj[value.field] = value.add
    }
  })
  return obj
})
// 表格显示相关项
const TableOptions = computed(() => {
  return props.columns.filter(value => !value.hidden).sort((a, b) => a.sort - b.sort)
})
// 搜索的相关项
const filterOptions = computed(() => {
  return props.columns.filter(value => value.search)
})
// 新增/编辑项
const formOptions = computed(() => {
  return props.columns.filter(value => value.add)
})

if (props.isAutoFetch) {
  getList()
}

/** 获取表格数据 */
async function getList(params = {}) {
  loading.value = true
  try {
    const data = await props.tableRequestFn({
      ...queryParams.value,
      ...props.tableParams,
      ...params
    })
    list.value = data.rows
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 表单重置 */
function reset() {
  form.value = { ...props.formParams };
  proxy.resetForm("formRef");
}

/** 新增 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加" + props.dialogTitle;
  props.addBtnCallback()
}

/** 修改 */
async function handleUpdate(row, beforeCallback) {
  reset();
  const id = row.id || ids.value[0];
  open.value = true;
  let item = row.id ? row : list.value.find(value => value.id === id);
  if (beforeCallback) {
    item = await beforeCallback(item)
  }
  form.value = { ...item };
  countryOptions.value = item.country ? [item.country] : [];
  actorOptions.value = item.actor ? [item.actor] : [];
  roleOptions.value = item.role ? [item.role] : [];
  title.value = "修改" + props.dialogTitle;
}

/** 删除 */
function handleDelete(row) {
  const id = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除"' + id + '"的数据项？').then(async () => {
    try {
      await props.deleteFn(id);
      proxy.$modal.msgSuccess("删除成功");
      await getList();
    } catch (e) {
      console.warn(e)
    }
  })
}

/** 提交 新增/修改 */
function submitForm() {
  proxy.$refs['formRef'].validate(async valid => {
    if (valid) {
      try {
        if (form.value.id) {
          await props.updateFn(form.value)
        } else {
          await props.createFn(form.value)
        }
        proxy.$modal.msgSuccess("成功")
        open.value = false
        await getList()
      } catch (e) {
        console.warn(e)
      }
    }
  })
}

/** 取消 */
function cancel() {
  open.value = false;
  reset();
  props.closeModalCallback()
}

/** 选择后触发 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
}

/** 搜索 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

defineExpose({
  getList
})

</script>

<style lang="scss" scoped>
.table-pro {
  &__desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }
}
</style>
