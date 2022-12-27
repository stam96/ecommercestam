import { Router } from "express";
import { buscadorQuery, buscadorId } from "../controllers/controllerFind.js";
//import { validarBuscador } from "../helpers/validation/index.js";
//import { validationResultExpress } from "../middlewares/expressValidate/errorValidate.js";
const router = Router();

/**
 * @swagger
 *  /api/v1/buscador/{coleccion}/{termino}:
 *   get:
 *      tags: [Buscador_Querys]
 *      summary: Verificar todas las categorias usando id:{coleccion} {termino}
 *      description: Ver categorias
 *      parameters:
 *          - in: path
 *            name: coleccion
 *            description: Ubicar estos valores en el campo coleccion [products, categorys]
 *            required: true
 *            schema:
 *              type: string
 *          - in: path
 *            name: termino
 *            description: Insertar datos con id y nombre de producto sea con una letra o nombre completo
 *            required: true
 *            schema:
 *              type: string
 *
 *      responses:
 *          "200":
 *              description: producto o categoria visualizado correctamente.
 *          "500":
 *              description: Error interno del servidor.
 *
 */
router.get("/buscador/:coleccion/:termino", buscadorId);

/**
 * @swagger
 *  /api/v1/buscador:
 *   get:
 *      tags: [Buscador_Querys]
 *      summary: Verificar todas las categorias usando query params
 *      description: Ver categorias
 *      parameters:
 *          - in: query
 *            name: coleccion
 *            description: Ubicar estos valores en el campo coleccion [products, categorys]
 *            required: true
 *            schema:
 *              type: string
 *          - in: query
 *            name: termino
 *            description: Insertar datos con id y nombre de producto sea con una letra o nombre completo
 *            required: true
 *            schema:
 *              type: string
 *
 *      responses:
 *          "200":
 *              description: producto o categoria visualizado correctamente.
 *          "500":
 *              description: Error interno del servidor.
 *
 */
router.get("/buscador", buscadorQuery);
export { router };
