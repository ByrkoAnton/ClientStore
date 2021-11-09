import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentServiceConstants } from 'src/app/app-constants';
import { PaymentModel, ResultPayModel } from 'src/app/models/payment/payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  pay(model: PaymentModel) : Observable<ResultPayModel>{
    return this.http.post<ResultPayModel>(PaymentServiceConstants.PayControlerRoute, model);
  }
}
