import { PaymentModel } from "src/app/Models/payment/payment-model";

export class Pay {
    static readonly type = '[Pay] Pay';
    constructor(public payload: PaymentModel) {}
  }