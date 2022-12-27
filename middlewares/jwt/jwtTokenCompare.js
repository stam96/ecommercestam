import jwt from "jsonwebtoken";
import { modelUsuario } from "../../models/index.js";

const jwtVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const tokenBearer = token.split(" ").at(-1);
    if (!tokenBearer) {
      return res.status(404).json({ msg: "Token no encontrado" });
    }
    const { id } = jwt.verify(tokenBearer, process.env.SECRET_KEY_JWT);
    if (!id) {
      return res
        .status(404)
        .json({ msg: "Id no valido - Token no verificado " });
    }
    //Verificar si usuario existe
    const usuario = await modelUsuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        mensaje: "Token no valido - usuario estado false",
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const jwtBearerRefresh = (req, res, next) => {
  try {
    const tokenRefresh = req.cookies.refreshToken;
    const data = jwt.verify(tokenRefresh, process.env.SECRET_KEY_JWTREFRESH);
    if (!data) return res.status(404).json({ mensaje: "Firma no valida" });
    req.data = data;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message});
  }
};

const rolUsuario = (req, res, next) => {
  const rol = req.usuario.rol;
  if (rol === "usuario") {
    next();
  } else {
    return res.status(404).json({ msg: `Rol no valido debe ser usuario` });
  }
};

const rolAdministrador = (req, res, next) => {
  const rol = req.usuario.rol;
  if (rol === "administrador") {
    next();
  } else {
    return res.status(404).json({ msg: `Rol no valido debe ser administrador` });
  }
};

export { jwtVerify, jwtBearerRefresh, rolAdministrador, rolUsuario };
