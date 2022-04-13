const {Router, response} = require('express');
const { check } = require("express-validator");
const { crearUsuario, loguearUsuario ,dameUrl, confirmaExistencia} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();


router.post("/new", [
    check('email', 'Email can not be empty').isEmail(),
    check('password', 'Password can not be empty or have a lenght inferior to 6').not().isEmpty().isLength({ min: 6 }),
    validarCampos
],crearUsuario);

router.get("/url-google", dameUrl);

router.post("/google-confirm2", confirmaExistencia);

router.get("/", [
    check('email', 'Email can not be empty').isEmail(),
    check('password', 'Password can not be empty or have a lenght inferior to 6').not().isEmpty().isLength({ min: 6 }),
    validarCampos
], loguearUsuario);





module.exports = router; 