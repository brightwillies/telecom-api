import { Request, Response } from "express";
import { CartService } from "../core/cart.service";
import { SalesforceCartClient } from "../infrastructure/salesforce/SalesforceCartClient.double";


export class CartController {

  static async createCart(_req: Request, res: Response) {
    const result = await CartService.createCart();
    res.setHeader('Location', `/api/v1/cart/${result.cartId}`);
    res.status(201).json(result);
  }


  static async getCart(req: Request, res: Response) {
    const { cartId } = req.params;
    const cart = await CartService.getCart(cartId);

    if (!cart) {
      const context = await SalesforceCartClient.getContext(cartId);
      const status = context !== null ? 410 : 404;
      const message = context !== null ? 'Your Cart expired' : 'Cart cannot be found';
      return res.status(status).json({ error: message });
    }
    res.json(cart);
  }


  static async addItem(req: Request, res: Response) {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const result = await CartService.addItem(cartId, { productId, quantity });
    if (!result) {
      return res.status(410).json({ error: 'Cart expired' });
    }

    res.json(result);
  }


}