const validator = require("../middlewares/validator");
const validarJWT = require("../middlewares/validar-jwt");
const validarRol= require("../middlewares/validar-rol");


module.exports ={
    ...validator,
    ...validarJWT,
    ...validarRol
}