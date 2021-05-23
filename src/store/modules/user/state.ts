import { UserData } from '@/@types'

export type State = {
  userData: UserData,
  userToken: string
}

const defaultUserData = {
  id: 0,
  name: '',
  nickName: '',
  mail: '',
  sex: '',
  headImg: ''
}

export const state: State = {
  userData: defaultUserData,
  userToken: ''
}
