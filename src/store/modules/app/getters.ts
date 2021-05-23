import { GetterTree } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
  breadcrumb(state: State): string[]
  activeMenu(state: State): string
}

export const getters: GetterTree<State, RootState> & Getters = {
  breadcrumb: (state) => state.breadcrumb,
  activeMenu: (state) => state.activeMenuPath,
}
