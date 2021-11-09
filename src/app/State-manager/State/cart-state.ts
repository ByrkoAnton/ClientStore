import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { StateConstants } from "src/app/app-constants";
import { CartModel, EditionInCartModel, ItemsInCartCount } from "src/app/models/cart/cart-model";
import { ClearCart, StoreCart, StoreItemsInCartCount } from "../action/cart-action";


@State<EditionInCartModel>({
    name: StateConstants.CartSatateName,
    defaults: {
      edition: null,
      editionQuantity: StateConstants.CartDefaultEditionQty
      }
})

@Injectable()
export class CartState {
    constructor() { }

    @Selector()
    static getItemsInCartCount(state: ItemsInCartCount): number | null {
        return state.itemsInCartCount;
    }
    @Selector()
    static getCart(state: CartModel): EditionInCartModel[] | null {
        return state.editionsAndQuantity;
    }

    @Action(StoreItemsInCartCount)
    storeItemsInCartCount(context: StateContext<ItemsInCartCount>, action: StoreItemsInCartCount) {
        context.patchState({
            itemsInCartCount: action.payload.itemsInCartCount
        });
    }

    @Action(StoreCart)
    storeCart(context: StateContext<CartModel>, action: StoreCart) {
        context.patchState({
            editionsAndQuantity:action.payload.editionsAndQuantity
        });
    }

    @Action(ClearCart)
    ClearCart(cartContext: StateContext<CartModel>, itemsCountContext: StateContext<ItemsInCartCount>, action: ClearCart) {
        cartContext.setState({
            editionsAndQuantity:null
          })
          itemsCountContext.setState({
              itemsInCartCount:null
          })
    }
}