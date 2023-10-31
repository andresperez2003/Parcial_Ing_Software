import {  Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';

const CreateClient = () => {
    const urlPostUser ="http://localhost:3100/api/v1/auth/sigin";

    const [formUser, setFormUser] = useState({firstname: '', lastname: '', email:'',current_password:'',phone:''});
    const [checked, setChecked] = useState(false);
    const [submitUser, setsubmitUser] = useState(false);
    const [confirmPassword, setconfirmPassword] = useState('');
    
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

    const handleCheckboxChange = (event) => {
      setChecked(event.target.checked);
    };



  const handleChangeConfirmPassword = (event) => {
    setconfirmPassword(event.target.value);
  };


    const createUser = (e)=>{
      setsubmitUser(true)
      e.preventDefault();
      if(formUser.current_password !==confirmPassword ){
        return
      }else{
        fetch(urlPostUser, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formUser),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Post creado:', data);
  
          })
          .catch((error) => {
            console.error('Error al crear el post:', error);
          });
      }
      


    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormUser({
        ...formUser,
        [name]: value,
      });
      console.log(formUser)
    };

  return (
    <>
    {((formUser.current_password !== confirmPassword) && submitUser)?<Stack sx={{ width: '100%' }} spacing={2}>
    <Alert variant="filled" severity="error">
  Las contraseñas no coinciden</Alert>
  </Stack>:'' }
    
    <Box sx={style}>
    <h2 id="modal-title">Registro</h2>
    <form>
      <div>

      <div>
      <Grid container spacing={2}>
      <Grid item xs={6} style={{ marginTop: 'auto' }}>
<TextField type='text'  label="Nombre" variant="outlined" value={formUser.firstname} name='firstname' onChange={handleInputChange} />
</Grid>
<Grid item xs={6}>
<TextField type='text'  label="Apellido" variant="outlined" value={formUser.lastname} name='lastname' onChange={handleInputChange} />

</Grid>

<Grid item xs={7}>
<TextField type='text'  label="Correo" variant="outlined" value={formUser.email} name='email' onChange={handleInputChange} />

</Grid>
<Grid item xs={5}>
<TextField type='text'  label="Telefono" variant="outlined" value={formUser.phone} name='phone' onChange={handleInputChange} />

</Grid>

<Grid item xs={6} style={{ marginTop: 'auto' }}>
<TextField type='password'  label="Contraseña" variant="outlined" value={formUser.current_password} name='current_password' onChange={handleInputChange} />
</Grid>
<Grid item xs={6}>
<TextField type='password'  label="Confirmar contraseña" variant="outlined"  value={confirmPassword} 
        onChange={handleChangeConfirmPassword}   name='confirm_password'  />

</Grid>

</Grid>
    
        </div>
        <Grid container spacing={2}>

<Grid item xs={12} style={{ marginTop: '20px', marginLeft:'80px', marginBottom:"10px" }}>
<FormGroup>
<FormControlLabel control={<Checkbox  name='disponible'  checked={checked} onChange={handleCheckboxChange} /> } label="Autorizo tratamiento de datos" />

</FormGroup>

</Grid>
</Grid>

      </div>
    
      <div style={{ marginTop: '20px' }}>
        <Button  type='submit' variant="contained" color="primary" onClick={createUser}>
          Registrarme
        </Button>
        <Button style={{marginLeft:"130px"}}   variant="contained" color="error">
          Cancelar
        </Button>
      </div>
    </form>
  </Box>
  </>
  )
}

export default CreateClient