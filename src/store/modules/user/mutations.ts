import { MutationTree } from 'vuex'
import { UserData } from '@/@types'
import { State } from './state'

import { UserMutationTypes as types } from './mutations-types'

export type Mutations<S = State> = {
  [types.SET_USER](state: S, payload: UserData): void
  [types.SET_TOKEN](state: S, payload: String): void
}

export const mutations: MutationTree<State> & Mutations = {
  [types.SET_USER](state: State, user: UserData) {
    state.userData = user
  },
  [types.SET_TOKEN](state: State, token: string) {
    state.userToken = token
  }
}
