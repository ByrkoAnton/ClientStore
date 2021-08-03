import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditionModel, EditionRequestModel } from 'src/app/Models/edition/edition-models';
import { StoreModel } from 'src/app/Models/store/store-model';
export const httpOptions = {
  headers: new HttpHeaders(
      {'Content-Type': 'application/json',
      'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
})
}
@Injectable({
  providedIn: 'root'
})

export class StoreService {

  constructor(private http: HttpClient) { }

  getEditions(model: EditionRequestModel): Observable<StoreModel> {
    return this.http.post<StoreModel>('https://localhost:5001/api/PrintingEdition/GetEditions',model);
  }
}
