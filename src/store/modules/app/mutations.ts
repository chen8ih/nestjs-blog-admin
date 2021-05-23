import { MutationTree } from 'vuex'
import { State } from './state'

import { AppMutationTypes as types } from './mutations-types'

export type Mutations<S = State> = {
  [types.SET_ACTIVE_MENU](state: S, payload: string): void
  [types.SET_BREADCRUMB](state: S, payload: string[]): void
}

export const mutations: MutationTree<State> & Mutations = {
  [types.SET_ACTIVE_MENU](state: State, path: string) {
    state.activeMenuPath = path
  },
  [types.SET_BREADCRUMB](state: State, breadcrumb: string[]) {
    state.breadcrumb = breadcrumb
  }
}
