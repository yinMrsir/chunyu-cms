/** 登录状态 */
export const useIsLogin = () => useState<boolean>('isLogin', () => false)

/** 登录弹层显示状态 */
export const useLoginDialogVisible = () => useState<boolean>('loginDialogVisible', () => false)

/** 注册弹层显示状态 */
export const useRegDialogVisible = () => useState<boolean>('regDialogVisible', () => false)
