import { Router } from "express";
import { crearRegistro, tokenRestablecerContrasena, verificarCorreoUsuario,actualizarContrasena } from "../controllers/index.js";
import { validarParaActualizarCorreo, verificarToken } from "../helpers/validation/index.js";
import { validarRegistro } from "../helpers/validation/user/register/registerValidate.js";
import { tokenRestablecer } from "../helpers/validation/user/register/verificarCuenta.js";
import { validationResultExpress } from "../middlewares/expressValidate/errorValidate.js";
const router = Router(); 

/**
 * @swagger
 *  /api/v1/register/:
 *   post:
 *      tags: [tb_registro]
 *      summary: Registrar Nuevo Usuario
 *      description: Crear un nuevo usuario
 *      requestBody:
 *         content:
 *          application/json:
 *                      schema:
 *                         $ref: "#components/schemas/tb_registro" 
 *                         required: true  
 *      responses:
 *          "200":
 *              description: Usuario creado correctamente
 *          "400":
 *              description: Usuario ya existente
 *          "500":
 *              description: Error interno del servidor.
 *
 */
router.post("/register", validarRegistro, validationResultExpress, crearRegistro);

/**
 * @swagger
 *  /api/v1/verificar/{token}:
 *   post:
 *      summary: Ingreso del token para verificar cuenta
 *      tags: [tb_registro]
 *      description: Ingreso token 
 *      parameters:
 *          - in: path
 *            name: token
 *            description: Ingreso del token enviado al correo para verificar cuenta
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *        "200":
 *              description: Cuenta verificada correctamente.
 *
 *        "404":
 *              description: Falta verificar cuenta verifique su correo e ingrese el codigo.
 *        "500":
 *              description: Error interno del servidor.
 *
 */
router.post("/verificar/:token", verificarToken, validationResultExpress, verificarCorreoUsuario);

/**
 * @swagger
 *  /api/v1/token-restablecer/:
 *   post:
 *      tags: [tb_registro]
 *      summary: Ingresar correo valido para generar token
 *      description: Ingresar correo para generar token y recuperar contraseña
 *      requestBody:
 *         content:
 *          application/json:
 *                      schema:
 *                         $ref: "#components/schemas/tb_restablecerToken" 
 *                         required: true  
 *      responses:
 *          "200":
 *              description: Correo Enviado nuevo token generado
 *          "400":
 *              description: Correo no valido
 *          "500":
 *              description: Error interno del servidor.
 *
 */
router.post("/token-restablecer", tokenRestablecer, validationResultExpress, tokenRestablecerContrasena);

/**
 * @swagger
 *  /api/v1/actualizar-contrasena/{id}:
 *   put:
 *      summary: Actualizar contraseña usando el id
 *      tags: [tb_registro]
 *      description: Actualizar contraseña por id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Ingreso del id usuario para actualizar contraseña
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *        content:
 *            application/json:
 *                        schema:
 *                           $ref: "#components/schemas/tb_actualizar" 
 * 
 *      responses:
 *        "200":
 *              description: Producto actualizado correctamente.
 *
 *        "400":
 *              description: Debe un IdMongo valido.
 *
 *        "500":
 *              description: Error interno del servidor.
 *
 */
router.put("/actualizar-contrasena/:id",validarParaActualizarCorreo, validationResultExpress, actualizarContrasena)
export {
    router
}