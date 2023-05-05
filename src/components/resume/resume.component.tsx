import { Paper } from "@mui/material"
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import "./resume.styles.scss"
import { resumeStore } from "../../stores/user-store/resume-store"

export const Resume: React.FC = observer(() => {
  const { user, loading, fetchUserRepos, fetchUser, languages } = resumeStore
  const userName = window.location.pathname.split('/')
  useEffect(() => {
    if (!user) {
      fetchUser(userName[1])
    } else {
      fetchUserRepos(userName[1])
    }
  }, [user]);

  const renderLanguage = () => {
    let array: string[] = []
    Object.keys(languages).forEach(key => {
      let value = languages[key];
      array.push(`${key}: ${value}`)
    })
    return array
  }

  return <div className="container">{user ?
    <Paper>
      <header className="resume__header"><h1>{user.name}</h1></header>
      <main className="resume_main">
        <div className="resume_main--wrapper">
          <div className="first">GitHub Profile</div>
          <div>On GitHub since {user.created_at}, {user.name} is a developer based in {user.location} with {user.public_repos} public repositories and {user.followers} followers.</div>
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
        <div>Popular Repositories</div>
      </main>
    </Paper>
    : <div>User not found</div>}
  </div>
})