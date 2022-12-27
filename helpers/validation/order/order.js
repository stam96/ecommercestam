import { body, param } from "express-validator";

const validateOrder = [
  body("productId", "Debe ser un id mongo valido")
    .isMongoId()
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body("cantidad", "Ingrese campo cantidad").not().isEmpty().trim().escape(),
];

const isIDmongoOrder = [
  param("id", "Debe ser un id valido de mongo y de tipo String ")
    .isMongoId()
    .not()
    .isEmpty()
    .trim()
    .escape(),
    body("cantidad", "Ingrese campo cantidad").not().isEmpty().trim().escape(),
];

const eliminarOrdenId =[
    param("id", "Debe ser un id valido de mongo y de tipo String ")
    .isMongoId()
    .not()
    .isEmpty()
    .trim()
    .escape(),
];

const ordenIdPaypal =[
    param("id", "Debe ser un id valido de mongo y de tipo String ")
    .isMongoId()
    .not()
    .isEmpty()
    .trim()
    .escape(),
]
export {validateOrder, isIDmongoOrder, eliminarOrdenId, ordenIdPaypal}