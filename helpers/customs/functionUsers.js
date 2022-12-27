import bcrypt from "bcrypt";
import { modelUsuario } from "../../models/index.js"
const existeCorreo = async (correo)=>{
   const existeCorreo = await modelUsuario.findOne({correo})
   if(existeCorreo){
    throw new Error("Correo ya existente")
   }
   return true
}
const verificarContrasena = (repetirContrasena, {req})=>{
    if(repetirContrasena !== req.body.contrasena){
        throw new Error("Las contrasenas no son iguales")
    }
    return true
}

const correoNoExiste = async(correo)=>{
    const usuario = await modelUsuario.findOne({correo})
    if(!usuario){
        throw new Error("Correo no existente")
    }
    return true
}

const validarContrasenaLogin = async(contrasena, {req})=>{
    const usuario = await modelUsuario.findOne(req.body.email)
    const verificar = bcrypt.compareSync(contrasena, usuario.contrasena);
    if (!verificar) {
        throw new Error("Contraseña no valida")
    }
    return true
}
export {
    existeCorreo,
    verificarContrasena,
    correoNoExiste,
    validarContrasenaLogin
}

