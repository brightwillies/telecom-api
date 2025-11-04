import { CartContext } from '../../types'

const CART_TTL = 15 * 60 * 1000;

const carts = new Map<String, CartContext>();

export class SalesforceCartClient {
    static generatedId(): string {
        return 'cart' + Math.random().toString(36).substring(2, 9);
    }


    static async getContext(cartId: string): Promise<CartContext | null> {
        const context = carts.get(cartId);

        if (!context) return null;
        const now = Date.now();
        if (now - context.lastAccessed > CART_TTL) {
            carts.delete(cartId);
            return null;
        }
        context.lastAccessed = now;
        carts.set(cartId, { ...context });
        return { ...context };
    }


    static async createContext(): Promise<CartContext> {
        const cartId = this.generatedId(); 
        const now = Date.now();
     const context : CartContext = {
        cartId,
        items: [], 
        createdAt: now, 
        lastAccessed: now,
     };
     carts.set(cartId, context);
     return context;
    }


    static async updateContext(context : CartContext): Promise <void> {
        context.lastAccessed = Date.now();
        carts.set(context.cartId, {...context})
    }
}