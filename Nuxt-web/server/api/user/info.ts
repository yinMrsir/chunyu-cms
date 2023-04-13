import {useGet} from "~/composables/useHttp";

export default defineEventHandler((event) => {
  return useGet<{data: any}>('/web/user/info', {}, { Authorization: event.context.Authorization })
})