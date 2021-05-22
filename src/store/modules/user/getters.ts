import { GetterTree } from 'vuex'
import { UserData } from '@/@types'
import { RootState } from '@/store'
import { State } from './state'

export type Getters = {
  userData(state: State): UserData
  userToken(state: State): string
}

export const getters: GetterTree<State, RootState> & Getters = {
  userData: (state) => state.userData,
  userToken: (state) => state.userToken,
}