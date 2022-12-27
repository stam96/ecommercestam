import bcrypt from "bcrypt";
import { modelUsuario } from "../../models/index.js";

const hashsContrasenas = async (contrasena = "", repetirContrasena = "") => {
  const salt = bcrypt.genSaltSync();
  const [hashContrasena, repetirhashContrasena] = await Promise.all([
    bcrypt.hash(contrasena, salt),
    bcrypt.hash(repetirContrasena, salt),
  ]);
  return {
    hashContrasena,
    repetirhashContrasena
  }
};

const compareContrasena = async(correo, contrasena = "")=>{
  const usuario = await modelUsuario.findOne({ correo });
  const verificar = bcrypt.compareSync(contrasena, usuario.contrasena);
  return {
    verificar
  }
}

export { hashsContrasenas, compareContrasena };
