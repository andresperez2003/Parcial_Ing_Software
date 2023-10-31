import {  Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';


const CreateClient = () => {
    const urlPostUser ="http://localhost:3100/api/v1/auth/sigin";
    sessionStorage.removeItem('token')
    const [formUser, setFormUser] = useState({firstname: '', lastname: '', email:'',current_password:'',phone:'', authorizedData:false});
    const [checked, setChecked] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [submitUser, setsubmitUser] = useState(false);
    const [confirmPassword, setconfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleChange = (event) => {
      const inputEmail = event.target.value;
      setEmail(inputEmail);
      setIsValid(validateEmail(inputEmail));
    };


  

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

    const handleOpen = ()=>{
      setOpenModal(true)
    }
    const handleClose = ()=>{
      setOpenModal(false)
    }

    const acceptTermins = ()=>{
      handleClose()
      setChecked(true)
    }

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
            window.location.href = 'http://localhost:3000/login';
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

      
<TextField type='text'  label="Correo" variant="outlined"  name='email' onChange={handleInputChange} />

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
 {checked?<FormControlLabel  control={<Checkbox  name='authorizedData'  checked={checked} onChange={handleCheckboxChange} /> } label="Autorizo tratamiento de datos"  />:<FormControlLabel  control={<Checkbox  name='authorizedData'  checked={checked} /> } label="Autorizo tratamiento de datos"   onClick={handleOpen} />} 

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

  
  <Modal
        open={openModal}
       
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          fontSize:"5px",
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          maxHeight: '60vh',
          overflow: 'auto',
        }}  >
          <p style={{fontSize:"12px"}}>
          POLÍTICA GENERAL DE TRATAMIENTO DE DATOS PERSONALES 
CLIENTES, PROSPECTOS DE CLIENTES, FUNCIONARIOS, PROVEEDORES Y VISITANTES
</p>
<p style={{fontSize:"10px"}}>
ENTRADA EN VIGENCIA: OCTUBRE DE 2023
ÚLTIMA VERSIÓN: OCTUBRE DE 2023
</p>

<p style={{fontSize:"10px"}}>
INTRODUCCIÓN
Nombre pág. S.A.S. (en adelante, Nombre pág) es responsable de los Datos Personales e información que le suministran sus clientes, prospectos de clientes proveedores, contratistas, y visitantes (en adelante, los Titulares).

En la presente Política de Tratamiento se establecen las finalidades, medidas y procedimientos de las Bases de Datos de Nombre pág así como los mecanismos con que los Titulares cuentan para conocer, actualizar, rectificar, suprimir los datos suministrados o revocar la autorización que se otorga con la aceptación de la presente Política de Tratamiento.

La aceptación de propuestas, la celebración de contratos, el diligenciamiento de formatos, el acceso a los Servicios de la página web www.nombrepág.co (en adelante la Página Web) y/o la aceptación expresa o inequívoca de las presente políticas, implica la aceptación de los Titulares de la Política de Tratamiento y Protección de Datos Personales y su autorización para los usos y otros tratamientos que aquí se describen.
</p>
<p style={{fontSize:"10px"}}>
DEFINICIONES
Para los efectos de la presente Política de Privacidad, se entiende por:
<ul>

<li>
1.1. Dato personal: Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.
</li>
<li>
1.2. Dato público: Dato personal que no es semiprivado, privado o sensible. Entre otros, son los datos relativos al estado civil de las personas, a su profesión u oficio y a su calidad de comerciante o de servidor público. Por su naturaleza, los datos públicos pueden estar contenidos, entre otros, en registros y documentos públicos.
</li>
<li>
1.3. Dato Privado: Es el dato que por su naturaleza íntima o reservada sólo es relevante para el Titular.
</li>
<li>
1.4. Dato personal sensible: Se entiende como datos sensibles aquellos que afecten la intimidad del titular o cuyo uso indebido pueda afectar la intimidad del Titular o la potencialidad de generar su discriminación.
</li>
<li>
1.5. Dato personal semiprivado: son aquellos datos que no tienen una naturaleza íntima, reservada, ni pública y cuyo conocimiento o divulgación puede interesar no solo a su titular, sino a un grupo de personas o a la sociedad en general. En este caso, para su Tratamiento se requiere a autorización expresa del Titular de la información. Por ejemplo: datos de carácter financiero, datos relativos a las relaciones con las entidades de seguridad social (EPS, AFP, ARL, Cajas de Compensación).
</li>
<li>
1.6. Base de Datos: Conjunto organizado de Datos Personales que sea objeto de Tratamiento. Para los efectos del presente documento se entiende como Base de Datos, aquella que contiene información de los Titulares.
</li>
<li>
1.7. Titular: Persona natural cuyos Datos Personales sean objeto de Tratamiento. Para los efectos del presente documento se entiende como Titulares, a los proveedores, contratistas, colaboradores, clientes, usuarios y visitantes de Nombre Pág.
</li>
<li>
1.8. Responsable del Tratamiento: Es la Persona natural o jurídica de naturaleza pública o privada, que, actuando por ella misma o con otros, decida sobre la Base de Datos y/o el Tratamiento de los datos. Para los efectos de la presente Política para el Tratamiento de Datos Personales se entiende como Responsable del Tratamiento a Nombre Pág.
</li>
<li>
1.9. Encargado del Tratamiento: Persona natural o jurídica, pública o privada, que por sí misma o en asocio con otros, realice el Tratamiento de Datos Personales por cuenta del Responsable del Tratamiento (Nombre Pág).
</li>
<li>
1.10. Tratamiento: Cualquier operación o conjunto de operaciones sobre Datos Personales, tales como la recolección, almacenamiento, uso, circulación o supresión.
</li>
</ul>
</p>
          <Button  type='submit' variant="contained" color="primary" style={{width:"50px", height:"20px", fontSize:"10px", marginLeft:"170px", marginTop:"10px"}}  onClick={acceptTermins}>
          Aceptar
        </Button>
        </Box>
      </Modal>
  </>
  )
}

export default CreateClient