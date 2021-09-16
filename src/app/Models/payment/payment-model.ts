import { EditionForPayModel } from "../edition/edition-models";

export interface PaymentModel {
    token: string;
    editions: EditionForPayModel[]|null; 
    orderDescription: string | null;
  };

  export interface ResultPayModel {
    orderId: string | null;
    message: string | null;
  };

