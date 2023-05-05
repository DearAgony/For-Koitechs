import { Button, TextField } from "@mui/material"
import React, { FC, SyntheticEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { resumeStore } from "../../stores/user-store/resume-store"
import "./home.styles.scss"

export const Home: FC = () => {
  const navigate = useNavigate()
  const [formInput, setFormInput] = useState("")
  useEffect(() => {
    //userStore.fetchUser()
  }, [])
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormInput(name)
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    resumeStore.fetchUser(formInput)
    navigate(`/${formInput}`)
  }
  return <div className="container">
    <div className="content">
      <header className="header"><h1>MY GITHUB RÉSUMÉ</h1></header>
      <main className="main">
        <div className="main__info">
          <p>As a software startup owner I really enjoy when people send us their résumés and they include their github account so we can see tangible work they have done.</p>
          <p>After a tweet by John Resig I imagined that it may be nice for people to be able to generate their GitHub résumés.</p>
        </div>
        <div className="main__controls">
          <form className="main__controls--form" onSubmit={handleSubmit}>
            <TextField
              id="margin-normal"
              placeholder="Enter your GitHub username and click on generate"
              size="small"
              onChange={handleInput}
              fullWidth
              required
            />
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="primary">
              Generate
            </Button>
          </form>
        </div>
        <div className="main__interests">
          <h2>Notes, Information and Future features</h2>
          <p>This is the first version. I am planning on adding things as such as your most committed forks, most committed repositories and make the "My Popular Repositories" be built from your complete list of repositories. Feel free to fork the page if you want to help :-)</p>
        </div>
      </main>
      <footer className="footer">Brought to you by the brilliant mind of @davidcoallier &lt;/modesty&gt; — Résumé Template from Things That Are Brown</footer>
    </div>
  </div>
}
