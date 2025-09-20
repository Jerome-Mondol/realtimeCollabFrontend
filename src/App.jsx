import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VideoConferenceJoining from './pages/VideoConferenceJoining';

import { SocketProvider } from './providers/Socket';
import { PeerProvider } from './providers/Peer';
import Room from './pages/Room';


const App = () => {

  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data)
    }
  }, [])

  return (
    <div>
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path={'/'} element={<Login />} />
            <Route path={'/signup'} element={<SignUp />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/dashboard'} element={<Dashboard token={token} />} />
            <Route path={'/joinconference'} element={<VideoConferenceJoining />} />
            <Route path={'/room/:roomId'} element={<Room />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>

    </div>
  )
}

export default App
