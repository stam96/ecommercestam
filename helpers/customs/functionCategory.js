import { modelCategory } from "../../models/Categorys.js"


export const existsCategory =  async (nombre)=>{
    const category = await modelCategory.findOne({nombre})
    if(category){
        throw new Error("Categoria ya existente")
    }
    //console.log(category)
    return true
}

export const noexistsCategory =  async (id)=>{
    const category = await modelCategory.findById(id)
    //console.log(category)
    if(!category){
        throw new Error("Categoria no existente")
    }
    //console.log(category)
    return true
}