import { UserData } from '@/@types'

export type State = {
  userData: UserData,
  userToken: string
}

const defaultUserData = {
  name: 'chenh',
  age: 20,
  role: 'admin'
}

export const state: State = {
  userData: defaultUserData,
  userToken: ''
}
