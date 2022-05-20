const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  mail: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  //debe ser funcion normal por que se usa el objeto this. MODIFICA EL MODELO. sobreescribe el metodo TO JSON
  const { __v, password, _id, ...user } = this.toObject(); //estoy sacando la version y el password  todo lo demas sera almacenado en usuario
  user.uid = _id; //modifica el id por uid (solo es visual)
  return user;
};

module.exports = model("User", UserSchema);
