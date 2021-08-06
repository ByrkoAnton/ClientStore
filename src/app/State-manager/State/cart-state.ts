import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CartModel, EditionInCartModel, ItemsInCartCount } from "src/app/Models/cart/cart-model";
import { StoreCart, StoreItemsInCartCount } from "../Action/cart-action";


@State<EditionInCartModel>({
    name: 'Cart'
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
        return state.editionsAndQty;
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
            editionsAndQty:action.payload.editionsAndQty
        });
    }
}