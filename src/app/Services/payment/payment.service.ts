import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentModel, ResultPayModel } from 'src/app/Models/payment/payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  pay(model: PaymentModel) : Observable<ResultPayModel>{
    return this.http.post<ResultPayModel>('https://localhost:5001/api/Payment/Pay', model);
  }
}
