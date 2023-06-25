export interface IResOptions {
  code: number
  msg: string
}

export interface IResPage<T> extends IResOptions {
  rows: T
  total: number
}

export interface IResData<T> extends IResOptions {
  data: T
}

export interface MovieGatherRes {
  title: string
  id: number
  rows: Object[]
  childCategories: Object[],
  cssClass: string
}


type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  pending: Ref<boolean>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  error: Ref<ErrorT | null>
}

interface AsyncDataExecuteOptions {
  dedupe?: boolean
}

