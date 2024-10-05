import { Router } from 'express';
import {
  deleteProductByIdController,
  getProductByIdController,
  getProductsController,
  patchProductByIdController,
  postProductsController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getProductsController));

productsRouter.get('/:productId', ctrlWrapper(getProductByIdController));

productsRouter.post('/', ctrlWrapper(postProductsController));

productsRouter.delete('/:productId', ctrlWrapper(deleteProductByIdController));

productsRouter.patch('/:productId', ctrlWrapper(patchProductByIdController));

export default productsRouter;
