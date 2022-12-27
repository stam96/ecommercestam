import { body, param } from "express-validator";
import { verificarContrasena } from "../../../customs/functionUsers.js";

const validarParaActualizarCorreo = [
  param("id","Debe ser un IdMongo valido").isMongoId().not().isEmpty().trim().escape(),
  body("contrasena")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Debe ser minimo 8 caracteres"),
  body("repetirContrasena").trim().custom(verificarContrasena),
];

export { validarParaActualizarCorreo };
