const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtentenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");
const {
  existeCategoriaId,
  existeProductoId,
} = require("../helpers/db-validators");
const {
  validatorJWT,
  validarCampos,
  rolValidator,
} = require("../middlewares/");

const router = Router();

router.get("/", obtentenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un id de producto valido").isMongoId(),
    check("id").custom(existeProductoId),
    validarCampos,
  ],
  obtenerProducto
);

router.post(
  "/",
  [
    validatorJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id Valido").isMongoId(),
    check("categoria").custom(existeCategoriaId),
    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [
    validatorJWT,
    check("id").isMongoId(),
    check("id").custom(existeProductoId),
    validarCampos,
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validatorJWT,
    rolValidator,
    check("id", "No es un id de categoria valido").isMongoId(),
    check("id").custom(existeProductoId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
