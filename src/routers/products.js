import { Router } from 'express';
import { getProductsController } from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const productsRouter = Router();

productsRouter.get('/products', ctrlWrapper(getProductsController));

export default productsRouter;
