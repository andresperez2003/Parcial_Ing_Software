const express = require('express')
const cors = require('cors');

//app conectar por el puerto local el express
//especificar los middleware a utilizar

/* 
Pasos en el servidor

1. Modelo
2. Controlador
3. Rutas
4. App
5. Pruebas (Postman, RestClient)
*/

const app = express()
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')


app.use(cors())




const API_VERSION = 'api/v1'


//Pruebas con extesion Rest Client
app.use(express.json())


//Pruebas desde postman
app.use(express.urlencoded({extended:true}))


app.use(`/${API_VERSION}/users`, userRoutes);
app.use(`/${API_VERSION}/auth`,authRoutes);

module.exports = app;
