import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login'
import Diary from './components/component/Diary'
import Write from './components/component/Write'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

function App(props) {
  const { authService, repositoryService } = props;

  return (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login authService={authService} />} />
            <Route path="/diary" element={
            <PrivateRoute>
              <Diary repositoryService={repositoryService} />
            </PrivateRoute>
            } />
            <Route path="/write" element={<Write />} />

          </Routes>
        </>
  );
}

export default App;
