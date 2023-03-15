<template>
  <div class="tag-group">
    <el-tag
      v-for="tag in tags"
      :key="tag"
      :size="size"
      :effect="effect"
      :type="type"
      closable
      disable-transitions
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>

    <el-input
      class="input-new-tag"
      v-model="inputValue"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
      :placeholder="placeholder"
      :style="{ width: inputWidth }"
    />
  </div>
</template>


<script setup name="TagGroup">
/**
 * m-tag-group
 * @module components/MTagGroup
 * @desc element-ui tag 二次封装 group形式
 * @param {array} [value] - tag 内容数组
 * @param {string} [effect] - 主题，参考 el-tag
 * @param {string} [type] - 类型，参考 el-tag
 * @param {string} [size] - 尺寸，参考 el-tag
 * @param {string} [placeholder] - 输入框占位文本，默认值为"添加标签"
 * @param {string} [inputWidth] - 输入框宽度，单位px，默认"100px"
 *
 * @example
 * <tag-group v-model="tags" placeholder="添加标签" />
 */
const { proxy } = getCurrentInstance()
const emit = defineEmits();
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => {
      return [];
    },
  },
  effect: {
    default: "light",
  },
  type: {
    default: "",
  },
  size: {
    default: "larger",
  },
  placeholder: {
    type: String,
    default: "添加标签",
  },
  inputWidth: {
    type: String,
  },
})

const inputValue = ref('')
const tags = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  if (val) {
    tags.value = val
  }
})

function handleClose(tag) {
  tags.value.splice(tags.value.indexOf(tag), 1);
  emit("update:modelValue", tags.value);
}

function handleInputConfirm() {
  if (tags.value.includes(inputValue.value)) {
    proxy.$modal.msgWarning("该标签已存在");
    return;
  }

  if (inputValue.value) {
    props.modelValue.push(inputValue.value);
    emit("update:modelValue", tags.value);
  }
  inputValue.value = "";
}
</script>

<style lang="scss">
.tag-group {
  .el-tag {
    margin-right: 10px;
    margin-bottom: 8px;
  }
  .input-new-tag {
    width: 100px;
    .el-input__wrapper {
      vertical-align: top;
      border-style: dashed;
      font-size: 12px;
      border-width: 1px;
      border-color: #DCDFE6;
      box-shadow: none;
      .el-input__inner {
        border: 0;
        height: 28px;
        line-height: 28px;
      }
    }
  }
}
</style>
