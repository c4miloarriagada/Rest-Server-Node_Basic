const validator = require("../middlewares/validator");
const validarJWT = require("../middlewares/validar-jwt");
const validarRol= require("../middlewares/validar-rol");
const validarArchivo=require('../middlewares/validar-archivo')

module.exports ={
    ...validator,
    ...validarJWT,
    ...validarRol,
    ...validarArchivo
}