import {  Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';

const LoginUser = () => {
    sessionStorage.removeItem('token')
    const urlPostUser ="http://localhost:3100/api/v1/auth/login";

    const [formUser, setFormUser] = useState({email:'',current_password:''});
    const [submitUser, setsubmitUser] = useState(false);
    const [MessageError, setMessageError] = useState('')
    const [isError, setIsError] = useState(false);
    
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: '#FFF',
      color:"#000",
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  useEffect(() => {

    }, []); 






    const verifyUser = (e)=>{
      setsubmitUser(true)
      e.preventDefault();
        fetch(urlPostUser, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formUser),
        })
          .then(response => {
            // Si el código de estado es 2xx (éxito), continúa con el proceso de respuesta
            return response.json();
          })
          .then((data) => {
            if(data.message!='OK'){
                setMessageError(data.message)
                setIsError(true)
                return
            }else{
                window.location.href= 'http://localhost:3000/dashboard'
            }
            localStorage.setItem('token', data.access )

            /* indow.location.href = 'http://localhost:3000/dashboard'; */
  
          })
          .catch((error) => {
            console.error('Error al crear el post:', error);

          });
      
      


    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormUser({
        ...formUser,
        [name]: value,
      });
    };

  return (
    <>
{isError?<Stack sx={{ width: '100%' }} spacing={2}>
    <Alert variant="filled" severity="error">
    {MessageError}</Alert>
  </Stack>: ''}
    
    <Box sx={style}>
    <h2 id="modal-title" style={{marginBottom:"40px"}}>Login</h2>
    <form>
      <div>

      <div>
      <Grid container spacing={2}>
      <Grid item xs={6} style={{ marginTop: 'auto' }}>
<TextField type='text'  label="Correo" variant="outlined" value={formUser.email} name='email' onChange={handleInputChange} />
</Grid>
<Grid item xs={6}>
<TextField type='password'  label="Contraseña" variant="outlined" value={formUser.current_password} name='current_password' onChange={handleInputChange} />

</Grid>

</Grid>
    
        </div>


      </div>
    
      <div style={{ marginTop: '25px' , marginLeft:"150px"}}>
        <Button  type='submit' variant="contained" color="primary" onClick={verifyUser}>
          Entrar
        </Button>
      </div>
    </form>
  </Box>
  </>
  )
}

export default LoginUser