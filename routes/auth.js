const { Router } = require("express");
const { login, googleSignIn } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validator");

const router = Router();

router.post("/login", [
    check('mail', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,login);

router.post("/google", [
    check('id_token', 'ID_TOKEN es necesario').not().isEmpty(),
    validarCampos
] ,googleSignIn);


module.exports = router;