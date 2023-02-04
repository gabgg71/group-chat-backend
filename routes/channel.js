const {Router} = require('express');
const { check } = require("express-validator");
const { crearCanal, eliminarCanal, dvChannels, agregarCanal, agregarMsg} = require('../controllers/channel');
const { validarCampos } = require('../middlewares/validarCampos');
const router = Router();

router.get("/", dvChannels);

router.post("/create", [
    check('name', 'The channel must have a name').isLength({ min: 2 }),
    validarCampos
],crearCanal);

router.post("/msg", [
    check('channel_id', 'The channel id is not present'),
    check('msg', 'The message is not present'),
    validarCampos
],agregarMsg);

router.put("/add", [
    check('channel', 'The channel must be present'),
    check('user', 'The user must be present'),
    validarCampos
],agregarCanal);

router.delete("/delete", eliminarCanal);






module.exports = router; 