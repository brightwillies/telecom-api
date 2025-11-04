import { CartContext, LineItem, CartResponse } from "../types";

import { SalesforceCartClient } from "../infrastructure/salesforce/SalesforceCartClient.double";


export class CartService {

    static async createCart(): Promise<{cartId :string}>
    {
        const context = await SalesforceCartClient.createContext();
        return  {cartId:  context.cartId};    
    }


    static async getCart(cartId: string): Promise<CartResponse | null> {
    const context = await SalesforceCartClient.getContext(cartId);
    if (!context) return null;

    const total = context.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return {
      cartId: context.cartId,
      items: context.items,
      total,
    };
  }


  static async addItem(
    cartId: string,
    item: Omit<LineItem, 'price'>
  ): Promise<CartResponse | null> {
    const context = await SalesforceCartClient.getContext(cartId);
    if (!context) return null;

    const price = item.productId === 'PLAN_PREMIUM' ? 99.99 : 49.99;
    const newItem: LineItem = { ...item, price };
    context.items.push(newItem);

    await SalesforceCartClient.updateContext(context);
    return this.getCart(cartId);
  }


}