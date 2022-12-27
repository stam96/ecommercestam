import { body } from "express-validator";
import { existeCorreo, verificarContrasena } from "../../../customs/functionUsers.js";

const validarRegistro = [
    body("nombre")
      .exists()
      .trim()
      .not()
      .isEmpty()
      .isString()
      .withMessage("Solo texto"),
    body("correo")
      .isEmail()
      .normalizeEmail()
      .withMessage("Correo debe ser valido")
      .custom(existeCorreo),
    body("contrasena")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Debe ser minimo 8 caracteres"),
    body("repetirContrasena").trim().custom(verificarContrasena),
  ];

  export {
    validarRegistro
  }
  
