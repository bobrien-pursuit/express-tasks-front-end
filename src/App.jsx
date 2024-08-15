import { useState } from 'react';
import  NavBar  from '../src/Components/NavBar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import ProtectedRoute from './Pages/ProtectedRoute';
import Tasks from './Components/Tasks';

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
     <>
     <NavBar
      user={user} 
      setUser={setUser} 
      setToken={setToken}/>
     <Routes>
      <Route 
        path="/" 
        element={<Home user={user}/>} 
        />
      <Route 
        path='/login' 
        element={
        <Login 
          setUser={setUser} 
          setToken={setToken}/>} 
          />
      <Route 
        path="/signup" 
      element={
        <Signup 
          setUser={setUser} 
          setToken={setToken}/>} 
          />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute
            element={Tasks}
            isAuthenticated={!!user && !!token}
            user={user}
            token={token}
          />
         }
      />
     </Routes>
     </>
  )
}

export default App;