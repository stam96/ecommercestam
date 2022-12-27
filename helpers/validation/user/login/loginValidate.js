import { body } from "express-validator";
import { correoNoExiste, validarContrasenaLogin } from "../../../customs/functionUsers.js";

const validarLogin = [
    body("correo")
      .isEmail()
      .normalizeEmail()
      .withMessage("Correo debe ser valido"),
      //.custom(correoNoExiste),
    body("contrasena")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Debe ser minimo 8 caracteres"),
      //.custom(validarContrasenaLogin)
    //body("repetirContrasena").trim().custom(verificarContrasena),
  ];

  export {
    validarLogin
  }
  