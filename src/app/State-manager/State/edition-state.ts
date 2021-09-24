import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap } from "rxjs/operators";
import { CurrentEditonIdModel, EditionModel } from "src/app/Models/edition/edition-models";
import { AlertService } from "src/app/services/alert/alert.service";
import { EditionService } from "src/app/services/edition/edition.service";
import { GetEdition, StoreCurrentEdition, StoreCurrentEditonId } from "../action/edition-action";


@State<EditionModel>({
    name: 'CurrentEdition',
    defaults:{
      authorModels:null,
      currency: null,
      dateOfCreation: null,
      description:null,
      editionType:null,
      id:null,
      price:null,
      status:null,
      title:null
    }
})

@Injectable()
export class EditonState {
    constructor(private editionService:EditionService, private alertService: AlertService) { }

    @Selector()
    static getCurrentEditionId(state: CurrentEditonIdModel):number {
        return state.Id;
    }

    @Selector()
    static getCurrentEdition(state: EditionModel): EditionModel | null {
    return state;
  }

  @Selector()
    static getCurrentEditionPrice(state: EditionModel):number|null {
        return state.price;
    }

    @Action(StoreCurrentEditonId)
    storeCurrentEditonId(context: StateContext<CurrentEditonIdModel>, action: StoreCurrentEditonId) {
        context.patchState({
          Id: action.payload.Id
        }); 
        localStorage.setItem("currentEditonId", JSON.stringify(action.payload.Id))   
  }

    @Action(GetEdition)
    getCurrentEdition(context: StateContext<EditionModel>, action: GetEdition) {
    return this.editionService.getEditions(action.payload).pipe(
      tap((result) => {
        context.patchState(result);
        localStorage.setItem("currentEdition", JSON.stringify(result))
      }),
      catchError(async error => 
        this.alertService.showErrorMessage(error.error))
       ) 
  }

  @Action(StoreCurrentEdition)
  storeCurrentEdition(context: StateContext<EditionModel>, action: StoreCurrentEdition) {
      context.patchState(action.payload);      
  }
}