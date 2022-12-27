import { Router } from "express";
import { captureOrder, crearOrden, editarOrden, ordenFinal, cancelPayment, eliminarOrden, verOrden } from "../controllers/index.js";
import { eliminarOrdenId, isIDmongoOrder, ordenIdPaypal, validateOrder } from "../helpers/validation/index.js";
import { validationResultExpress } from "../middlewares/expressValidate/errorValidate.js";
import { jwtVerify, rolUsuario } from "../middlewares/jwt/jwtTokenCompare.js";
const router = Router();

/**
 * @swagger
 *  /api/v1/order/:
 *   post:
 *      tags: [tb_order]
 *      summary: Generar una orden de producto para carrito se requiere autentificación usuario
 *      description: Añadir una nueva orden para el carrito
 *      requestBody:
 *         content:
 *          application/json:
 *                      schema:
 *                         $ref: "#components/schemas/tb_order" 
 *                         required: true  
 *      responses:
 *          "200":
 *              description: Producto agregado al carrito
 *          "400":
 *              description: Debe ser un idValido de mongo
 *          "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 *
 */
router.post("/order" , jwtVerify, rolUsuario, validateOrder, validationResultExpress,  crearOrden);

/**
 * @swagger
 *  /api/v1/order/{id}:
 *   put:
 *      summary: Actualizar el detalle por id de orden a compra se requiere autentificación de usuario
 *      tags: [tb_order]
 *      description: Actualizar el detalle de la compra usando el id de carrito
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Ingreso del id de la orden
 *            required: true
 *            schema:
 *              type: string
 *      requestBody:
 *        required: true
 *        description: Actualizar una categoria
 *        content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 $ref: "#components/schemas/tb_orderActualizar"
 *      responses:
 *        "200":
 *              description: Categoria actualizada correctamente.
 *
 *        "400":
 *              description: Debe ser string y de mongoId.
 *
 *        "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 *
 */
router.put("/order/:id", jwtVerify, rolUsuario, isIDmongoOrder, validationResultExpress, editarOrden);

/**
 * @swagger
 *  /api/v1/order/{id}:
 *   delete:
 *      summary: Eliminar un detalle de compra se requiere autentificación usuarios
 *      tags: [tb_order]
 *      description: Eliminar una categoria por id
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Ingreso del id del detalle de comprar
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *        "200":
 *              description: Detalle de orden eliminado correctamente.
 *        "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 */
router.delete("/order/:id", jwtVerify, rolUsuario, eliminarOrdenId, validationResultExpress, eliminarOrden);

/**
 * @swagger
 *  /api/v1/create-order/{id}:
 *   post:
 *      summary: Generar api paypal con el detalle de compra se requiere autentificación usuario
 *      tags: [tb_order]
 *      description: Generar la interfaz de paypal para generar pago
 *      parameters:
 *          - in: path
 *            name: idOrden
 *            description: Ingreso del id del detalle compra
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *        "200":
 *              description: Obteniendo producto id
 *
 *        "400":
 *              description: Debe ser un MongoId valido
 *        "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: [] 
 *
 */
router.post("/create-order/:id" , jwtVerify, rolUsuario, ordenIdPaypal, validationResultExpress, ordenFinal);

/**
 * @swagger
 *  /api/v1/order/:
 *   get:
 *      summary: Buscar detalle orden por id se requiere autentificación usuario
 *      tags: [tb_order]
 *      description: Buscar detalle orden por id se requiere autentificación usuario
 *      responses:
 *        "200":
 *              description: Detalle visualizado.
 *        "400":
 *              description: Debe ser string y de mongoId.
 *        "500":
 *              description: Error interno del servidor.
 *      security:    
 *          - bearerAuth: []  
 *
 */
router.get("/order", jwtVerify, rolUsuario, verOrden);

router.get("/capture-order", captureOrder);

router.get("/cancel-payment", cancelPayment);

export {router}