const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validatorJWT = async (req, res = Response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No existe token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no existe",
      });
    }

    //verificamos si esta activo el usuario

    if (!usuario.state) {
      return res.status(401).json({
        msg: "Token No Valido",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "token no es valido",
    });
  }
};

module.exports = {
  validatorJWT,
};
