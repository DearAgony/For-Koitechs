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

export interface Rep {
  name: string,
  updated_at: number,
  html_url: string
}