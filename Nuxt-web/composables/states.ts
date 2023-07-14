/** 用户信息 **/
export const useToken = () => useState<string>('token', () => {
  const userInfo = useCookie<{ token: string }>('userInfo')
  return userInfo.value ? 'Bearer ' + userInfo.value.token : ''
})

/** 登录弹层显示状态 */
export const useLoginDialogVisible = () => useState<boolean>('loginDialogVisible', () => false)

/** 注册弹层显示状态 */
export const useRegDialogVisible = () => useState<boolean>('regDialogVisible', () => false)
