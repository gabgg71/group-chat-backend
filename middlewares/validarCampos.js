const {response} = require('express');
const {validationResult} = require('express-validator');

const validarCampos =(req, res= response, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.mapped(),
        msg: errors.errors[0].msg
      });
    }
    next(); 
}

module.exports = {validarCampos}; 