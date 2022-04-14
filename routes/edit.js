const {Router} = require('express');
const {check} = require('express-validator');
const { edit } = require('../controllers/edit');
const { validarCampos } = require('../middlewares/validarCampos');
const upload = require("../middlewares/upload");
const router = Router();


router.put("/", edit);


router.post("/photo",upload, (req, res)=>{
    res.json({
    msg: 'Lo hice'
});});

module.exports =router;







/*
no dejar cambiar info sin pass
[
    check('name','name cant be empty').notEmpty(),
    check('email','name cant be empty').notEmpty().isEmail(),
    check('password','name cant be empty').notEmpty().isLength({min:6}), 
    validarCampos
]*/ 