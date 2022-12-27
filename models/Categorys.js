import {Schema, model} from "mongoose";
const schemaCategorys = new Schema({
    nombre: {
        type:String,
        required:true
    },
    estado:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    versionKey:false
})

// schemaCategorys.methods.toJSON = function () {
//     const obj = this.toObject();
//     delete obj.createdAt
//     delete obj.updatedAt
//     return obj;
//   };

schemaCategorys.methods.toJSON = function () {
    const {_id, createdAt, updatedAt,   ...category  } = this.toObject();
    //console.log(category.categoria)
    category.id = _id
    return category
}
  
const modelCategory = model("Categoria", schemaCategorys)
export {modelCategory}