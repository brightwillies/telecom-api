# SPEC-B: Endpoint Contracts

## Base URL
/api/v1/cart

## POST /
- **Purpose**: Create a new cart
- **Request Body**: None
- **Success Response**:
  - **Status**: `201 Created`
  - **Headers**:

Location: /api/v1/cart/cart_abc123


  - **Body**:
```json
{
  "cartId": "cart_abc123"
}

GET /{cartId}

Purpose: Retrieve the current cart state
Path Parameter: cartId (string)
Success Response:

Status: 200 OK
Body:

{
  "cartId": "cart_abc123",
  "items": [
    {
      "productId": "PLAN_PREMIUM",
      "quantity": 1,
      "price": 99.99
    }
  ],
  "total": 99.99
}

Error Responses:

410 Gone → Cart has expired

{ "error": "Cart expired" }
404 Not Found → Invalid or unknown cartId

{ "error": "Cart not found" }

POST /{cartId}/items

Purpose: Add a product to the cart
Path Parameter: cartId (string)
Request Body (JSON):

{
  "productId": "PLAN_PREMIUM",
  "quantity": 1
}

Notes

All responses are application/json
Cart expires after 15 minutes of inactivity
lastAccessed is updated on every GET and POST /items
No authentication required
No persistence — cart lost on server restart