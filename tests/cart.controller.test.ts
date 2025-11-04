import request from 'supertest';
import app  from '../src/server';

jest.useFakeTimers();

describe('CartController', () => {
  it('creates cart with 201 and Location', async () => {
    const res = await request(app).post('/api/v1/cart');
    expect(res.status).toBe(201);
    expect(res.headers.location).toMatch(/\/api\/v1\/cart\/cart_/);
    expect(res.body.cartId).toBeDefined();
  });

  it('returns 410 when cart expired', async () => {
    const createRes = await request(app).post('/api/v1/cart');
    const cartId = createRes.body.cartId;

    jest.advanceTimersByTime(16 * 60 * 1000);

    const res = await request(app).get(`/api/v1/cart/${cartId}`);
    expect(res.status).toBe(410);
    expect(res.body.error).toBe('Cart expired');
  });

  it('adds item successfully', async () => {
    const createRes = await request(app).post('/api/v1/cart');
    const cartId = createRes.body.cartId;

    const addRes = await request(app)
      .post(`/api/v1/cart/${cartId}/items`)
      .send({ productId: 'PLAN_BASIC', quantity: 2 });

    expect(addRes.status).toBe(200);
    expect(addRes.body.total).toBe(99.98); // 49.99 * 2
  });
});