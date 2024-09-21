import { Products } from '../db/models/Product.js';

export const getAllProducts = () => Products.find();

export const postProduct = (productData) => Products.create(productData);

export const getProductById = (id) => Products.findById(id);

// export const getProductByOne = (id) => Products.findOne({ _id: id });

export const deleteProductById = (id) => Products.findByIdAndDelete(id);

// export const deleteProductByOne = (id) => Products.findOneAndDelete({_id:id});

export const patchProductById = (id, productData) =>
  Products.findByIdAndUpdate(id, productData, { new: true });

// export const patchProductByOne = (id, productData) =>
//     Products.findOneAndUpdate({ _id: id }, productData, { new: true });
