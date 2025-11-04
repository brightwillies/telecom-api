export interface LineItem {
    productId : string;
    quantity : number; 
    price : number;
}

export interface CartContext {
    cartId : string;
    items :  LineItem[];
    createdAt : number;
    lastAccessed: number;
}

export interface CreateCartResponse {
    cartId : string;
}

export interface CartResponse {
    cartId : string;
    items : LineItem[]; 
    total: number;
}