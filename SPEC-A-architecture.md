# SPEC-A: Architecture & Abstractions

## Objective
Build a **thin Experience API** that manages a telecom shopping cart on top of a **non-persistent Salesforce cart context**. The Salesforce cart is transient and expires after 15 minutes of inactivity.

## Core Abstractions

### 1. `SalesforceCartClient` (Test Double)
- **Interface**:
  ```ts
  static generateId(): string
  static createContext(): Promise<CartContext>
  static getContext(cartId: string): Promise<CartContext | null>
  static updateContext(context: CartContext): Promise<void>

  Behavior:

In-memory Map<string, CartContext>
Carts expire after 15 minutes since lastAccessed
On expiry: delete from map, return null
No real Salesforce calls


interface CartContext {
  cartId: string;
  items: LineItem[];
  createdAt: number;
  lastAccessed: number;
}


### 2. `CartContext` (Immutable Snapshot)

interface CartContext {
  cartId: string;
  items: LineItem[];
  createdAt: number;
  lastAccessed: number;
}

