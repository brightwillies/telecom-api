import { Router } from "express";

import { ExperienceCartController } from "./cart.controller";

const router = Router();


router.post('/', ExperienceCartController.createCart);
router.get('/:cartId', ExperienceCartController.getCart);
router.post('/:cartId/items', ExperienceCartController.addItem);

export default router;