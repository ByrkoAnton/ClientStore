import { ItemsInCartCount } from "src/app/Models/cart/cart-model";

export class StoreItemsInCartCount {
    static readonly type = '[Cart] ItemsInCartCount';
    constructor(public payload: ItemsInCartCount) {}
  }