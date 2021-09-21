import { EditionForPayModel } from "../edition/edition-models";

export class PaymentModel {
    token!: string;
    editions!: EditionForPayModel[]|null; 
    orderDescription!: string | null;
  };

  export interface ResultPayModel {
    orderId: string | null;
    message: string | null;
  };

