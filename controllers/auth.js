const { response, json } = require("express");
const bcryptjs = require("bcryptjs");
const { jwtGenerator } = require("../helpers/jwt-generator");
const { googleVerify } = require("../helpers/google-verify");
const Usuario = require("../models/usuario");

const login = async (req, res = response) => {
  const { mail, password } = req.body;

  try {
    //verificar si existe el correo
    const usuario = await Usuario.findOne({ mail });
    if (!usuario) {
      return res.status(400).send({
        msg: "Usuario / Password no son correctos ",
      });
    }
    //checkeo si el status del usuario esta en true, si no , rechaza la solicitud

    if (!usuario.state) {
      return res.status(400).send({
        msg: "Usuario / Password no son correctos ",
      });
    }

    //checkeo de contraseña es valida

    const valiPassword = bcryptjs.compareSync(password, usuario.password);
    if (!valiPassword) {
      return res.status(400).send({
        msg: "Usuario / Password no son correctos password",
      });
    }
    //Generar JWT

    const token = await jwtGenerator(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hablar con el admin",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
    
  try {
    const {name, img, mail} = await googleVerify(id_token);
   
    let usuario = await Usuario.findOne({mail});

    if(!usuario){
        const data = {
            name,
            mail,
            password: ':P',
            img,
            rol: 'USER_ROLE',
            google: true
        }
        

        usuario = new Usuario( data )
        await usuario.save();
    }
    if(!usuario.state){
        return res.status(401).json({
            msg: 'Hablar con el admin , usuario bloqueado'
        })
    }

   
    const token = await jwtGenerator(usuario.id);
  
    res.json({
      usuario,
      token
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "TOKEN no se puede verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
