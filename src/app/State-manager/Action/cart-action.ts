import { ActionConstants } from "src/app/app-constants";
import { CartModel, ItemsInCartCount } from "src/app/Models/cart/cart-model";

export class StoreItemsInCartCount {
    static readonly type = ActionConstants.CartItemsInCartCount;
    constructor(public payload: ItemsInCartCount) {}
  }
export class StoreCart {
    static readonly type = ActionConstants.CartStoreCart;
    constructor(public payload: CartModel) {}
  }

  export class ClearCart {
    static readonly type = ActionConstants.CartClearCart;
    constructor() {}
  }