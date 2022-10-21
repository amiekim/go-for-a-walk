import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from './components/Home';
import Login from './components/Login'
import Diary from './components/component/Diary'
import Update from './components/component/Update'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

function App(props) {
  const { authService, repositoryService, FileInput, imageUploader } = props;

  return (
        <>
          <Routes>
            <Route path="/" element={<Home repositoryService={repositoryService} />} />
            <Route path="/login" element={<Login authService={authService} />} />
            <Route path="/diary" element={
            <PrivateRoute>
              <Diary repositoryService={repositoryService} FileInput={FileInput} imageUploader={imageUploader}/>
            </PrivateRoute>
            } />
            <Route path={"/update/:diaryIndex"} element={
            <PrivateRoute>
              <Update repositoryService={repositoryService} FileInput={FileInput} imageUploader={imageUploader}/>
            </PrivateRoute>
            } />

          </Routes>
        </>
  );
}

export default App;
