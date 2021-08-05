import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CartModel, ItemsInCartCount } from "src/app/Models/cart/cart-model";
import { StoreItemsInCartCount } from "../Action/cart-action";


@State<CartModel>({
    name: 'Cart'
})

@Injectable()
export class CartState {
    constructor() { }

@Selector()
    static getItemsInCartCount(state: ItemsInCartCount):number|null {
        return state.itemsInCartCount;
    }

    @Action(StoreItemsInCartCount)
    storeItemsInCartCount(context: StateContext<ItemsInCartCount>, action: StoreItemsInCartCount) {
        context.patchState({
          itemsInCartCount: action.payload.itemsInCartCount
        });    
  }
}