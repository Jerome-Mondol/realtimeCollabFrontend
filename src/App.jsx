import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VideoConferenceJoining from './pages/VideoConferenceJoining';

import { SocketProvider } from './providers/Socket';


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
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/signup'} element={<SignUp />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/dashboard'} element={<Dashboard token={token} />} />
          <Route path={'/joinconference'} element={<VideoConferenceJoining />} />
        </Routes>
      </SocketProvider>

    </div>
  )
}

export default App
