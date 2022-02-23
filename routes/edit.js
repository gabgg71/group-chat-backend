const {Router} = require('express');
const {check} = require('express-validator');
const { edit } = require('../controllers/edit');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();


router.put('/', [
    check('name','name cant be empty').notEmpty(),
    check('email','name cant be empty').notEmpty().isEmail(),
    check('password','name cant be empty').notEmpty().isLength({min:6}), 
    validarCampos
], edit);

module.exports =router;