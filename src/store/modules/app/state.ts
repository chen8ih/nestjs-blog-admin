// 菜单选中项
const defaultActiveMenuPath = '/home'

// 面包屑默认首页
const defaultBreadcrumb = ['首页']

export type State = {
  breadcrumb: string[]
  activeMenuPath: string
}

export const state: State = {
  breadcrumb: defaultBreadcrumb,
  activeMenuPath: defaultActiveMenuPath,
}