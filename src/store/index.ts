import { createStore } from 'vuex'
// 持久化存储vuex信息，默认localStorage
import createPersistedState from 'vuex-persistedstate'

import { store as user, UserStore, State as userState } from './modules/user'

export type RootState = {
  user: userState
}

export type Store = UserStore<Pick<RootState, 'user'>>
// export type Store = UserStore<Pick<RootState, 'user'>> &
//   AppStore<Pick<RootState, 'app'>>

// const debug = import.meta.env.MODE !== 'production'
// const plugins = debug ? [createLogger({})] : []
const plugins = []

plugins.push(createPersistedState({ storage: window.sessionStorage }))

export const store = createStore({
  plugins,
  modules: {
    user
  }
})

export function useStore(): Store {
  return store as Store
}

