import { EditionModel } from "../edition/edition-models";
export interface CartModel {
    edition:EditionModel|null;
    editionQty: number|null;
    
}

export interface ItemsInCartCount {
    itemsInCartCount: number|null; 
}