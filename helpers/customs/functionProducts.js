import { modelProduct } from "../../models/Products.js"
import { modelCategory } from "../../models/Categorys.js"
export const existsProducts = async (nombre) => {
    const products = await modelProduct.findOne({ nombre })
    //console.log(products)
    if (products) {
        throw new Error("Producto ya existente")
    }
    //console.log(category)
    return true
}

export const verificarCategory = async (category) => {
    const categoryId = await modelCategory.findOne({category});
    if(!categoryId){
        throw new Error("Ingrese una categoria existente")
    }
    //console.log(categoryId)
    return true
}

export const noexistsProducts = async (id) => {
    const products = await modelProduct.findById(id)
    //console.log(category)
    if (!products) {
        throw new Error("Producto no existente")
    }
    //console.log(category)
    return true
}