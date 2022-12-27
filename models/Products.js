import {Schema, model} from "mongoose";
const schemaProducts = new Schema({
    nombre: {
        type:String
    },
    descripcion: {
        type:String
    },
    image:{
        type:String,
        default: null
    },
    precio:{
        type:Number
    },
    rating:{
        type:Number
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:"Categoria"
    },
    estado:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    versionKey:false,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});


schemaProducts.methods.toJSON = function () {
    //const { _id, createdAt, category,  updatedAt, ...products  } = this.toObject();
    //products.id = _id
    const obj = this.toObject();
    delete obj.createdAt
    delete obj.updatedAt
    delete obj.category
    delete obj.categoria.createdAt
    delete obj.categoria.updatedAt
    delete obj._id
    obj.categoria.id = obj.categoria._id
    delete obj.categoria._id
    return obj
}

schemaProducts.virtual("categoria",{
    ref:"Categoria",
    localField:"category",
    foreignField:"_id",
    justOne:true
})

  
const modelProduct = model("Product", schemaProducts)
export {modelProduct}