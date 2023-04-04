import {readBody} from 'h3'
import {IResData} from "~/global";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const body = await readBody(event)
  try {
    return await $fetch<IResData<any>>(runtimeConfig.baseUrl + '/web/user/login', {
      method: 'post',
      body
    })
  } catch (e: any) {
    return JSON.parse(JSON.stringify(e.data))
  }
})