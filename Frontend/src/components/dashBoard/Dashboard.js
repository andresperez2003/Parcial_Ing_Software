import React from 'react'
import './Dashboard.scss'


const Dashboard = () => {
    if(!sessionStorage.getItem('token')){
        console.log("Entra")
    }
    const token = localStorage.getItem('token');
    console.log(token);
  return (
    <div className='Dashboard'>
        <h1>Bienvenido</h1>
        <p>Asdrubal Andres Perez Ascanio</p>
    </div>
  )
}

export default Dashboard