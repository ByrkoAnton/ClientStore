import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentEditonIdModel, EditionModel } from 'src/app/Models/edition/edition-models';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  constructor(private http: HttpClient) { }

  getEditions(model: CurrentEditonIdModel ): Observable<EditionModel> {
    return this.http.post<EditionModel>('https://localhost:5001/api/PrintingEdition/GetById', model);
  }
}
