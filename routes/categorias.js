const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaId,
  categoriaPut,
  borrarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaId } = require("../helpers/db-validators");
const {
  validatorJWT,
  validarCampos,
  rolValidator,
} = require("../middlewares/");

const router = Router();

router.get("/", obtenerCategorias);

router.get(
  "/:id",
  [
    check("id", "No es un id de categoria valido").isMongoId(),
    check("id").custom(existeCategoriaId),
    validarCampos,
  ],
  obtenerCategoriaId
);

router.post(
  "/",
  [
    validatorJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// actualizar / privado cualquiera con token valid
router.put(
  "/:id",
  [
    validatorJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check('id', 'Debe ser un ID valido').isMongoId(),
    check("id").custom(existeCategoriaId),
    validarCampos,
  ],
  categoriaPut
);

//borrar categoria solo si es admin
router.delete(
  "/:id",
  [
    validatorJWT,
    rolValidator,
    check("id", "No es un id de categoria valido").isMongoId(),
    check("id").custom(existeCategoriaId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
