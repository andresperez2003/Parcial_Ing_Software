const authController = require("../controllers/auth");

const express = require("express");
const router = express.Router();

//Sigin, Login  -> se usa el metodo Post

router.post('/sigin', authController.sigin);
router.post('/login', authController.login);
router.get('/:id', authController.getMe);


module.exports = router;