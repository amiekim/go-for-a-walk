import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login'
import Diary from './components/component/Diary'
import Write from './components/component/Write'
import Header from './components/Header';

function App(props) {
  const { authService } = props;

  return (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login authService={authService} />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/write" element={<Write />} />
            <Route path="/layout/header" element={<Header authService={authService} />} />
          </Routes>
        </>
  );
}

export default App;
