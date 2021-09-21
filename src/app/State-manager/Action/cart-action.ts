import { CartModel, ItemsInCartCount } from "src/app/Models/cart/cart-model";

export class StoreItemsInCartCount {
    static readonly type = '[Cart] ItemsInCartCount';
    constructor(public payload: ItemsInCartCount) {}
  }
export class StoreCart {
    static readonly type = '[Cart] Cart';
    constructor(public payload: CartModel) {}
  }

  export class ClearCart {
    static readonly type = '[ClearCart] ClearCart';
    constructor() {}
  }