import { EditionModel } from "../edition/edition-models";
export interface EditionInCartModel {
    edition:EditionModel|null;
    editionQty: number|null;   
}

export interface CartModel {
    editionsAndQty:EditionInCartModel[]|null;    
}

export interface ItemsInCartCount {
    itemsInCartCount: number|null; 
}