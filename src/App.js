import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login'
import Diary from './components/component/Diary'
import Write from './components/component/Write'

function App() {
  return (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/write" element={<Write />} />
          </Routes>
        </>
  );
}

export default App;
