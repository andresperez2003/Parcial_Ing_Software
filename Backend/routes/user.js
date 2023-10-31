const userController = require("../controllers/user");
const md_auth = require('../middlewares/authenticatedValidation');


const express = require("express");
const router = express.Router();


//Post http://localhost:3100/api/v1/users/new_user
router.post('/new-user'/* , [md_auth.ensureAuth] */  ,userController.createUser);

//Post http://localhost:3100/api/v1/users/
router.get('/', userController.getAllUsers);

//Post http://localhost:3100/api/v1/users?id=***
router.get('/:id', userController.getUserById);

//Post http://localhost:3100/api/v1/users?id=***
router.patch('/:id', userController.updateUserById);

//Post http://localhost:3100/api/v1/users?id=***
router.put('/:id', userController.updateUserById);

//Post http://localhost:3100/api/v1/users?id=***
router.delete('/:id', userController.deleteUserById);






module.exports = router
