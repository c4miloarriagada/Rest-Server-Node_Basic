const { Categoria, Role, User, Producto } = require("../models");

const esRolValido = async (rol = "") => {
  //checkeo personalizao evalua el rol, asigna rol en vacio para que choque con la validacion de abajo
  const existeRol = await Role.findOne({ rol }); //busca si el rol cohincide con el rol que llego por parametro, si existe pasa
  if (!existeRol) {
    // si no existe se lanza un error valida contra la BD
    throw new Error(`El rol ${rol} no esta registrado en la BD`); //chequea el rol desde el models role
  }
};

const emailExiste = async (mail = "") => {
  const mailValid = await User.findOne({ mail });
  if (mailValid) {
    throw new Error(`El email: ${mail}, que ingresaste ya existe`);
  }
};

const existeUsuarioID = async (id = "") => {
  const existeUser = await User.findById(id);
  if (!existeUser) {
    throw new Error(`El id: ${id}, no existe`);
  }
};

const existeCategoriaId = async (id = "") => {
  const existeCategoria = await Categoria.findById(id);

  if (!existeCategoria) {
    throw new Error(`La Categoria: ${id}, no existe`);
  }
};

const existeProductoId = async (id = "") => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El prodcuto : ${id}, no existe`);
  }
};

// const categoriaExisteActualizar = async (name = "", id) => {
//   name = name.toUpperCase();

//   const nombreActual = await Categoria.findOne({ id });

//   if (nombreActual.name !== name) {
//     const existeCategoria = await Categoria.findOne({ nombre });
//     if (existeCategoria) {
//       throw new Error(`La categoria ${nombre} ya existe`);
//     }
//   }
// };

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioID,
  existeCategoriaId,
  existeProductoId,
};
