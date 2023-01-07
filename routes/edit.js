const {Router} = require('express');
const {check} = require('express-validator');
const { edit, validaPass } = require('../controllers/edit');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();


router.put("/", edit);
router.put("/validation", [check('email', 'Email can not be empty').isEmail(),
check('password', 'Password can not be empty or have a lenght inferior to 6').not().isEmpty().isLength({ min: 6 }),],
validaPass);



module.exports =router;

