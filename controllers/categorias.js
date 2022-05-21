const { response } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };

  const [total, categorias] = await Promise.all([
    //promesas en arreglo se desestructuran los nombres de constantes
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "name")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
};

const obtenerCategoriaId = async (req, res = response) => {
  const { id } = req.params;

  const categoriaId = await Categoria.findById(id).populate("usuario", "name");

  res.json(categoriaId);
};

const categoriaPut = async (req, res = response) => {
  const { id } = req.params;
  const { state, usuario, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

  res.json(categoria);
};

const crearCategoria = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoriaDb = await Categoria.findOne({ name });

  if (categoriaDb) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDb.name}, ya existe`,
    });
  }

  //generar data

  const data = {
    name,
    usuario: req.usuario._id,
  };
  const categoria = new Categoria(data);

  await categoria.save();

  res.status(201).json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const deleteCategorie = await Categoria.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json(deleteCategorie);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaId,
  categoriaPut,
  borrarCategoria,
};
