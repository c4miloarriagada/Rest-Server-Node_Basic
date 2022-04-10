const {response} = require('express')


const usuariosGET = (req, res=response)=> {


    const {q, nombre = 'no name', apikey,page= 1, limit} = req.query;

    res.json({  
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
  }

const usuariosPost =  (req, res)=> {
   
    const {nombre, edad} = req.body;

    res.status(201).json({
        
        msg: 'post API - controlador',
        nombre,
        edad
    })
  }

const usuariosPut =   (req, res = response)=> {

    const {id} = req.params

    res.status(200).json({
        msg: 'put API - controlador',
        id
    })
}

const usuariosPatch = (req, res)=> {
    res.status(201).json({
        
        msg: 'patch API - controlador'
    })
  }


const usuariosDelete=   (req, res)=> {
    res.json({
        
        msg: 'delete API - controlador'
    })
  }

  module.exports={
    usuariosGET,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
  }