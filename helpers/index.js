const dbValidator = require('./db-validators');
const jwtGenerator = require('./jwt-generator');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');





module.exports ={
    ...dbValidator, 
    ...jwtGenerator,
    ...googleVerify,
    ...subirArchivo,
}