import { Schema, Document, model, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductModel extends Model<IProduct> {
  findProductsByCategory(category: string[]): Promise<IProduct[]>;
}

export enum ProductCategory {
  KITCHEN_HOME_APPLIANCES = "KITCHEN/HOME APPLIANCES",
  PHONES_AND_GADGETS = "PHONES AND GADGETS",
  GAMING = "GAMING",
  CLOTHING = "CLOTHING",
  FOOTWEAR = "FOOTWEAR",
  JEWELRY = "JEWELRY",
  HEALTH_AND_BEAUTY = "HEALTH AND BEAUTY",
  OFFICE_PRODUCTS = "OFFICE PRODUCTS",
  BABY_PRODUCTS = "BABY PRODUCTS",
  ACCESSORIES = "ACCESSORIES",
  HEALTH_AND_FITNESS = "HEALTH AND FITNESS",
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true, enum: ProductCategory },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

ProductSchema.statics.findProductsByCategory = function (categories: string[]) {
  return this.find({ category: { $in: categories } });
};

const ProductModel = model<IProduct, IProductModel>("Product", ProductSchema);

export default ProductModel;
