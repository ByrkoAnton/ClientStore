import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditionServiceConstants } from 'src/app/app-constants';
import { CurrentEditonIdModel, EditionModel } from 'src/app/models/edition/edition-models';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  constructor(private http: HttpClient) { }

  getEditions(model: CurrentEditonIdModel ): Observable<EditionModel> {
    return this.http.post<EditionModel>(EditionServiceConstants.EditionGetByIdControlerRoute, model);
  }
}
