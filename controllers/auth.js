const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { jwtGenerator } = require("../helpers/jwt-generator");
const Usuario = require('../models/usuario');

const login = async(req, res = response)=>{

    const {mail, password} = req.body;

    try {
        //verificar si existe el correo
        const usuario = await Usuario.findOne({mail})
        if(!usuario){
            return res.status(400).send({
                msg: 'Usuario / Password no son correctos '
            });
        }
        //checkeo si el status del usuario esta en true, si no , rechaza la solicitud

        if(!usuario.state){
            return res.status(400).send({
                msg: 'Usuario / Password no son correctos '
            });
        }

        //checkeo de contraseña es valida

        const valiPassword = bcryptjs.compareSync(password, usuario.password)
        if(!valiPassword){
            return res.status(400).send({
                msg: 'Usuario / Password no son correctos password'
            })
        }
        //Generar JWT
        
        const token = await jwtGenerator(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hablar con el admin'
        });
    }

  
}


module.exports = {
    login
}