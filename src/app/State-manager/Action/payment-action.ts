import { ActionConstants } from "src/app/app-constants";
import { PaymentModel } from "src/app/models/payment/payment-model";

export class Pay {
    static readonly type = ActionConstants.PaymentPay;
    constructor(public payload: PaymentModel) {}
  }