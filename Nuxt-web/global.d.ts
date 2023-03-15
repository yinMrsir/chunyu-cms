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
