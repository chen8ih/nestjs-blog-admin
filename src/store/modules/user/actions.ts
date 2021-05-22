import { ActionTree } from 'vuex'
import { RootState } from '@/store'
import { State } from './state'
import { UserActionsTypes as types } from './actions-types'

export interface Actions {
  [types.NON_ACTION](): void
}

export const actions: ActionTree<State, RootState> & Actions = {
  [types.NON_ACTION]() {},
}