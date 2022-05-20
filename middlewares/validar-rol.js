const { response } = require("express");

const rolValidator = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }

  const { rol, name } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      console.log(roles, req.usuario.rol);
      return res.status(401).json({
        msg: `el servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  rolValidator,
  tieneRole,
};
