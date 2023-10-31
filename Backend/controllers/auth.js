

require('dotenv').config()
const nodemailer = require('nodemailer')
const userModel = require('../models/user');
const bcrypt = require('bcrypt')
const {generateToken, refreshToken} = require('../utils/jwt');
const { config } = require('dotenv');
const contraseña =  process.env.CONTRASENA
const correo = process.env.CORREO

//Crear la funcion para el registro - singIn


const sendEmail = async(id)=>{
    const config = {
        service: "gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: correo,
          pass: contraseña,
        },
    };

    const mensaje ={
        from :correo,
        to:correo,
        subject: "Correo de pruebas",
        html:`Ingresa al siguiente enlace para confirmar tu correo <a href='http://localhost:3100/api/v1/auth/activatedAccount/${id}'>Confirmacion de correo<a>`
    }
      const transport = nodemailer.createTransport(config)

      transport.sendMail(mensaje, (error, info) => {
        if (error) {
          console.log('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado:', info.response);
        }
      });

 


}


const sigin = async(req, res) =>{
    const {firstname, lastname, email, phone, current_password} = req.body;

    try {
        if(!email){
            res.status(400).jsono({message:"El email es requerido"})
            throw new Error("El email es requerido");
        }
        if(!current_password){
            res.status(400).jsono({message:"la contraseña es requerida"})
            throw new Error("la contraseña es requerida");
        }
        const emailLowerCase = email.toLowerCase();
        const salt = await bcrypt.genSalt(10);
        const current_password_hash = await bcrypt.hash(current_password,salt);

        /* 
        Formas de guardar un uaurio
        -> userModel.create
        -> new usermodel
        */
        const newUser = await userModel.create({
            firstname,
            lastname,
            phone,
            email:emailLowerCase,
            current_password: current_password_hash
        })

        const userStorage = await newUser.save();
        sendEmail(newUser._id)
        res.status(201).json({userStorage});

    
        //Siempre que se crea un objeto, la respuesta debe ser un 201
    } catch (err) {
        console.log("error")
        res.status(400).json({message:err.message})
    }
}

const login = async(req,res)=>{
    const {email, current_password} = req.body

    try {
    console.log(email, "email")
    if(!email || !current_password){
        throw new Error("El email y la contraseña son obligatorias")
    }       
    const emailLowerCase = email.toLowerCase();
    const userStore = await userModel.findOne({email:emailLowerCase}).exec();

    if(!userStore){
        throw new Error("El usuario no existe")
    }

  
    const check = await bcrypt.compare(
      current_password,
      userStore.current_password
    )

    if(!check){
        throw new Error("La contraseña no es correcta")
    }

    const token = await generateToken(userStore);
    const refresh = await refreshToken(userStore);

    
    res.status(200).json({
        access:token,
        refresh:refresh
    })
    /* res.status(200).json({token}) */
    } catch (err) {
        res.status(400).json({message:err.message})
    }
}

const getMe = async(req,res)=>{
    try {
        const {id} = req.params;
        const response = await userModel.findById(id);
        console.log(response)
        //Obtener token del usuario
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const activatedAccount = async (req,res)=>{
    try {
        const {id} = req.params;
        console.log(id)
        const userActived= await userModel.findByIdAndUpdate(id,{active:true})
        console.log(userActived)
        res.redirect('https://github.com/andresperez2003/Parcial_Ing_Software')
    } catch (error) {
        
    }
}

module.exports={
    sigin,
    login,
    getMe,
    activatedAccount
};