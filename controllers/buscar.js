const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require("../models/index");

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuario = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //true , false

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      result: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //hace que la busqueda se vuelva insesible al upper case y hace match con todo lo que se parezca
  const usuarios = await Usuario.find({
    $or: [{ name: regex }, { mail: regex }], //matchea con name y con mail
    $and: [{ state: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //true , false

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      result: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //hace que la busqueda se vuelva insesible al upper case y hace match con todo lo que se parezca
  const categorias = await Categoria.find({ name: regex, state: true });
  return res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //true , false

  if (esMongoId) {
    const producto = await Producto.findById(termino).populate('categoria', 'name');
    return res.json({
      result: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //hace que la busqueda se vuelva insesible al upper case y hace match con todo lo que se parezca
  const productos = await Producto.find({ name: regex, state: true })
                                  .populate('categoria', 'name');
  return res.json({
    results: productos,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuario(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;
    default:
      return res.status(500).json({
        msg: "Falta agregar una busqueda mas",
      });
  }
};

module.exports = {
  buscar,
};
