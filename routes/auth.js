const {Router} = require('express');
const { check } = require("express-validator");
const { crearUsuario, loguearUsuario ,dameUrl, confirmaExistencia, confirmaExistenciaGit} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();



router.post("/new", [
    check('email', 'Email can not be empty').isEmail(),
    check('password', 'Password can not be empty or have a lenght inferior to 6').not().isEmpty().isLength({ min: 6 }),
    validarCampos
],crearUsuario);

router.get("/url-google", dameUrl);

router.post("/google-confirm", confirmaExistencia);

router.get('/github/callback', confirmaExistenciaGit)



router.post("/", [
    check('email', 'Email can not be empty').isEmail(),
    check('password', 'Password can not be empty or have a lenght inferior to 6').not().isEmpty().isLength({ min: 6 }),
    validarCampos
], loguearUsuario);





module.exports = router; 