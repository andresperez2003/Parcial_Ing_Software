const userModel = require('../models/user')


const createUser = async (req, res) => {    
    try {
        const userData = req.body
        const newUser = new userModel({...userData})
        console.log(newUser)
        await newUser.save();
        res.status(201).json(newUser)


    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}

const getAllUsers = async(req,res)=>{
    try {
    const allUsers = await userModel.find();
    res.status(200).json(allUsers)
    
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


const getUserById = async(req,res)=>{
    try {
        const {id} = req.params;
        const response = await userModel.findById(id);
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


const updateUserById = async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id)
        console.log(req.params.id)

        const userDataEdit = req.body;
        const response = await userModel.findByIdAndUpdate(id,userDataEdit)
        res.status(200).json(response)
        console.log(userDataEdit)

    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}

const deleteUserById = async(req,res)=>{
    try {
        const {id} = req.params;
        const response = await userModel.findByIdAndDelete(id);
        if (response){
            res.status(200).json({message:"Usuario eliminado exitosamente!"})
        }else{
            res.status(400).json({message:"Usuario repetido"})

        }


    } catch (error) {
        res.status(404).json({message:error.message})
        
    }
}

module.exports ={
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
