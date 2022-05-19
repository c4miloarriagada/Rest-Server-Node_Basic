const Role = require('../models/role');
const User = require('../models/usuario')



const esRolValido = async(rol = '') => {  //checkeo personalizao evalua el rol, asigna rol en vacio para que choque con la validacion de abajo
    const existeRol = await Role.findOne({rol}); //busca si el rol cohincide con el rol que llego por parametro, si existe pasa
    if(!existeRol){// si no existe se lanza un error valida contra la BD
        throw new Error(`El rol ${rol} no esta registrado en la BD`) //chequea el rol desde el models role 
    }
}

const emailExiste  =  async(mail = '')=>{ 

    const mailValid = await User.findOne({mail});
    if(mailValid){
    throw new Error(`El email: ${mail}, que ingresaste ya existe`)
    }
}

const existeUsuarioID  =  async(id = '')=>{ 

    const existeUser = await User.findById(id);
    if(!existeUser){
    throw new Error(`El id: ${id}, no existe`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioID
}






