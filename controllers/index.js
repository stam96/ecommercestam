import { createCategory, getCategorys, getCategoryId, deleteCategoryId, updateCategoryId } from "./controllerCategory.js";
import { createProducts, getProducts, getProductsId, updateProductsId, deleteProductsId  } from "./controllerProducts.js";
import {crearRegistro, verificarCorreoUsuario, tokenRestablecerContrasena, actualizarContrasena } from "./controllerRegistroUser.js";
import { loginUser, rutaRefresh, actualizarDatos, eliminarUsuario, logout } from "./controllerLoginUser.js";
import { crearOrden, ordenFinal, editarOrden, captureOrder, eliminarOrden, verOrden, cancelPayment } from "./controllerOrder.js";


export {
  createProducts,
  getProducts,
  getProductsId,
  deleteProductsId,
  updateProductsId,
  createCategory,
  getCategoryId,
  getCategorys,
  deleteCategoryId,
  updateCategoryId,
  crearRegistro,
  verificarCorreoUsuario,
  tokenRestablecerContrasena,
  actualizarContrasena,
  eliminarUsuario,
  loginUser,
  rutaRefresh,
  actualizarDatos,
  logout,
  crearOrden,
  editarOrden,
  verOrden,
  eliminarOrden,
  ordenFinal,
  captureOrder,
  cancelPayment
};