import { Paper } from "@mui/material"
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import "./resume.styles.scss"
import { resumeStore } from "../../stores/user-store/resume-store"
import { parseDate } from "../../utils/utils"

export const Resume: React.FC = observer(() => {
  const { user, fetchUserRepos, loading, fetchUser, languages, repos } = resumeStore
  const userName = window.location.pathname.split('/')

  useEffect(() => {
    fetchUser(userName[1])
  }, [])

  useEffect(() => {
    fetchUserRepos(userName[1])
  }, [user])

  const renderLanguage = () => {
    let array: string[] = []
    Object.keys(languages).forEach(key => {
      let value = languages[key];
      array.push(`${key}: ${value}`)
    })
    return array
  }

  return (<>{!loading ? <div className="container">{user ?
    <Paper sx={{ padding: '20px 0' }}>
      <header className="resume__header"><h1>{user.name}</h1></header>
      <main className="resume_main">
        <div className="resume_main--wrapper">
          <div className="first">GitHub Profile</div>
          <div>On GitHub since {parseDate(user.created_at)}, {user.name} is a developer based in {user.location} with {user.public_repos} public repositories and {user.followers} followers.</div>
        </div>
        <div className="resume_main--wrapper">
          <div className="first">Website</div>
          <div><a href={user.blog}>{user.blog}</a></div>
        </div>
        <div className="resume_main--wrapper">
          <div className="first">Languages</div>
          <div>{languages && renderLanguage().map((item, index) => {
            return <p key={index}>{`${item}%`}</p>
          })}</div>
        </div>
        <div className="resume_main--wrapper">
          <div className="first">Popular Repositories</div>
          <div>{repos.length > 0 && repos.map((item, index) => {
            return <p key={index}>{item.name} <br /><a href={item.html_url}>{item.html_url}</a></p>
          })}</div>
        </div>
      </main>
    </Paper>
    : <div className="emptyBlock">
      <p>User not found. Try to enter another username.</p>
      <p><a href="/">Back to main page</a></p>
    </div>}
  </div> : <div className="emptyBlock">
    Should be loader
  </div>}</>)
})