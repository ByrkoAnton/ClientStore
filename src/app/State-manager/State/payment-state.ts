import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { PaymentModel, ResultPayModel } from "src/app/Models/payment/payment-model";
import { PaymentService } from "src/app/services/payment/payment.service";
import { Pay } from "../Action/payment-action";

@State<PaymentModel>({
    name: 'Pay'
})

@Injectable()
export class PaymentState {
    constructor(private paymentService:PaymentService) { }

    @Action(Pay)
    getCurrentEdition(context: StateContext<ResultPayModel>, action: Pay) {
    return this.paymentService.pay(action.payload).pipe(
      tap((result) => {
        context.patchState(result);
      })
    )
  }
}