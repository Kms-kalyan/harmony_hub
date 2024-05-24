import React from 'react';
import Account from './components/Account';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Playlists from "./components/Playlists";
import Playlist from "./components/Playlist";
import Sessions from "./components/Sessions";
import AllSessions from "./components/AllSessions";
import SessionDetails from './components/SessionDetails';
import SignUpLogin from './components/SignUpLogin';
import CollabRoom from './components/CollabRoom';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import './App.css';


function App() {
  return (
    <div className="App">
    
    <BrowserRouter>
      <Routes>
        <Route path="/Account" element={<Account/>}/>
        <Route path="/Home" element={<Home />} />
        <Route path="/Playlists" element={<Playlists/>}/>
        <Route path="/Playlists/:id" element={<Playlist/>}/>
        <Route path = "/Sessions" element={<Sessions/>}/>
        <Route path = "/Sessions/all" element={<AllSessions/>} />
        <Route path = "/Sessions/:sessionId" element={<CollabRoom/>} />
        <Route path="/" element={<SignUpLogin/>} />
        <Route path="/login" element={<SignUpLogin/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
    </BrowserRouter>
    
      
    </div>
  );
}

export default App;
