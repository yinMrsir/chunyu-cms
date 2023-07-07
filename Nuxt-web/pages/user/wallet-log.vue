<template>
  <div class="container user-index">
    <el-row :gutter="30" class="mt-20">
      <el-col :md="6" :xs="24">
        <UserInfoData />
      </el-col>
      <el-col :md="18" :xs="24" class="bg-fff">
        <client-only>
          <el-tabs model-value="logs">
            <el-tab-pane label="金币记录" name="logs">
              <el-table :data="list">
                <el-table-column prop="type" label="类型">
                  <template #default="scope">
                    <el-tag :type="+scope.row.type === 1 ? 'success' : 'danger'">{{ +scope.row.type === 1 ? '新增' : '扣除'}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="说明" />
                <el-table-column prop="gold" label="金币" />
                <el-table-column prop="createTime" label="创建时间">
                  <template #default="scope">
                    {{ dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                  </template>
                </el-table-column>
              </el-table>
              <div class="wallet-log__pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    :page-size="queryParams.pageSize"
                    :pager-count="5"
                    :total="count"
                    @current-change="handleCurrentChange"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </client-only>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {IResPage} from "~/global";

const runtimeConfig = useRuntimeConfig()
const userInfo = useCookie<{ token: string }>('userInfo')
const list = ref([])
const queryParams = reactive({
  pageSize: 10
})
const count = ref(0)
const currentPage = ref<number>(1)

const headers = {
  Authorization: 'Bearer ' + userInfo.value?.token
}

onMounted(() => {
  getList()
})

async function getList() {
  const { rows, total } = await $fetch<IResPage<any>>(runtimeConfig.public.apiBase + '/user-wallet/logs', {
    query: queryParams,
    headers
  })
  list.value = rows
  count.value = total
}

function handleCurrentChange(page: number) {
  currentPage.value = page
  getList()
}
</script>

<style lang="scss" scoped>
.wallet-log {
  &__pagination {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>