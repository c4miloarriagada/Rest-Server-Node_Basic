const { Router } = require("express");
const { check } = require("express-validator");
// const { validarCampos } = require("../middlewares/validator");
// const { validatorJWT } = require("../middlewares/validar-jwt");
// const { rolValidator, tieneRole } = require("../middlewares/validar-rol");
const {
  validarCampos,
  validatorJWT,
  rolValidator,
  tieneRole,
} = require("../middlewares");
const {
  esRolValido,
  emailExiste,
  existeUsuarioID,
} = require("../helpers/db-validators");
const {
  usuariosGET,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const router = Router();

router.get("/", usuariosGET);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioID),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("name", "Nombre es obligatorio").not().isEmpty(), //no tiene que estar vacio
    check("password", "El password debe tener mas de 6 letras").isLength({
      min: 6,
    }),
    // check('mail', 'El valor ingresado no es un correo valido').isEmail(),
    check("mail").custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("rol").custom(esRolValido), //cuando tengo una fx cuyo primer argumento es el mismo argumento que recibo en la funcion se puede Obviar
    validarCampos, //si pasa todo los checks postea ejecuta el controlador midlelwares creado de validator
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validatorJWT,
    //rolValidator, administrador validator.
    tieneRole("ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioID),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
