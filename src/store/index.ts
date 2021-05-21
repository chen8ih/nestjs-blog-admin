import Vuex, { createStore } from 'vuex'
import getters from './getters'
// const modulesFiles = import.meta.globEager('./modules/*.ts')

// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

const store = new Vuex.Store({
  modules: {},
  getters
})

export default store
