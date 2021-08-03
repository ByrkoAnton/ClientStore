import { EditionModel } from "../edition/edition-models";

// export interface EditionInCartModel {
//     edition:EditionModel|null;
//     editionQty: number|null;
// }

export interface CartModel {
    edition:EditionModel|null;
    editionQty: number|null;
   
}