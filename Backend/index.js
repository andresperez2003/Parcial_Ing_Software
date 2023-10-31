const mongoose = require("mongoose")
const app = require('./app')
const {DB_HOST,DB_PASSWORD,DB_USER} = require('./config')


//Acceder a la configuracion del archivo .envc
require('dotenv').config()

//Acceder a variables del .env se tiene que hacer mediante el process.env
const port =  process.env.PORT || 3000

app.listen(port, ()=>console.log(`Conectado por el puerto ${port}`))


//Crear conexion a bd mongo
//
//mongodb+srv://andres_ascanio:h3HqVffNlTGIz2Qb@cluster0.b3e8vxv.mongodb.net/
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`)
.then(()=>console.log("Conexion a la base de datos"))
.catch((error)=> console.log("Error en la conexion a la base de datos"))


