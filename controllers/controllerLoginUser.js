import { request, response } from "express";
import {v2 as cloudinary} from "cloudinary";
import { modelUsuario } from "../models/index.js";
import { compareContrasena } from "../helpers/hash/functionHash.js";
import { jwtSing, jwtTokenCookie } from "../helpers/jwt/functionsJwt.js";
import { datosCloud } from "../helpers/cloudinary/configcloud.js";
cloudinary.config(datosCloud)/*{ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY_CLODU, 
  api_secret: process.env.API_SECRET_CLOUD,  
  secure: true
})*/;

const loginUser = async (req = request, res = response) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await modelUsuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ msg: "Correo no encontrado" });
    }
    const { verificar } = await compareContrasena(correo, contrasena);
    if (!verificar) {
      return res.status(404).json({ msg: "Contraseña no valida" });
    }

    const { token, expiresIn } = jwtSing({ id: usuario.id });
    const {refreshToken, expireRefresh } = jwtTokenCookie(
      { id: usuario.id },
      res
    );
    return res
      .status(200)  
      .json({
        msg: "Accediendo",
        token,
        id: usuario.id,
        expiresIn,
        refreshToken,
        expireRefresh,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const rutaRefresh = (req = request, res = response) => {
  try {
    const { id } = req.data;
    const { token, expiresIn } = jwtSing({ id });
    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error interno servidor" });
  }
};

const actualizarDatos = async (req = request, res = response)=>{
try {
  const {nombre} = req.body;
  const user = await modelUsuario.findById(req.usuario.id);
  if(!user) return res.status(404).json({msg:"Usuario no encontrado"})
  //Buscar si existe Usuario;
  const data = {
    nombre
  }
  const usuario = await modelUsuario.findByIdAndUpdate(
    req.usuario.id,
    data,
    { new: true }
  );
  //console.log(usuario)
 if (usuario.img) {
    const nombreSplit = usuario.img.split("/")
    const nombre = nombreSplit.at(-1)
    const [public_id] = nombre.split(".")
    //console.log(public_id)
    cloudinary.uploader.destroy(public_id)
  }
    const {tempFilePath} =  req.files.image
    const {secure_url} =  await cloudinary.uploader.upload(tempFilePath);
    usuario.img = secure_url;
    await usuario.save()
    return res.status(200).json({msg:"Usuario actualizado correctamente.", nombre:usuario.nombre});
} catch (error) 
{
  return res
  .status(500)
  .json({ msg: "Error interno del servidor.", error: error.message });
}
}

const eliminarUsuario = async (req = request, res = response) => {
  try {
    const usuario = await modelUsuario.findByIdAndUpdate(req.usuario.id, {
      estado: false,
    });
    if (usuario.img) {
      const nombreSplit = usuario.img.split("/");
      const nombre = nombreSplit.at(-1);
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);
    }
    return res.status(200).json({
      msg: "Usuario eliminado correctamente.",
      nombre: usuario.nombre,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const logout = (req = request, res = response) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({
      msg: "saliendo..",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { loginUser, rutaRefresh, actualizarDatos, eliminarUsuario, logout };
