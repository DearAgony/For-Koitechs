
import { makeAutoObservable } from 'mobx'
import { api } from '../../config/api'
import { prepareLanguages } from '../../utils/utils';
import { User } from './resume-types';

class ResumeStore {
  private _user!: User
  private _languages: Record<string, number> = {}
  private _loading: boolean = false
  private _error: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  get user(): User {
    return this._user
  }

  get loading(): boolean {
    return this._loading
  }

  get languages(): Record<string, number> {
    return this._languages
  }

  get error(): boolean {
    return this._error
  }

  private setUserData = (data: User): void => {
    this._user = data
  }

  private setLoading = (loading: boolean) => {
    this._loading = loading
  }

  private setError = (): void => {
    this._error = false
  }

  private setLanguages = (data: Record<string, number>): void => {
    this._languages = data
  }

  fetchUser = async (username: string): Promise<void> => {
    try {
      const res: { data: any }= await api.request('GET /users/{username}', {
        username: username,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      this.setUserData(res.data)
    } catch {
      this.setError()
    }
  }

  fetchUserRepos = async(username: string): Promise<void> => {
    try {
      this.setLoading(true)
      const res: { data: any }= await api.request('GET /users/{username}/repos', {
        username: username,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
      this.setLanguages(prepareLanguages(res.data))
    } catch {
      this.setError()
    } finally {
      this.setLoading(false)
    }
  }
}

export const resumeStore = new ResumeStore()