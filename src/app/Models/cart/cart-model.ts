import { EditionModel } from "../edition/edition-models";
export interface EditionInCartModel {
    edition:EditionModel|null;
    editionQuantity: number|null;   
}

export interface CartModel {
    editionsAndQuantity:EditionInCartModel[]|null;    
}

export interface ItemsInCartCount {
    itemsInCartCount: number|null; 
}