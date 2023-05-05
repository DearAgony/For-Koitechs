import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/home/home.component';
import { Resume } from './components/resume/resume.component';
import { RESUME_PAGE, ROOT_PAGE } from './router/routes';
import './styles/App.scss';

export const App: React.FC = () => (
  <div className="container">
    <Router>
      <Routes>
        <Route path={ROOT_PAGE} element={<Home />}/>
        <Route path={RESUME_PAGE} element={<Resume />}/>
      </Routes>
    </Router>
  </div>
);
