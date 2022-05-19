const {response} = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/usuario');
const usuario = require('../models/usuario');



const usuariosGET = async(req, res=response)=> {


   
    const { limite = 5, desde = 0 } =req.query
    const query = {state: true}

    //PODRIAMOS VALIDAR QUE SEA UN NUMERO ANTES DE ENVIARLO A LAS FUNCIONES
       
    // const usuarios = await User.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await User.count(query)

    const [total, usuarios] = await Promise.all([ //promesas en arreglo se desestructuran los nombres de constantes
      User.countDocuments(query),
      User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({ 
      total, 
      usuarios
    })
  }

const usuariosPost =  async(req, res)=> {
   
    const {name, mail, password, rol} = req.body; // const {google, ...resto} = req.body 
    const usuario = new User({name, mail, password, rol}) // const usuario = new User(resto)

  //encriptar la contraseña
   const salt = bcryptjs.genSaltSync(); //cuantas vueltas quires que encripte por default es 10 <-- es bueno
   usuario.password = bcryptjs.hashSync(password, salt) //asigno el pasword con el numero de vueltas que recibio del genSaltSync
  
  
   //guardar en bd
    await usuario.save();

    res.status(201).json(usuario)
  }

const usuariosPut =   async(req, res = response)=> {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if( password ){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt); 
    }

    const usuario = await User.findByIdAndUpdate(id, resto);

    res.status(200).json({
        usuario
    })
}

const usuariosPatch = (req, res)=> {
    res.status(201).json({
        
        msg: 'patch API - controlador'
    })
  }


const usuariosDelete=   async(req, res)=> {

  const {id} = req.params

  //borrar fisicamente
  //const usuario = await User.findByIdAndDelete(id);
  const usuario = await User.findByIdAndUpdate(id, {state: false});

    res.json(usuario)
  }

  module.exports={
    usuariosGET,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
  }