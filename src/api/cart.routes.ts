import { Router } from "express";

import { CartController } from "./cart.controller";

const router = Router();



router.post('/', CartController.createCart);
router.get('/:cartId', CartController.getCart);
router.post('/:cartId/items', CartController.addItem);

export default router;