import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    nombre: {
      type: String,
    },
    correo: {
      type: String,
      require: true,
      unique: true,
    },
    contrasena: {
      type: String,
    },
    repetirContrasena: {
      type: String,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
      default:null
    },
    rol: {
      type: String,
      enum: ["usuario", "administrador"],
      default: "usuario",
    },
    cuentaConfirmada: {
      type: Boolean,
      default: false,
    },
    tokenEmail: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const {
    contrasena,
    repetirContrasena,
    createdAt,
    updatedAt,
    tokenEmail,
    _id,
    ...usuario
  } = this.toObject();
  usuario.id = _id;
  return usuario;
};

const modelUsuario = model("Usuario", userSchema);
export { modelUsuario };
