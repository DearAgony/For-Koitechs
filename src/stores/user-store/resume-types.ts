export interface User {
  name: string,
  public_repos: number,
  created_at: string,
  followers: number,
  location: string,
  blog: string
}

export interface Repos {
  language: string
}