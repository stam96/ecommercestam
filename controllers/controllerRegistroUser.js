import { request, response } from "express";
import { v4 as uuidv4 } from "uuid";
import { modelUsuario } from "../models/index.js";
import { hashsContrasenas } from "../helpers/hash/functionHash.js";
import { sendMail } from "../helpers/mail/emailSendgrid.js";

const crearRegistro = async (req = request, res = response) => {
  try {
    const { nombre, correo, contrasena, repetirContrasena} =
      req.body;
    const {hashContrasena, repetirhashContrasena} = await hashsContrasenas(contrasena, repetirContrasena);    
    const usuario = new modelUsuario({
      nombre,
      contrasena:hashContrasena,
      repetirContrasena:repetirhashContrasena,
      correo,
      tokenEmail:uuidv4(),
    });
    await usuario.save();
    await sendMail(usuario)
    return res.status(201).json({
      msg: "Usuario creado correctamente",
      usuario,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error interno del servidor.", error: error.message });
  }
};

const verificarCorreoUsuario = async (req = request, res = response) => {
  try {
    const { token } = req.params;
    const data = await modelUsuario.findOne({ tokenEmail: token });
    if (!data) {
      return res.status(404).json({
        msg: "Ingrese el token valido para verificar su cuenta",
      });
    }
    data.tokenEmail = null;
    data.cuentaConfirmada = true;
    await data.save();
    return res.status(200).json({
      msg: "Cuenta verificada correctamente.",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const tokenRestablecerContrasena = async (req = request, res = response) => {
  try {
    const { correo } = req.body;
    const data = await modelUsuario.findOne({ correo });
    if (!data) {
      return res.status(404).json({
        msg: "Correo no encontrado",
      });
    }
    //Generar Token
    data.cuentaConfirmada = false;
    data.tokenEmail = uuidv4();
    await data.save();
    sendMail(data);
    return res.status(200).json({
      msg: "Correo Enviado nuevo token generado",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};


const actualizarContrasena = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { contrasena, repetirContrasena } = req.body;
    const buscarUsuario = await modelUsuario.findById(id);
    if (!buscarUsuario) {
      return res.status(404).json({
        msg: "Id no valido revisar correo e ingrese nuevamente el id ",
      });
    }
    if (!buscarUsuario.cuentaConfirmada) {
      return res.status(200).json({
        msg: "Debe verificar antes de actualizar correo ",
      });
    }
    //Hash Actualizar contraseña
    const {hashContrasena, repetirhashContrasena} = await hashsContrasenas(contrasena, repetirContrasena);   

    //Objeto edicion contraseña
    const data = {
      contrasena: hashContrasena,
      repetirContrasena: repetirhashContrasena,
    };

    const usuario = await modelUsuario.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.status(200).json({
      msg: "Clave actualizada Correctamente",
      usuario,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};


export {crearRegistro, verificarCorreoUsuario, tokenRestablecerContrasena, actualizarContrasena };
