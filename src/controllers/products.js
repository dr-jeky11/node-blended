import { createConnection } from 'mongoose';
import {
  deleteProductById,
  getAllProducts,
  getProductById,
  patchProductById,
  postProduct,
} from '../services/products.js';
import createHttpError from 'http-errors';

export const getProductsController = async (req, res) => {
  const products = await getAllProducts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const postProductsController = async (req, res) => {
  const product = await postProduct(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const productById = await getProductById(productId);
  if (!productById) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found product with id {productId}!',
    data: productById,
  });
};

export const deleteProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const deleteById = await deleteProductById(productId);
  if (!deleteById) {
    throw createHttpError(404, 'Product not found');
  }
  // res.status(204).end();
  res.sendStatus(204);
};

export const patchProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const patchProduct = await patchProductById(productId, req.body);
  if (!patchProduct) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a product!',
    data: patchProduct,
  });
};
