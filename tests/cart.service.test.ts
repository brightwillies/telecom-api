
import { CartService } from "../src/core/cart.service";
import { SalesforceCartClient } from "../src/infrastructure/salesforce/SalesforceCartClient.double";

jest.useFakeTimers();

describe('CartService', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('creates cart and returns cartId', async () => {
    const result = await CartService.createCart();
    expect(result.cartId).toMatch(/^cart_/);
  });

  it('adds item and calculates total', async () => {
    const { cartId } = await CartService.createCart();
    const result = await CartService.addItem(cartId, {
      productId: 'PLAN_PREMIUM',
      quantity: 1,
    });

    expect(result?.items[0].price).toBe(99.99);
    expect(result?.total).toBe(99.99);
  });

  it('expires cart after 15 minutes', async () => {
    const { cartId } = await CartService.createCart();
    jest.advanceTimersByTime(16 * 60 * 1000);

    const result = await CartService.getCart(cartId);
    expect(result).toBeNull();
  });
});