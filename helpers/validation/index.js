import { validateCategory, isIDmongo } from "./category/categoryValidate.js";
import { eliminarOrdenId, isIDmongoOrder, ordenIdPaypal, validateOrder } from "./order/order.js";
import { validateProducts, isIDmongoProduct } from "./products/productsValidate.js";
import { validarLogin } from "./user/login/loginValidate.js";
import { validarParaActualizarCorreo } from "./user/register/actualizarContrasena.js";
import { validarRegistro } from "./user/register/registerValidate.js";
import { verificarToken } from "./user/register/verificarCuenta.js";

export {
    validateCategory,
    isIDmongo,
    validateProducts,
    isIDmongoProduct,
    validarRegistro,
    validarLogin,
    verificarToken,
    validarParaActualizarCorreo,
    validateOrder,
    isIDmongoOrder,
    eliminarOrdenId,
    ordenIdPaypal
}