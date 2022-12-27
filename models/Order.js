import { Schema, model } from "mongoose";
const schemaOrder = new Schema(
  {
    usuarioId:{
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    products:[
      {
        productId:{
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        precio: {
          type: Number,
        }, 
        cantidad:{
          type: Number,
          default: 1
        }
      }
    ],
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// schemaOrder.virtual("productOrder", {
//   ref: "Product",
//   localField: "productId",
//   foreignField: "_id",
//   justOne: true,
// });


const modelOrder = model("Order", schemaOrder);
export { modelOrder };
