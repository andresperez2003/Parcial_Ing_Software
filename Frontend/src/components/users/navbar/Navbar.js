import React from 'react'
import './Navbar.scss';
import { Link, Outlet } from 'react-router-dom';

export const Navbar = () => {
  return (
<>
<ul className='listaNav'>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </ul>
  <Outlet/>
</>
  )
}
