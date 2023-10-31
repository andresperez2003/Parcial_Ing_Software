import React from 'react'
import './Dashboard.scss'


const Dashboard = () => {
    const token = localStorage.getItem('token');
  return (
    <div className='Dashboard'>
        <h1>Bienvenido</h1>
        <p>Asdrubal Andres Perez Ascanio</p>
    </div>
  )
}

export default Dashboard