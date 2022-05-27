const { response } = require("express");
const { Producto } = require("../models");

const obtentenerProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };

 
  const [total, productos] = await Promise.all([
    //promesas en arreglo se desestructuran los nombres de constantes
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "name")
      .populate("categoria", "name")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    productos,
  });
};

const obtenerProducto = async (req, res = response) => {
  const { id } = req.params;

  const productoId = await Producto.findById(id)
    .populate("usuario", "name")
    .populate("categoria", "name");

  res.json(productoId);
};

const actualizarProducto = async (req, res = response) => {
  const { id } = req.params;
  const { state, usuario, ...data } = req.body;
  

  if(data.name){
      data.name = data.name.toUpperCase()

  }
  data.usuario = req.usuario._id

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

const crearProducto = async (req, res = response) => {
  const { state, usuario, ...body } = req.body;
  const name = body.name.toUpperCase();
  const productoDb = await Producto.findOne({ name });
  
  
  if (productoDb) {
    return res.status(400).json({
      msg: `El producto: ${productoDb.name} ya existe`,
    });
  }

  const data = {
    ...body,
    name,
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  await producto.save();

  res.status(201).json(producto);
};

const borrarProducto = async (req, res = response) => {
  const { id } = req.params;

  const deleteProduct = await Producto.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json(deleteProduct);
};

module.exports = {
  crearProducto,
  obtentenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
