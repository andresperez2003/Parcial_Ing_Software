
import React from 'react'
import CreateClient from './components/users/register/CreateClient'
import './index.scss'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import { Navbar } from './components/users/navbar/Navbar';
import LoginUser from './components/users/login/LoginUser';
import Dashboard from './components/dashBoard/Dashboard';
import './index.scss'

const App = () => {
 // Obtén el token de sesión almacenado localmente
  return (
      <div>
       <Routes>
        <Route path='/' element={<Navbar/>} >
            <Route path='/register' element={<CreateClient/>} /> 
            <Route path='/login' element={<LoginUser/>}/> 
            <Route path='/dashboard' element={<Dashboard />}/>
        </Route>
        </Routes> 
      </div>
   
          

      
  
  
  )
}

export default App