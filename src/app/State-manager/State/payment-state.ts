import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap } from "rxjs/operators";
import { PaymentModel, ResultPayModel } from "src/app/Models/payment/payment-model";
import { PaymentService } from "src/app/services/payment/payment.service";
import { Pay } from "../action/payment-action";

// @State<PaymentModel>({
//     name: 'Pay'
// })

@State<ResultPayModel>({
    name: 'OrderDetails'
  })

@Injectable()
export class PaymentState {
    constructor(private paymentService:PaymentService) { }

    @Selector()
    static getPaymentResult(state: ResultPayModel): ResultPayModel | null {
      return state;
    }

    @Action(Pay)
    pay(context: StateContext<ResultPayModel>, action: Pay) {
    return this.paymentService.pay(action.payload).pipe(
      tap((result) => {
        context.patchState({
            message: result.message,
            orderId: result.orderId
        });
      }),
      catchError(async error=> console.log(error.message))
    )
  }
}