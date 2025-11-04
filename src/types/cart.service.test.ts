
import { ExperienceCartService } from "../core/cart.service";
import { SalesforceCartClient } from "../infrastructure/salesforce/SalesforceCartClient.double";

jest.useFakeTimers();

describe('ExperienceCartService', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('creates cart and returns cartId', async () => {
    const result = await ExperienceCartService.createCart();
    expect(result.cartId).toMatch(/^cart_/);
  });

  it('adds item and calculates total', async () => {
    const { cartId } = await ExperienceCartService.createCart();
    const result = await ExperienceCartService.addItem(cartId, {
      productId: 'PLAN_PREMIUM',
      quantity: 1,
    });

    expect(result?.items[0].price).toBe(99.99);
    expect(result?.total).toBe(99.99);
  });

  it('expires cart after 15 minutes', async () => {
    const { cartId } = await ExperienceCartService.createCart();
    jest.advanceTimersByTime(16 * 60 * 1000);

    const result = await ExperienceCartService.getCart(cartId);
    expect(result).toBeNull();
  });
});