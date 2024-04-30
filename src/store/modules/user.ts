import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import store from '@/store'

export interface IUserState {
  token: string
  username: string
  login_time: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public username = ''
  public login_time = ''

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(username: string) {
    this.username = username
  }





  @Mutation
  private SET_login_time(login_time: string) {
    this.login_time = login_time
  }


  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo()
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { username, login_time } = data


    this.SET_NAME(username)

    this.SET_login_time(login_time)
  }

  @Action
  public async LogOut() {
    await logout()
  }
}

export const UserModule = getModule(User)
