import React, {useEffect, useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';


const App = () => {

  const [token, setToken] = useState(false);

  if(token){
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data)
    }
},[])

  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Login />}/>
        <Route path={'/signup'} element={<SignUp />}/>
        <Route path={'/login'} element={<Login />}/>
        <Route path={'/dashboard'} element={<Dashboard token={token} />}/>
      </Routes>
    </div>
  )
}

export default App
