import { body, param } from "express-validator";
import { correoNoExiste } from "../../../customs/functionUsers.js";

const verificarToken = [
    param("token", "Debe ingresar Token").not().trim().isEmpty()
]

const tokenRestablecer = [
    body("correo").isEmail()
    .normalizeEmail()
    .withMessage("Correo debe ser valido")
    .custom(correoNoExiste)
]
export {
    verificarToken,
    tokenRestablecer
}