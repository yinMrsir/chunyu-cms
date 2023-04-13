import {readBody} from 'h3'
import {usePost} from "~/composables/useHttp";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return usePost('/web/user/login', body)
})
